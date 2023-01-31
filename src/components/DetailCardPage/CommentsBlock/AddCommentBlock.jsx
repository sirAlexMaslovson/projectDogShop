/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import { api } from '../../helpers/Api'

export const PRODUCT_REWIEWS_KEY = ['PRODUCT_REWIEWS_KEY']

export function AddCommentBlock() {
  const { id } = useParams()

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
    queryKey: PRODUCT_REWIEWS_KEY.concat(id),
    queryFn: () => api.getProductReviews(id),
  })

  const { mutate: doComment } = useMutation({
    mutationFn: () => api.doCommentById(id, objComment),
    onSuccess: () => queryClient.invalidateQueries(PRODUCT_REWIEWS_KEY.concat(id)),
  })

  const deleteMyComment = (idProduct, idComment) => {
    console.log(`Вызов в функции queryFn: ${idProduct}, ${idComment}`)
    api.deleteCommentById(idProduct, idComment)
  }

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteMyComment,
    onSuccess: () => queryClient.invalidateQueries(PRODUCT_REWIEWS_KEY.concat(id)),
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
              <RiDeleteBin6Line onClick={() => {
                deleteComment(post.product, post._id)
                console.log(`вызов в onClick: ${post.product}, ${post._id}`)
              }}
              />
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
