/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link, useNavigate, useParams,
} from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaShoppingBasket } from 'react-icons/fa'
import { FormEditProduct } from '../FormEditProduct/FormEditProduct'

import { api } from '../helpers/Api'
import { Modal } from '../RegistrationModal/RegisrtationModal'
import { AddCommentBlock } from './CommentsBlock/AddCommentBlock'
import formStyles from './styles.module.css'
import { addInCart, deleteProductFromCart } from '../../redux/slices/cartSlice/cartSlice'

export const CART_INFO = 'CART_INFO'

export function DetailCardPage() {
  const TOKEN = useSelector((store) => store.TOKEN)
  const myGroup = useSelector((store) => store.myUser.group)
  const myID = useSelector((store) => store.myUser._id)
  const cart = useSelector((store) => store.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalEditProduct, setIsModalEditProduct] = useState(false)

  const openModalEditProduct = () => {
    setIsModalEditProduct(true)
  }
  const closeModalEditProduct = () => {
    setIsModalEditProduct(false)
  }

  const { id } = useParams()

  const countId = () => {
    const objId = cart.find((post) => post.id === id)
    if (!objId) {
      return null
    }
    return objId.count
  }

  useEffect(() => {
    api.setNewToken(TOKEN)
    api.setNewGroup(myGroup)
    api.setNewIdCard(id)
  }, [TOKEN])

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: [CART_INFO],
    queryFn: api.getCardById,
  })

  const deleteProduct = () => {
    api.deleteMyProduct(id)
    navigate('/')
  }

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
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

  const getRaitingProducts = () => {
    const newObjRaiting = data.reviews.map((post) => post.rating)
    const sum = newObjRaiting.reduce((partialSum, a) => partialSum + a, 0)
    const result = (sum / (data.reviews.length)).toFixed(1)
    return result
  }

  return (

    <div className={`container text-center ${formStyles.card}`} style={{ paddingTop: '6rem' }}>

      <div className="container d-flex justify-content-around p-5">
        <Link to="/">
          <FaArrowLeft />
          На главную
        </Link>

        {countId() < 1
          ? (
            <button type="button" onClick={() => dispatch(addInCart(data._id))} className="btn btn-success position-relative bottom-0">В корзину</button>)
          : (
            <button type="button" onClick={() => dispatch(deleteProductFromCart(data._id))} className="btn btn-success position-relative">
              В корзине
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                <FaShoppingBasket size="20" />
              </span>
            </button>
          )}

        {data.author._id === myID
          ? (
            <>
              <button type="button" onClick={openModalEditProduct} className="btn btn-success">Редактировать мой товар</button>
              <button type="button" onClick={mutate} className="btn btn-danger">Удалить мой товар</button>
            </>
          )
          : <div />}

        <Link to="/user">
          В профиль
          <FaArrowRight />
        </Link>
      </div>

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
            <div className="fw-bold" role="button">
              Лайки
            </div>
          </div>
          <span className="badge bg-primary rounded-pill">{data.likes.length}</span>
        </li>
      </ol>

      <div className="container">
        <ul>
          <h3>Комментарии</h3>

          <AddCommentBlock idCard={id} />

        </ul>
      </div>

      <Modal
        closeHandler={closeModalEditProduct}
        isOpen={isModalEditProduct}
      >
        <FormEditProduct closeModal={closeModalEditProduct} card={data} />
      </Modal>

    </div>
  )
}
