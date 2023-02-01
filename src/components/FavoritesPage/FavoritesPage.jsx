/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { api } from '../helpers/Api'
import formStyles from './styles.module.css'

export const MY_FAVOURITE_PRODUCTS = 'MY_FAVOURITE_PRODUCTS'

export function FavoritesPage() {
  const favourite = useSelector((store) => store.favourite)
  const TOKEN = useSelector((store) => store.TOKEN)

  useEffect(() => {
    api.setNewToken(TOKEN)
  }, [TOKEN])

  const { data, isLoading } = useQuery({
    queryKey: [MY_FAVOURITE_PRODUCTS],
    queryFn: () => api.getProductsByIds(favourite),
  })

  if (isLoading) return <div>Load</div>
  if (!data.length) {
    return (
      <div className={formStyles.pageFavorites}>
        <h5 className="text-center">is empty</h5>
      </div>
    )
  }

  return (
    <div className={formStyles.pageFavorites}>
      <div className="container text-center pt-5">
        <div className="row row-cols-3">

          {data.map((post) => (
            <div className="col pt-3" key={crypto.randomUUID()}>
              <div className="card" style={{ width: '15rem' }}>
                <Link to={`/products/${post._id}`} className="text-decoration-none text-success card">
                  <img src={post.pictures} className="card-img-top" alt={post.name} />
                  <div className="card-body">
                    <h5 className="card-title">{post.name}</h5>
                    <p className="card-text">{post.description}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
