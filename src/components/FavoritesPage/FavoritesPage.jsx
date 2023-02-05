/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFavourite } from '../../redux/slices/favouriteSlice/favouriteSlice'
import { api } from '../helpers/Api'
import formStyles from './styles.module.css'

export const MY_FAVOURITE_PRODUCTS = 'MY_FAVOURITE_PRODUCTS'

export function FavoritesPage() {
  const favourite = useSelector((store) => store.favourite)
  const TOKEN = useSelector((store) => store.TOKEN)
  const dispatch = useDispatch()

  useEffect(() => {
    api.setNewToken(TOKEN)
  }, [TOKEN])

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: [MY_FAVOURITE_PRODUCTS].concat(favourite),
    queryFn: () => api.getProductsByIds(favourite),
  })

  if (isLoading) return <div>Load</div>
  if (isError) {
    return (
      <div>
        <h6>{error.toString()}</h6>
        <button type="button" onClick={refetch} className="btn btn-success">refetch</button>
      </div>
    )
  }
  if (!data.length) {
    return (
      <div className={formStyles.pageFavorites}>
        <h5 className="text-center">is empty</h5>
      </div>
    )
  }

  return (
    <div className={`${formStyles.pageFavorites}`}>
      <div className="container text-center pt-5">
        <div className="row row-cols-3">

          {data.map((post) => (
            <div className="col pt-3" key={crypto.randomUUID()}>
              <div className="card" style={{ width: '15rem' }}>
                <Link to={`/products/${post._id}`} className="text-decoration-none text-success card">
                  <img src={post.pictures} className="card-img-top" alt={post.name} />
                  <div className="card-body">
                    <h5 className="card-title">{post.name}</h5>
                  </div>
                </Link>
                <button type="button" onClick={() => dispatch(deleteFavourite(post._id))} className="btn btn-danger">Убрать из избранного</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
