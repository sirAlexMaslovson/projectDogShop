/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
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

  const { mutate: doComment } = useMutation({
    mutationFn: () => api.doCommentById(idForCard, objComment),
    onSuccess: () => queryClient.invalidateQueries(PRODUCT_REWIEWS_KEY.concat(idForCard)),
  })

  const { mutate: deleteComment } = useMutation({
    mutationFn: (idProduct, idComment) => api.deleteCommentById(idProduct, idComment),
    onSuccess: () => queryClient.invalidateQueries(PRODUCT_REWIEWS_KEY.concat(idForCard)),
  })

  if (isLoading) return <div>Load</div>

  const myComments = () => reviews.filter((post) => post.author._id === myID)

  const allCommentsUsers = () => reviews.filter((post) => post.author._id !== myID)

  const clickHandlerPostComment = (event) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      doComment()
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

      <h5 className="text-info-emphasis">Мои комментарии:</h5>
      {myComments().map((post) => (
        <div className="pb-3" key={crypto.randomUUID()}>
          <div className="alert alert-info p-0 d-flex" role="alert">
            <div className="p-2 w-100">
              <h5>{post.text}</h5>
              <p>
                {`Автор: ${post.author.name}  (${post.created_at.substring(0, 10)})`}
              </p>
            </div>
            <div type="button" className="p-2 flex-shrink-1 text-danger" style={{ fontSize: '2rem' }}>
              <RiDeleteBin6Line onClick={() => deleteComment(idForCard, post._id)} />
            </div>
          </div>
        </div>
      ))}

      <h5>Комментарии пользователей:</h5>
      {allCommentsUsers().map((post) => (
        <div key={crypto.randomUUID()}>
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
