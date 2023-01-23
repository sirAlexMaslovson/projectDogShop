/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../helpers/Api'
import { AddCommentBlock } from './CommentsBlock/CommentsBlock'
import formStyles from './styles.module.css'
import { UsersByLikeProduct } from './UsersByLikeProduct/UsersByLikeProduct'

export const CART_INFO = 'CART_INFO'

export function DetailCardPage() {
  const TOKEN = useSelector((store) => store.TOKEN)
  const myGroup = useSelector((store) => store.myUser.group)
  const idForCart = useSelector((store) => store.idForDetailCard)

  useEffect(() => {
    api.setNewToken(TOKEN)
    api.setNewGroup(myGroup)
    api.setNewIdCard(idForCart)
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: [CART_INFO],
    queryFn: api.getCardById,
  })

  if (isLoading) return <div>Load</div>
  if (isError) return <div>ошибка авторизации</div>

  const getRaitingProducts = () => {
    const newObjRaiting = data.reviews.map((post) => post.rating)
    const sum = newObjRaiting.reduce((partialSum, a) => partialSum + a, 0)
    const result = (sum / (data.reviews.length)).toFixed(1)
    return result
  }

  const getPostsProductsReviews = data.reviews

  const arrayPostsLikes = data.likes

  /* const getUsersArray = () => api.getUsersById(arrayPostsLikes)

  console.log(getUsersArray()) */

  return (

    <div className={`container text-center ${formStyles.card}`}>
      <div className="row">

        <div className="col-4 pt-5">
          <div>
            <img src={data.pictures} className="card-img-top" alt="..." />
            <div className="card-body">
              <h3 className="card-title">{data.name}</h3>
              <p className="card-text">{`Описание: ${data.description}`}</p>
              <p className="card-text">{`Цена за ${data.wight}: ${data.price} ₽`}</p>
            </div>
          </div>
        </div>
        <div className="col-8 p-5">
          <div>
            <h4>{`Автор публикации: ${data.author.name}`}</h4>
            <li className="list-group-item"><img src={data.author.avatar} alt="аватар" style={{ height: '18rem', objectFit: 'cover' }} /></li>
            <li className="list-group-item">{`Профессия: ${data.author.about}`}</li>
            <li className="list-group-item">{`Id автора: ${data.author._id}`}</li>
            <li className="list-group-item">{`email автора: ${data.author.email}`}</li>
          </div>
        </div>
      </div>

      <ol className="list-group list-group-numbered p-3">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Средняя оценка</div>
          </div>
          <span className="badge bg-primary rounded-pill">{getRaitingProducts()}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Отзывы</div>
          </div>
          <span className="badge bg-primary rounded-pill">{data.reviews.length}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <ul className="nav-item dropdown">
              <div className="nav-link dropdown-toggle fw-bold" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Лайки
              </div>

              <UsersByLikeProduct arrayPostsLikes={arrayPostsLikes} />

            </ul>
          </div>
          <span className="badge bg-primary rounded-pill">{data.likes.length}</span>
        </li>
      </ol>

      <div className="container">
        <ul>
          <h3>Комментарии</h3>

          <AddCommentBlock />

          {getPostsProductsReviews.map((post) => (
            <div key={crypto.randomUUID()}>
              <div className="alert alert-success p-0" role="alert">
                <h5>{post.text}</h5>
                <p>
                  {`Автор: ${post.author}  (${post.created_at.substring(0, 10)})`}
                </p>
              </div>
            </div>
          ))}
        </ul>
      </div>

    </div>
  )
}
