import React, { useEffect, useState } from 'react'
import Orders from './Orders'
import { useMarketContext } from './MarketContext'
import { WebSocketContext } from '../components/WebSocketContext'
import { device } from '../styles/breakpoints'
import styled from 'styled-components'

const OrderBook: React.FC = () => {
    const [bidsBuffer, setBidsBuffer] = useState<Array<Array<number>>>([])
    const [asksBuffer, setAsksBuffer] = useState<Array<Array<number>>>([])
    const { state, dispatch } = useMarketContext()
    const { ws } = React.useContext(WebSocketContext)
    const { bids, asks, tick } = state

    useEffect(() => {
        ws.addEventListener('open', function open() {
            console.log(`Ws opened with pair: ${state.productIds}`);
            const message = {
                event: "subscribe",
                feed: "book_ui_1",
                product_ids: state.productIds
            }
            ws.send(JSON.stringify(message));
        });
        
        ws.addEventListener('message', function incoming(wsData) {
            const { data } = wsData
            const snapshot = JSON.parse(data)

            if (snapshot.feed === 'book_ui_1_snapshot') {
                dispatch({
                    type: 'initialize',
                    payload: {
                        bids: snapshot.bids,
                        asks: snapshot.asks
                }})
            }

            if (snapshot.feed === 'book_ui_1') {
                if (snapshot.bids && snapshot.bids.length) {
                    setBidsBuffer((prevState) => [...prevState, snapshot.bids])
                }

                if (snapshot.asks && snapshot.asks.length) {
                    setAsksBuffer((prevState) => [...prevState, snapshot.asks])
                }
            }
        });

        ws.addEventListener('error', (event) => {
            console.log('Error', event)
        });

        ws.addEventListener('close', function (event) { 
            console.log('The connection has been closed'); 
        });
    }, [state.productIds, dispatch, ws])

    useEffect(() => {
        if (bidsBuffer.length > 50) {
            dispatch({
                type: 'updateBids',
                payload: {
                    bids: bidsBuffer,
                }
            })
            setBidsBuffer([])
        }

        if (asksBuffer.length > 50) {
            dispatch({
                type: 'updateAsks',
                payload: {
                    asks: asksBuffer,
                }
            })
            setAsksBuffer([])
        }
    }, [bidsBuffer, asksBuffer, dispatch])

    return (
        <Grid>
            <Orders type="asks" tick={tick} orders={bids} />
            <Orders type="bids" tick={tick} orders={asks} />
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
