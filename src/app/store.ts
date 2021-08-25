import { configureStore, Action } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import reduxWebsocket from '@giantmachines/redux-websocket';
import logger from 'redux-logger';
import rootReducer, { RootState } from './rootReducer'

const middleware = [reduxWebsocket()]
const store = configureStore({
    reducer: rootReducer,
    middleware
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store