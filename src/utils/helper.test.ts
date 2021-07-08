import { sortOrdersByPrice, updateOrders } from './helper'

describe('helper', () => {
    test('sort order by price desc', () => {
        const orders = [[35358.5, 1200], [35359.5, 10000], [35360, 4586]]
        const results = sortOrdersByPrice(orders)

        expect(results[0][0]).toBe(35360)
        expect(results[1][0]).toBe(35359.5)
        expect(results[2][0]).toBe(35358.5)
    })

    test('update orders with new order size 0', () => {
        const orders = [[35358.5, 1200], [35359.5, 10000], [35360, 4586]]
        const updates = [[35358.5, 0]]

        const results = updateOrders(orders, updates)
        expect(results).toHaveLength(2)
    })

    test('update orders with new order sizes', () => {
        const orders = [[35358.5, 1200], [35359.5, 10000], [35360, 4586]]
        const updates = [[35359.5, 1], [35360, 2]]

        const results = updateOrders(orders, updates)
        expect(results[1]).toStrictEqual([35359.5, 1])
        expect(results[2]).toStrictEqual([35360, 2])
    })
})