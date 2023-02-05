/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'
import {
  addBayAllProduct,
  addBayProduct,
  clearCart,
  decrementProduct,
  deleteBayAllProducts,
  deleteBayProduct,
  deleteProductFromCart,
  incrementProduct,
} from '../../redux/slices/cartSlice/cartSlice'

import { api } from '../helpers/Api'
import formStyles from './styles.module.css'
import basketEmpty from './z9324f852.png'

export const PRODUCT_CART_KEY = ['PRODUCT_CART_KEY']

export function CartPage() {
  const cart = useSelector((store) => store.cart)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const getCartItemQueryKey = (cartItemsId) => PRODUCT_CART_KEY.concat(cartItemsId)

  const cartMapID = () => cart.map((product) => product.id)

  const TOKEN = useSelector((store) => store.TOKEN)

  useEffect(() => {
    api.setNewToken(TOKEN)
  }, [TOKEN])

  const {
    data: products, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getCartItemQueryKey(cartMapID()),
    queryFn: () => api.getProductsByIds(cartMapID()),
  })

  const countId = (id) => {
    const objId = cart.find((post) => post.id === id)
    if (!objId) {
      return null
    }
    return objId.count
  }

  const inBayProduct = (id) => {
    const objId = cart.find((post) => post.id === id)
    if (!objId) {
      return null
    }
    return objId.inBay
  }

  const getPriceProduct = (id) => {
    const objProduct = products.find((post) => post._id === id)
    return Math.round(objProduct.price * countId(id))
  }

  const getPriceDiscount = (id) => {
    const objProduct = products.find((post) => post._id === id)
    return Math.round(
      ((objProduct.price / ((100 - objProduct.discount) / 100)) - objProduct.price) * countId(id),
    )
  }

  const isAllProductsInPrice = () => cart.every((product) => product.inBay === true)

  const getTotalPriceBay = () => {
    const arrayAllPriceBay = cart.filter((card) => card.inBay !== false)
    const objAllPriceBay = arrayAllPriceBay.map((product) => getPriceProduct(product.id))
    return objAllPriceBay.reduce((acc, number) => acc + number, 0)
  }

  const getTotalPriceDiscount = () => {
    const arrayAllPriceBay = cart.filter((card) => card.inBay !== false)
    const objAllPriceBay = arrayAllPriceBay.map((product) => getPriceDiscount(product.id))
    return objAllPriceBay.reduce((acc, number) => acc + number, 0)
  }

  const clickHandlerMain = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/')
    }
  }

  if (isLoading) return <div className={formStyles.cart}>Load</div>
  if (isError) {
    return (
      <div>
        <h6>{error.toString()}</h6>
        <button type="button" onClick={refetch} className="btn btn-success">refetch</button>
      </div>
    )
  }
  if (!products.length) {
    return (
      <div className={`d-flex justify-content-center ${formStyles.cartEmpty}`}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center mb-5">Ваша корзина пуста</h1>
          <img src={basketEmpty} alt="корзина" />
          <button type="button" onClick={clickHandlerMain} className="btn btn-primary">На главную</button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={products.length > 2 && products.length !== 0
        ? (`d-flex flex-column mb-3 ${formStyles.cart}`)
        : (`d-flex flex-column mb-3 ${formStyles.cartLow}`)}
      style={{ paddingTop: '7rem' }}
    >
      <div className="d-flex justify-content-around p-3">
        <button type="button" onClick={clickHandlerMain} className="btn btn-primary">На главную</button>
        <button type="button" onClick={() => dispatch(clearCart())} className="btn btn-danger">Очистить корзину</button>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col-8">

            {!isAllProductsInPrice()
              ? (
                <div className="form-check p-3" style={{ width: '30%' }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => dispatch(addBayAllProduct())}
                    checked={isAllProductsInPrice()}
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <h5>Выбрать всё</h5>
                  </label>
                </div>
              )
              : (
                <div className="form-check p-3" style={{ width: '30%' }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => dispatch(deleteBayAllProducts())}
                    checked={isAllProductsInPrice()}
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <h5>Выбрать всё</h5>
                  </label>
                </div>
              )}

            {products.map((post) => (
              <div className="text-center" key={post._id}>
                <div className="row" />
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={post.pictures} className="img-fluid rounded-start" alt={post.name} />
                    </div>
                    <div className="col-md-8 d-flex justify-content-center align-items-center">
                      <div className="card-body">
                        <h4 className="card-title">{post.name}</h4>
                        <p className="card-text">Количество</p>
                        <div className="d-flex justify-content-center">
                          {countId(post._id) > 1
                            ? (<button type="button" onClick={() => dispatch(decrementProduct(post._id))} className="btn btn-secondary">-</button>)
                            : <button type="button" onClick={() => dispatch(deleteProductFromCart(post._id))} className="btn btn-secondary">-</button>}
                          <p className="card-text p-3">{countId(post._id)}</p>
                          {countId(post._id) < post.stock
                            ? (<button type="button" onClick={() => dispatch(incrementProduct(post._id))} className="btn btn-secondary">+</button>)
                            : <div />}
                        </div>
                        <button type="button" onClick={() => dispatch(deleteProductFromCart(post._id))} className="btn btn-danger">Удалить</button>
                        <div>
                          <h5>
                            Общая стоимость:
                            {' '}
                            {getPriceProduct(post._id)}
                            ₽
                          </h5>
                          {post.discount
                            ? (
                              <p>
                                Скидка:
                                {' '}
                                {getPriceDiscount(post._id)}
                                ₽
                              </p>
                            )
                            : <div />}

                        </div>
                        <div className="form-check">
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            Выбрать товар
                            {!inBayProduct(post._id)
                              ? (
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={() => dispatch(addBayProduct(post._id))}
                                  checked={inBayProduct(post._id)}
                                  id="flexCheckDefault"
                                />
                              )
                              : (
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={() => dispatch(deleteBayProduct(post._id))}
                                  checked={inBayProduct(post._id)}
                                  id="flexCheckDefault"
                                />
                              )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-4 container p-5">
            <h2 className="p-3">Сумма заказа</h2>
            <h3 className="p-1 text-decoration-underline">
              {getTotalPriceBay()}
              ₽
            </h3>
            {getTotalPriceDiscount()
              ? (
                <>
                  <h4 className="pt-5">Общая скидка</h4>
                  <h5 className="p-3">
                    {getTotalPriceDiscount()}
                    ₽
                  </h5>
                </>
              )
              : <div />}

            <button type="button" className="btn btn-success m-5">Перейти к оформлению</button>
          </div>
        </div>
      </div>
    </div>
  )
}
