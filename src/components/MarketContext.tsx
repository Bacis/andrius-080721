import React from 'react'
import { updateOrders } from '../utils/helper'

type Action = { type: 'initialize', payload: any } |
    { type: 'updateAsks', payload: any } |
    { type: 'updateBids', payload: any } |
    { type: 'toggleFeed', payload: string[] } |
    { type: 'setMarketTick', payload: number }

type Dispatch = (action: Action) => void

export interface IState {
    bids: number[][],
    asks: number[][],
    productIds: string[],
    tick: number
}

type MarketProviderProps = { children: React.ReactNode }

export const MarketContext = React.createContext<{state: IState; dispatch: Dispatch} | undefined>(undefined)

export const useMarketContext = () => {
    const context = React.useContext(MarketContext)
    if (!context) {
        throw new Error(`useWebsocket must be used withn a MarketProvider`)
    }

    return context
}

const marketReducer = (state: IState, action: Action) => {
    switch (action.type) {
        case 'initialize': {
            console.log("Dispatched: initialize")
            return {
                ...state,
                bids: action.payload.bids,
                asks: action.payload.asks,
            }
        }
        case 'updateAsks': {
            console.log("Dispatched: updateAsks")
            const asks = updateOrders(state.asks, action.payload.asks.flat())

            return {
                ...state,
                asks,
            }
        }
        case 'updateBids': {
            console.log("Dispatched: updateBids")
            const bids = updateOrders(state.bids, action.payload.bids.flat())

            return {
                ...state,
                bids,
            }
        }
        case 'toggleFeed': {
            console.log("Dispatched: toggleFeed", action.payload)
            return {
                ...state,
                productIds: action.payload,
                asks: [],
                bids: []
            }
        }
        case 'setMarketTick': {
            console.log("Dispatched: setMarketTick")
            return {
                ...state,
                tick: action.payload,
            }
        }
        default:
            throw new Error('')
    }
}

export const MarketProvider = ({ children }: MarketProviderProps) => {
    const [state, dispatch] = React.useReducer(marketReducer, {
        bids: [],
        asks: [],
        productIds: ["PI_XBTUSD"],
        tick: 0,
    })
    const value = {state, dispatch}
    return <MarketContext.Provider value={value}>
        {children}
    </MarketContext.Provider>
}