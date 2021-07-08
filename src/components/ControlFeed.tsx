import React from 'react'
import styled from 'styled-components'
import { useMarketContext } from './MarketContext'
import { WebSocketContext } from '../components/WebSocketContext'

const ControlFeed: React.FC = () => {
    const { state, dispatch } = useMarketContext()
    const { ws } = React.useContext(WebSocketContext)

    const toggleFeed = (productIds: string[]) => {
        console.log(`Unsubscribe feed: ${state.productIds}`)

        if (ws.readyState === 1) {
            ws.send(JSON.stringify({
                event: "unsubscribe",
                feed: "book_ui_1",
                product_ids: state.productIds
            }))
    
            ws.send(JSON.stringify({
                event: "subscribe",
                feed: "book_ui_1",
                product_ids: productIds
            }));
    
            dispatch({
                type: 'toggleFeed',
                payload: productIds
            })
        }
    }

    const nukeFeed = () => {
        try {
            // force ws to throw error
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Grid>
            <ToggleFeed onClick={() => toggleFeed(state.productIds.includes("PI_ETHUSD") ? ["PI_XBTUSD"] : ["PI_ETHUSD"])}>Toggle Feed</ToggleFeed>
            <KillFeed onClick={() => nukeFeed()}>Kill Feed</KillFeed>
        </Grid>
    )
}

const Grid = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 1.5rem;
`

const ToggleFeed = styled.button`
    cursor: pointer;
    width: auto;
    font-size: 15px;
    font-weight: 500;
    padding: 15px 20px;
    border: none;
    border-radius: 5px;
    background: #510DD4;
    color: white;
    margin: 10px;
`

const KillFeed = styled.button`
    cursor: pointer;
    width: auto;
    font-size: 15px;
    font-weight: 500;
    padding: 15px 20px;
    border: none;
    border-radius: 5px;
    background: #EA1A24;
    color: white;
    margin: 10px;
`

export default ControlFeed
