/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { FaShoppingBasket } from 'react-icons/fa'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../helpers/Api'
import formStyles from './styles.module.css'
import bageSale from './sales.png'

import { NavBar } from './NavBar/NavBar'
import { addInCart, deleteProductFromCart } from '../../redux/slices/cartSlice/cartSlice'
import {
  SORT_BY_ABC, SORT_BY_COST, SORT_BY_DISCOUNT, SORT_BY_MY_PRODUCT,
} from '../../redux/slices/methodSortSlice/methodSortConstants'
import { addFavourite, deleteFavourite } from '../../redux/slices/favouriteSlice/favouriteSlice'
// import { deleteSort } from '../../redux/slices/methodSortSlice/methodSortSlice'
import { RaitingPrduct } from './RaitingProduct/RaitingProduct'

export const ALL_PRODUCTS = 'all_products'
export const PRODUCT_LIKES_KEY = ['PRODUCT_LIKES_KEY']

export function Main() {
  const dispatch = useDispatch()

  const cart = useSelector((store) => store.cart)

  const TOKEN = useSelector((store) => store.TOKEN)

  const search = useSelector((store) => store.search)

  const methodSort = useSelector((store) => store.methodSorting)

  const myID = useSelector((store) => store.myUser._id)

  const favourite = useSelector((store) => store.favourite)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const countId = (id) => {
    const objId = cart.find((post) => post.id === id)
    if (!objId) {
      return null
    }
    return objId.count
  }

  useEffect(() => {
    if (!TOKEN) {
      navigate('/signin')
    } else {
      api.setNewToken(TOKEN)
    //  dispatch(deleteSort())
    }
  }, [TOKEN])

  const {
    data: posts, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: [ALL_PRODUCTS, search],
    queryFn: () => api.getProductsSearchQuery(search),
  })

  const { mutate: addLike } = useMutation({
    mutationFn: (id) => api.doLikeIn(id),
    onSuccess: () => queryClient.invalidateQueries([ALL_PRODUCTS, search]),
  })

  const { mutate: deleteLike } = useMutation({
    mutationFn: (id) => api.doLikeOff(id),
    onSuccess: () => queryClient.invalidateQueries([ALL_PRODUCTS, search]),
  })

  const getPriceProduct = (id) => {
    const objProduct = posts.find((post) => post._id === id)
    if (objProduct.price) {
      return Math.round(objProduct.price / ((100 - objProduct.discount) / 100))
    }

    return 0
  }

  function getStrNumberSearch(value) {
    const getRemainder = value % 10

    switch (true) {
      case ((getRemainder) === 1):
        return '??????????'
      case (getRemainder && getRemainder < 5):
        return '????????????'
      default:
        return '??????????????'
    }
  }

  if (isLoading) return <div>Load</div>

  if (isError) {
    return (
      <div>
        <h6>{error.toString()}</h6>
        <button type="button" onClick={refetch} className="btn btn-success">refetch</button>
      </div>
    )
  }
  if (!posts.length) {
    return (
      <div className={`text-center ${formStyles.pageMainLow}`}>
        <h4>{`???? ???????????? ???????????? ??????????????: ${posts.length} ${getStrNumberSearch(posts.length)}`}</h4>
        <h5>is empty</h5>
      </div>
    )
  }

  const myLike = (ids) => ids.find((id) => id === myID)

  const isFavoriteProduct = (id) => favourite.find((post) => post === id)

  const getRaitnigProduct = (arrayReviews) => {
    const newArrayReviews = arrayReviews.map((element) => element.rating)
    const sum = newArrayReviews.reduce((partialSum, a) => partialSum + a, 0)
    const result = (sum / (arrayReviews.length).toFixed(1))
    return Math.round(result)
  }

  const newArrayPosts = () => {
    switch (methodSort) {
      case SORT_BY_COST:
        return [...posts].sort((a, b) => b.price - a.price)
      case SORT_BY_ABC:
        return [...posts].sort((a, b) => a.name.localeCompare(b.name))
      case SORT_BY_DISCOUNT:
        return [...posts].sort((a, b) => b.discount - a.discount)
      case SORT_BY_MY_PRODUCT:
        return posts.filter((post) => post.author._id === myID)
      default:
        return posts
    }
  }

  return (
    <div>
      <NavBar />
      <div className={newArrayPosts().length > 4
        ? formStyles.pageMain
        : formStyles.pageMainLow}
      >
        {search ? (<div className="text-center"><h4>{`???? ???????????? ???????????? ??????????????: ${posts.length} ${getStrNumberSearch(posts.length)}`}</h4></div>) : <div /> }
        <div className="container d-flex flex-wrap pt-2 justify-content-between position-relative">
          {newArrayPosts().map((post) => (
            <div className={`card m-3 ${formStyles.pageCard}`} style={{ width: '18rem' }} key={post._id}>
              {post.author._id === myID
                ? (
                  <span className="position-absolute z-3 top-10 start-50 translate-middle badge rounded-pill bg-danger fs-6">
                    ?????? ??????????
                  </span>
                )
                : (<div />)}

              {!isFavoriteProduct(post._id)
                ? (<FcLikePlaceholder type="button" onClick={() => dispatch(addFavourite(post._id))} className="z-3 position-absolute fs-2" style={{ right: '.5rem' }} />)
                : (<FcLike type="button" onClick={() => dispatch(deleteFavourite(post._id))} className="z-3 position-absolute fs-2" style={{ right: '.5rem' }} />)}

              {!myLike(post.likes)
                ? <AiOutlineLike type="button" className="z-3 position-absolute fs-2 text-success" onClick={() => addLike(post._id)} style={{ right: '.5rem', top: '3rem', opacity: '.4' }} />
                : <AiFillLike type="button" className="z-3 position-absolute fs-2 text-success" onClick={() => deleteLike(post._id)} style={{ right: '.5rem', top: '3rem' }} />}

              <Link to={`/products/${post._id}`} className="text-decoration-none card" style={{ height: '30rem' }}>

                {post.discount > 0
                  ? (<img src={bageSale} style={{ position: 'absolute', width: '25%', left: '0' }} alt="NEW" />)
                  : (<div />)}

                <img src={post.pictures} style={{ height: '18rem', objectFit: 'cover' }} alt={post.name} />
                <div className="card-body p-0">
                  <h5 className="card-title text-center text-success">{post.name}</h5>
                </div>
                <div>
                  <RaitingPrduct raitingProductValue={getRaitnigProduct(post.reviews)} />
                </div>
                <div className="text-center text-success">
                  {post.wight ? (<h6>{`???????? ???? ${post.wight}`}</h6>) : (<h6>???????? ???? ??????????</h6>)}
                </div>
                <div className="d-flex justify-content-center">
                  <h5 className="card-text text-center p-3 text-dark">
                    {post.price}
                    ???
                  </h5>
                  {post.discount
                    ? (
                      <h5 className="p-3 text-decoration-line-through text-danger position-relative">
                        (
                        {getPriceProduct(post._id)}
                        ???)
                        <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                          -
                          {post.discount}
                          %
                        </span>
                      </h5>
                    )
                    : <div />}
                </div>
              </Link>
              {countId(post._id) < 1
                ? (
                  <button type="button" onClick={() => dispatch(addInCart(post._id))} className="btn btn-success position-relative bottom-0">?? ??????????????</button>)
                : (
                  <button type="button" onClick={() => dispatch(deleteProductFromCart(post._id))} className="btn btn-success position-relative">
                    ?? ??????????????
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      <FaShoppingBasket size="20" />
                    </span>
                  </button>
                )}
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}
