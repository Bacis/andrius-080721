import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import MarketTick from './MarketTick'
import { MarketProvider, IState } from './MarketContext'

const customRender = (ui: any, { providerProps, ...renderOptions }: { providerProps: IState }) => {
    return render(
      <MarketProvider {...providerProps}>{ui}</MarketProvider>,
      renderOptions
    )
}

test('MarketTick renders with XBTUSD default tick value', () => {
    const { getByTestId } = customRender(<MarketTick></MarketTick>, {
        bids: [],
        asks: [],
        productIds: ["PI_XBTUSD"],
        tick: 0,
    })

    fireEvent.click(getByTestId('select-tick'))
    const { value } = getByTestId('select-tick')
    expect(value).toBe("0.5")
})