import React from 'react'
import styled from 'styled-components'
import { sortOrdersByPrice } from '../utils/helper'

interface OrdersProps {
    type: 'asks' | 'bids'
    orders: Array<Array<number>>
    tick: number
}

const Orders: React.FC<OrdersProps> = props => {
    const { orders, type } = props
    let total = 0
    const totalSize = orders.reduce((acc, val) => acc + val[1], 0)
    const orderList = sortOrdersByPrice(orders).map((order, index) => {
        const [price, size] = order
        total += size
        const displayWidth = ((total * 100) / totalSize)


        return <Row key={index}>
                    {type === 'asks' ? <Text color="white">{total.toLocaleString()}</Text> : <Text color="green">{price.toLocaleString()}</Text>}
                    <Text color="white">{size.toLocaleString()}</Text>
                    {type === 'asks' ? <Text color="red">{price.toLocaleString()}</Text> : <Text color="white">{total.toLocaleString()}</Text>}
                    {type === 'asks' ? <ProgressAsks displayWidth={displayWidth} /> : <ProgressBids displayWidth={displayWidth} /> }
                </Row>
    }).slice(0, 20)

    return (
        <OrdersList>
            <TopRow>
                {type === 'asks' ? <Item>Total</Item> : <Item>Price</Item>}
                <Item>Size</Item>
                {type === 'asks' ? <Item>Price</Item> : <Item>Total</Item>}
            </TopRow>
            {orderList}    
        </OrdersList>
    )
}

const OrdersList = styled.div`
    overflow: hidden;
    position: relative;
    background: #111a2c;
    min-height: 633px;
`

const Item = styled.div`
    font-size: 20px;
    color: #333b4d;
    text-transform: uppercase;
    max-width: 80px;
    text-align: right;
    font-weight: 500;
    flex: 1;
`

const Row = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 30px;
    margin: 0 20px;
`

const TopRow = styled(Row)`
    padding-top: 5px;
    padding-bottom: 10px;
`

const Text = styled.div<{ color: string }>`
    font-family: Consolas,monaco,monospace;
    max-width: 80px;
    text-align: right;
    color: ${props => props.color};
    font-weight: 500;
    flex: 1;
`

const ProgressBar = styled.div<{ displayWidth: number }>`
    position: absolute;
    right: 0px;
    z-index: 1;
    opacity: 0.15;
    height: 30px;
    width: 100%;
    transition: transform ease-in-out 0.3s;
`

const ProgressAsks = styled(ProgressBar)`
    left: 100%;
    transform: ${props => `translateX(-${props.displayWidth}%)`};
    background-color: rgb(248, 73, 96);
`

const ProgressBids = styled(ProgressBar)`
    background-color: rgb(54, 192, 0);
    right: 100%;
    transform: ${props => `translateX(${props.displayWidth}%)`};
`

export default Orders