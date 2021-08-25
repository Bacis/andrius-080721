export interface WebsocketState {
  snapshot: {
    bids: number[][],
    asks: number[][]
  },
  messages: {
    bids: number[][],
    asks: number[][]
  }
}

export function websocketReducer(state: WebsocketState = {
  snapshot: {
    bids: [],
    asks: []
  },
  messages: {
    bids: [],
    asks: []
  }
}, action: any) {
  switch (action.type) {
    case 'REDUX_WEBSOCKET::CLEAR_BIDS': {
      return {
        ...state,
        messages: {
          bids: [],
          asks: state.messages.asks,
        }
      }
    }
      
    case 'REDUX_WEBSOCKET::CLEAR_ASKS': {
      return {
        ...state,
        messages: {
          asks: [],
          bids: state.messages.bids,
        }
      }
    }
      
    case 'REDUX_WEBSOCKET::MESSAGE': {
      const data: { feed: string, bids: [], asks: [] } = JSON.parse(action.payload.message)

      return {
        ...state,
        ...(data.feed === 'book_ui_1_snapshot' && {
          snapshot: {
            bids: data.bids,
            asks: data.bids
        }}),
        ...(data.feed === 'book_ui_1' && {
          messages: {
            bids: data.bids && data.bids.length ?
              [...state.messages.bids, data.bids] :
              [...state.messages.bids],
            asks: data.asks && data.asks.length ?
              [...state.messages.asks, data.asks] :
              [...state.messages.asks],
          }
        })
      }
    }
    default:
      return state
  }
}