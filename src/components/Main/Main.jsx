/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FaShoppingBasket } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../helpers/Api'
import formStyles from './styles.module.css'
import bageNew from './5a5a8a1314d8c4188e0b08e1.png'
import bageSale from './sales.png'
import { addProductsInCart, deleteProductsFromCartAC } from '../../redux/actionsCreators/cartAC'

export const ALL_PRODUCTS = 'all_products'

export function Main() {
  const dispatch = useDispatch()

  const cart = useSelector((store) => store.cart)

  const TOKEN = useSelector((store) => store.TOKEN)

  const search = useSelector((store) => store.search)

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
    queryKey: [ALL_PRODUCTS, search],
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

  return (
    <div className={formStyles.pageMain}>
      {search
        ? (
          <div className="text-center">
            <h4>{`По вашему поиску найдено ${posts.length} ${getStrNumberSearch(posts.length)}`}</h4>
          </div>
        )
        : <div /> }
      <div className="container d-flex flex-wrap pt-2 justify-content-between">
        {posts.map((post) => (

          <div className={`card m-3 ${formStyles.pageCard}`} style={{ width: '18rem' }} key={post._id}>
            {post.tags.length > 0 ? (<img src={bageNew} style={{ position: 'absolute', width: '25%' }} alt="NEW" />) : (<div />)}
            {post.discount > 0
              ? (<img src={bageSale} style={{ position: 'absolute', width: '25%', right: '0' }} alt="NEW" />)
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
