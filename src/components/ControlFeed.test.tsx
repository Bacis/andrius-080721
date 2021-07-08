import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MarketProvider } from './MarketContext'
import ControlFeed from './ControlFeed'

test('ControlFeed click buttons', () => {
    const { getByText } = render(
        <MarketProvider>
            <ControlFeed></ControlFeed>
        </MarketProvider>
    )

    fireEvent.click(getByText(/toggle feed/i))
})