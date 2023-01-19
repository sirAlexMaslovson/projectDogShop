export const REDUX_LOCAL_STORAGE_KEY = 'REDUX_LOCAL_STORAGE_KEY'

export const initialState = {
  TOKEN: '',
  myUser: {},
  search: '',
  methodSorting: '',
  idForDetailCard: '',
  cart: [],
}

export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LOCAL_STORAGE_KEY)

  return stateLS ? JSON.parse(stateLS) : initialState
}
