/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { deleteSort } from '../../redux/slices/methodSortSlice/methodSortSlice'
import { nullSearch } from '../../redux/slices/searchSlice/searchSlice'
import { FormAddProduct } from '../FormAddProduct/FormAddProduct'
import { FormRedMyUser } from '../FormRedMyUser/FormRedMyUser'
import { api } from '../helpers/Api'
import { Modal } from '../RegistrationModal/RegisrtationModal'
import formStyles from './styles.module.css'
import { FormRedMyAvatar } from '../FormRedMyAvatar/FormRedMyAvatar'
import { deleteToken } from '../../redux/slices/tokenSlice/tokenSlice'

export const USER_INFO = 'user_info'

export function UserInfo() {
  const [isModalAddProduct, setIsModalAddProduct] = useState(false)
  const [isModalRedMyUser, setIsModalRedMyUser] = useState(false)
  const [isModalRedMyAvavtar, setIsModalRedMyAvavtar] = useState(false)

  const openModalAddProduct = () => {
    setIsModalAddProduct(true)
  }
  const closeModalAddProduct = () => {
    setIsModalAddProduct(false)
  }

  const openModalRedMyUser = () => {
    setIsModalRedMyUser(true)
  }
  const closeModalRedMyUser = () => {
    setIsModalRedMyUser(false)
  }

  const openModalRedMyAvavtar = () => {
    setIsModalRedMyAvavtar(true)
  }
  const closeModalRedMyAvavtar = () => {
    setIsModalRedMyAvavtar(false)
  }

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const TOKEN = useSelector((store) => store.TOKEN)

  const myGroup = useSelector((store) => store.myUser.group)

  useEffect(() => {
    api.setNewToken(TOKEN)
    api.setNewGroup(myGroup)
  }, [])

  const clickHandlerOut = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(deleteToken())
      navigate('/signin')
    }
  }

  const clickHandlerMain = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/')
      dispatch(nullSearch())
      dispatch(deleteSort())
    }
  }

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: [USER_INFO],
    queryFn: api.getUserInfo,
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

  return (
    <>
      <div className={formStyles.pageInfo}>
        <div className="container d-flex justify-content-around p-5">
          <Link to="/"><button type="button" onClick={clickHandlerMain} className="btn btn-primary">???? ??????????????</button></Link>
          <button type="button" onClick={openModalAddProduct} className="btn btn-success">???????????????? ??????????</button>
          <button type="button" onClick={openModalRedMyUser} className="btn btn-success">?????????????????????????? ??????????????</button>
          <button type="button" onClick={clickHandlerOut} className="btn btn-danger">?????????? ???? ????????????????</button>
        </div>

        <div className="container text-center pt-3">
          <img src={data.avatar} alt="????????????" style={{ height: '20rem', borderRadius: '20px' }} />
          <div type="button" className="position-static fs-3 text-primary">
            <FaEdit onClick={openModalRedMyAvavtar} />
            :?????????????????????????? ??????????????????????
          </div>
        </div>

        <div className="container text-center pt-5 pb-5">
          <div className="row row-cols-3">
            <div className="col pb-5">
              <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
                <div className="card-body">
                  <h5 className="card-title">?????? ?????? ?? ??????????????</h5>
                  <hr />
                  <p className="card-text">{data.name}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
                <div className="card-body">
                  <h5 className="card-title">?????? id</h5>
                  <hr />
                  <p className="card-text">{data._id}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
                <div className="card-body">
                  <h5 className="card-title">?????? Email</h5>
                  <hr />
                  <p className="card-text">{data.email}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
                <div className="card-body">
                  <h5 className="card-title">?????? ??????</h5>
                  <hr />
                  <p className="card-text">{data.about}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
                <div className="card-body">
                  <h5 className="card-title">?????? ????????????</h5>
                  <hr />
                  <p className="card-text">{data.group}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
                <div className="card-body">
                  <h5 className="card-title">???????????? ??????????????????????????</h5>
                  <hr />
                  <p className="card-text">?????????????? ????????????????????????</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Modal
        closeHandler={closeModalAddProduct}
        isOpen={isModalAddProduct}
      >
        <FormAddProduct closeModal={closeModalAddProduct} />
      </Modal>

      <Modal
        closeHandler={closeModalRedMyUser}
        isOpen={isModalRedMyUser}
      >
        <FormRedMyUser closeModal={closeModalRedMyUser} />
      </Modal>

      <Modal
        closeHandler={closeModalRedMyAvavtar}
        isOpen={isModalRedMyAvavtar}
      >
        <FormRedMyAvatar closeModal={closeModalRedMyAvavtar} />
      </Modal>

    </>

  )
}
