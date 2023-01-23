/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../helpers/Api'

export const PRODUCT_REWIEWS_KEY = ['PRODUCT_REWIEWS_KEY']

export function AddCommentBlock() {
  const idForCard = useSelector((store) => store.idForDetailCard)

  const myID = useSelector((store) => store.myUser._id)

  const [commentInput, setCommentInput] = useState('')

  const queryClient = useQueryClient()

  const changePostInputHandler = (e) => {
    setCommentInput(e.target.value)
  }

  const objComment = {
    text: commentInput.toString(),
  }

  const { data: reviews, isLoading } = useQuery({
    queryKey: PRODUCT_REWIEWS_KEY.concat(idForCard),
    queryFn: () => api.getProductReviews(idForCard),
  })

  const { mutate } = useMutation({
    mutationFn: () => api.doCommentById(idForCard, objComment),
    onSuccess: () => queryClient.invalidateQueries(PRODUCT_REWIEWS_KEY.concat(idForCard)),
  })

  if (isLoading) return <div>Load</div>

  const myComments = () => reviews.filter((post) => post.author._id === myID)

  const allCommentsUsers = () => reviews.filter((post) => post.author._id !== myID)

  const clickHandlerPostComment = (event) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      mutate()
      setCommentInput('')
    }
  }

  return (
    <div className="container">

      <div className="p-3">
        <h5>Оставить свой комментарий</h5>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search" style={{ width: '100%' }}>
              <input className="form-control me-2" type="input" value={commentInput} onChange={changePostInputHandler} placeholder="комметарий" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit" onClick={clickHandlerPostComment}>Отправить</button>
            </form>
          </div>
        </nav>
      </div>

      {myComments().map((post) => (
        <div className="pb-3" key={crypto.randomUUID()}>
          <h5>Мои комментарии:</h5>
          <div className="alert alert-info p-0" role="alert">
            <h5>{post.text}</h5>
            <p>
              {`Автор: ${post.author.name}  (${post.created_at.substring(0, 10)})`}
            </p>
          </div>
        </div>
      ))}

      {allCommentsUsers().map((post) => (
        <div key={crypto.randomUUID()}>
          <h5>Комментарии пользователей:</h5>
          <div className="alert alert-success p-0" role="alert">
            <h5>{post.text}</h5>
            <p>
              {`Автор: ${post.author.name}  (${post.created_at.substring(0, 10)})`}
            </p>
          </div>
        </div>
      ))}

    </div>
  )
}
