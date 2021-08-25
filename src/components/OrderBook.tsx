import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/rootReducer'
import { WebsocketState } from '../app/websocketReducer'
import { updateAsks, updateBids, initialize, OrderState } from '../features/Orders/OrdersSlice'
import Orders from './Orders'
import { connect, send } from '@giantmachines/redux-websocket';
import { device } from '../styles/breakpoints'
import styled from 'styled-components'

const OrderBook: React.FC = () => {
    const dispatch = useDispatch()
    const { websocket, orders } = useSelector((state: RootState) => state)
    const { productIds, tick, asks, bids } : OrderState = orders
    const { snapshot, messages } : WebsocketState = websocket

    useEffect(() => {
        dispatch(connect('wss://www.cryptofacilities.com/ws/v1'))
        setTimeout(() => {
            dispatch(send({
                event: "subscribe",
                feed: "book_ui_1",
                product_ids: productIds
            }))
        }, 1000)
    }, [productIds, dispatch])

    useEffect(() => {
        if (snapshot.bids.length && snapshot.asks.length) {
            dispatch(
                initialize({
                    asks: snapshot.asks,
                    bids: snapshot.bids,
                    productIds,
                }))
        }
    }, [snapshot, dispatch, productIds])

    useEffect(() => {
        const maxLength = 50
        const { asks, bids } : {
            asks: number[][],
            bids: number[][]
        } = messages

        if (bids && bids.length > maxLength) {
            dispatch(updateBids({ bids }))
            dispatch({ type: 'REDUX_WEBSOCKET::CLEAR_BIDS'})
        }

        if (asks && asks.length > maxLength) {
            dispatch(updateAsks({ asks }))
            dispatch({ type: 'REDUX_WEBSOCKET::CLEAR_ASKS'})
        }
    }, [messages, dispatch])

    return (
        <Grid>
            <Orders type="asks" tick={tick} orders={[...bids]} />
            <Orders type="bids" tick={tick} orders={[...asks]} />
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, auto);
    align-items: center;
    padding: 4px 7px 0px 7px;

    @media only screen and (${device.lg}) {
        grid-template-columns: repeat(2, auto);
    }
`

export default OrderBook
