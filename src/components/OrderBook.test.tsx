import React from 'react'
import { render } from '@testing-library/react'
import { MarketProvider } from './MarketContext'
import OrderBook from './OrderBook'

describe('OrderBook', () => {
    test('renders component', () => {
        const { getAllByText } = render(
            <MarketProvider>
                <OrderBook></OrderBook>
            </MarketProvider>
        )

        getAllByText(/Total/i)
        getAllByText(/Size/i)
        getAllByText(/Price/i)
    })
})