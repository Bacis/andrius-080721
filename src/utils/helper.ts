export const sortOrdersByPrice = (orders: Array<Array<number>>, desc = true) => {
    return orders.sort((a, b) => {
        const [priceA] = a
        const [priceB] = b
        return desc ? priceB - priceA : priceA - priceB
    })
}

export const updateOrders: any = (
    orders: Array<Array<number>>,
    updates: Array<Array<number>>
) => {
    updates.forEach(orderToUpdate => {
        const [price, size] = orderToUpdate

        const index = orders.findIndex(element => {
            const [currentPrice] = element

            return currentPrice === price
        })

        if (index !== -1 && size === 0) {
            orders.splice(index, 1) // remove order on size 0
        } else if (index !== -1 && size > 0) {
            orders.splice(index, 1, orderToUpdate) // replace order
        } else if (index === -1 && size !== 0) {
            orders.push(orderToUpdate) // new order
        }
    })

    return orders
}