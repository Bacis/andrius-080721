import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/rootReducer'
import styled from 'styled-components'
interface IAvailableTicks {
    [key: string]: Array<number>;
}

const MarketTick: React.FC = () => {
    const availableTicks: IAvailableTicks = {
        'PI_XBTUSD': [0.50, 1, 2.5],
        'PI_ETHUSD': [0.05, 0.1, 0.25],
    }
    const dispatch = useDispatch()
    const { productIds } = useSelector((state: RootState) => state.orders)
    const [marketTick, setMarketTick] = useState<number>(availableTicks[productIds[0]][0])

    const handleChange = (event: React.SyntheticEvent): void => {
        const target = event.target as typeof event.target & {
            value: number
        }

        setMarketTick(target.value)
        dispatch({ type: "setMarketTick", payload: target.value })
    }

    const options = availableTicks[productIds[0]] ?
        availableTicks[productIds[0]]
            .map((option, index) => <option key={index} value={option}>
                Group {option}
            </option>) :
        null

    return (
        <Grid>
            <Title>Order Book</Title>
            <Tick data-testid="select-tick" value={marketTick} onChange={handleChange}>
                {options}
            </Tick>
        </Grid>
    )
}

const Grid = styled.div`
    display: flex;
    justify-content: space-between;
    background: #111a2c;
    padding: 10px;
    margin-left: 7px;
    margin-right: 7px;
`

const Title = styled.div`
    color: white;
    font-weight: 600;
`

const Tick = styled.select`
    background: #333b4d;
    font-size: 16px;
    font-weight: 600;
    color: white;
    padding: 2px;
    border: none;
    border-radius: 5px;
    width: 20%;
`

export default MarketTick
