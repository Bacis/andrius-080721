import { combineReducers } from '@reduxjs/toolkit'
import { websocketReducer } from './websocketReducer'
import ordersSliceReducer from '../features/Orders/OrdersSlice'

const rootReducer = combineReducers({
    orders: ordersSliceReducer,
    websocket: websocketReducer,
})

export type RootState = ReturnType<typeof rootReducer>                                                                                                                                                                                                                                

export default rootReducer