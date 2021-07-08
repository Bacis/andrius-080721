import React from 'react'
import { render } from '@testing-library/react'
import Orders from './Orders'

test('counts "total" column correctly', () => {
    const asks = [[35358.5,1200],[35359.5,10000],[35360,4586]]

    const { getByText, getAllByText } = render(
        <Orders type="asks" orders={asks} tick={0.5}></Orders>
    )

    // grab total asks values
    getAllByText("4,586")
    getByText("35,360")
    getByText("14,586")
    getByText("10,000")
    getByText("35,359.5")
    getByText("15,786")
    getByText("1,200")
    getByText("35,358.5")
    
})