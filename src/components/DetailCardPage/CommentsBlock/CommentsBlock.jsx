import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../helpers/Api'

export function AddCommentBlock() {
  const idForCard = useSelector((store) => store.idForDetailCard)

  const TOKEN = useSelector((store) => store.TOKEN)

  const [commentInput, setCommentInput] = useState('')

  useEffect(() => {
    api.setNewToken(TOKEN)
  }, [])

  const changePostInputHandler = (e) => {
    setCommentInput(e.target.value)
  }

  const objComment = {
    text: commentInput.toString(),
  }

  const { mutate, isError } = useMutation({
    mutationFn: () => api.doCommentById(idForCard, objComment),
  })

  if (isError) {
    return (<div>Error</div>)
  }

  return (
    <div className="p-3">
      <h5>Оставить свой комментарий</h5>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <form className="d-flex" role="search" style={{ width: '100%' }}>
            <input className="form-control me-2" type="input" value={commentInput} onChange={changePostInputHandler} placeholder="комметарий" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit" onSubmit={mutate}>Отправить</button>
          </form>
        </div>
      </nav>
    </div>
  )
}
