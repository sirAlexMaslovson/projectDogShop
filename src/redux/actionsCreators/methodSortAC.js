import {
  DELETE_SORT,
  SORT_BY_ABC,
  SORT_BY_COST,
  SORT_BY_DISCOUNT,
  SORT_BY_MY_FAVORITE,
} from '../types/methodSortingTypes'

export const sortByCost = () => ({
  type: SORT_BY_COST,
})

export const sortByABC = () => ({
  type: SORT_BY_ABC,
})

export const deleteSort = () => ({
  type: DELETE_SORT,
})

export const sortByDiscount = () => ({
  type: SORT_BY_DISCOUNT,
})

export const sortByMyFavorite = () => ({
  type: SORT_BY_MY_FAVORITE,
})
