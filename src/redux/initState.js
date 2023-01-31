export const REDUX_LOCAL_STORAGE_KEY_DOG_FOOD = 'REDUX_LOCAL_STORAGE_KEY_DOG_FOOD'

export const initialState = {
  TOKEN: '',
  myUser: {},
  search: '',
  methodSorting: '',
  cart: [],
  favourite: [],
}

export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LOCAL_STORAGE_KEY_DOG_FOOD)

  return stateLS ? JSON.parse(stateLS) : initialState
}
