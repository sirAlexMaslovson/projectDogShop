/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FaShoppingBasket } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../helpers/Api'
import formStyles from './styles.module.css'
// import bageNew from './5a5a8a1314d8c4188e0b08e1.png'
import bageSale from './sales.png'
import { addProductsInCart, deleteProductsFromCartAC } from '../../redux/actionsCreators/cartAC'
import {
  deleteSort, sortByABC, sortByCost, sortByDiscount,
} from '../../redux/actionsCreators/methodSortAC'

export const ALL_PRODUCTS = 'all_products'

export function Main() {
  const dispatch = useDispatch()

  const cart = useSelector((store) => store.cart)

  const TOKEN = useSelector((store) => store.TOKEN)

  const search = useSelector((store) => store.search)

  const methodSort = useSelector((store) => store.methodSorting)

  const countId = (id) => {
    const objId = cart.find((post) => post.id === id)
    if (!objId) {
      return null
    }
    return objId.count
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!TOKEN.length) {
      navigate('/signin')
    }
  }, [])

  const { data: posts, isLoading } = useQuery({
    queryKey: [ALL_PRODUCTS, search, methodSort],
    queryFn: () => api.getProductsSearchQuery(search),
  })

  const getPriceProduct = (id) => {
    const objProduct = posts.find((post) => post._id === id)
    return Math.round(objProduct.price / ((100 - objProduct.discount) / 100))
  }

  function getStrNumberSearch(value) {
    const getRemainder = value % 10

    switch (true) {
      case ((getRemainder) === 1):
        return 'товар'
      case (getRemainder && getRemainder < 5):
        return 'товара'
      default:
        return 'товаров'
    }
  }

  if (isLoading) return <div>Load</div>
  if (!posts.length) {
    return (
      <div className="text-center">
        <h4>{`По вашему поиску найдено ${posts.length} ${getStrNumberSearch(posts.length)}`}</h4>
        <h5>is empty</h5>
      </div>
    )
  }

  const newArrayPosts = () => {
    switch (methodSort) {
      case 'sort by cost':
        return posts.sort((a, b) => b.price - a.price)
      case 'sort by ABC':
        return posts.sort((a, b) => a.name.localeCompare(b.name))
      case 'sort by discount':
        return posts.sort((a, b) => b.discount - a.discount)
      default:
        return posts
    }
  }

  return (
    <div className={formStyles.pageMain}>
      {search
        ? (
          <div className="text-center">
            <h4>{`По вашему поиску найдено ${posts.length} ${getStrNumberSearch(posts.length)}`}</h4>
          </div>
        )
        : <div /> }

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="navbar-nav d-flex justify-content-start align-items-center">
          <h3 className="navbar-brand">Сортировка</h3>
          <h6 className="nav-link" aria-current="page"><Link to="/" onClick={() => dispatch(sortByABC())}>По алфавиту</Link></h6>
          <h6>/</h6>
          <h6 className="nav-link"><Link to="/" onClick={() => dispatch(sortByCost())}>По стоимости</Link></h6>
          <h6>/</h6>
          <h6 className="nav-link"><Link to="/" onClick={() => dispatch(sortByDiscount())}>По скидке</Link></h6>
          <h6>/</h6>
          <h6 className="nav-link"><Link to="/" onClick={() => dispatch(deleteSort())}>Без фильтра</Link></h6>
        </div>
      </nav>

      <div className="container d-flex flex-wrap pt-2 justify-content-between">
        {newArrayPosts().map((post) => (

          <div className={`card m-3 ${formStyles.pageCard}`} style={{ width: '18rem' }} key={post._id}>

            {post.discount > 0
              ? (<img src={bageSale} style={{ position: 'absolute', width: '25%', left: '0' }} alt="NEW" />)
              : (<div />)}
            <img src={post.pictures} className="card-img-top" alt={post.name} />
            <div className="card-body">
              <h5 className="card-title text-center">{post.name}</h5>
            </div>
            <div className="d-flex justify-content-center">
              <h5 className="card-text text-center p-3">
                {post.price}
                ₽
              </h5>
              {post.discount
                ? (
                  <h5 className="p-3 text-decoration-line-through text-danger position-relative">
                    (
                    {getPriceProduct(post._id)}
                    ₽
                    )
                    <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                      -
                      {post.discount}
                      %
                    </span>
                  </h5>
                )
                : <div />}
            </div>
            {countId(post._id) < 1
              ? (<button type="button" onClick={() => dispatch(addProductsInCart(post._id))} className="btn btn-success">В корзину</button>)
              : (
                <button type="button" onClick={() => dispatch(deleteProductsFromCartAC(post._id))} className="btn btn-success position-relative">
                  В корзину
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    <FaShoppingBasket size="20" />
                  </span>
                </button>
              )}
          </div>

        ))}
      </div>
    </div>
  )
}
