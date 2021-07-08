import React from 'react'

export const WebSocketContext = React.createContext<{ ws: WebSocket }>({ ws: new WebSocket('wss://www.cryptofacilities.com/ws/v1') })