import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { getInitialState, REDUX_LOCAL_STORAGE_KEY } from './initState'
import { rootReducer } from './reducers/rootReducer'

export const store = createStore(rootReducer, getInitialState(), composeWithDevTools(
  applyMiddleware(),
  // other store enhancers if any
))

store.subscribe(() => {
  localStorage.setItem(REDUX_LOCAL_STORAGE_KEY, JSON.stringify(store.getState()))
})
