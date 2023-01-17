/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteSort } from '../../redux/actionsCreators/methodSortAC'
import { deleteMyUserInfo } from '../../redux/actionsCreators/myUserReducerAC'
import { nullSearch } from '../../redux/actionsCreators/searchAC'
import { deleteToken } from '../../redux/actionsCreators/tokenAC'
import { api } from '../helpers/Api'
import formStyles from './styles.module.css'

export const USER_INFO = 'user_info'

export function UserInfo() {
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
      dispatch(deleteMyUserInfo())
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

  const { data, isLoading, isError } = useQuery({
    queryKey: [USER_INFO],
    queryFn: api.getUserInfo,
  })

  if (isLoading) return <div>Load</div>
  if (isError) return <div>ошибка авторизации</div>

  return (
    <div className={formStyles.pageInfo}>
      <div className="container d-flex justify-content-around pt-5">
        <Link to="/"><button type="button" onClick={clickHandlerMain} className="btn btn-primary">На главную</button></Link>
        <button type="button" onClick={clickHandlerOut} className="btn btn-danger">Выйти из аккаунта</button>
      </div>

      <div className="container text-center pt-3">
        <img src={data.avatar} alt="Аватар" style={{ height: '30vh', borderRadius: '20px' }} />
      </div>

      <div className="container text-center pt-5 pb-5">
        <div className="row row-cols-3">
          <div className="col pb-5">
            <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
              <div className="card-body">
                <h5 className="card-title">Моё имя и фамилия</h5>
                <hr />
                <p className="card-text">{data.name}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
              <div className="card-body">
                <h5 className="card-title">Мой id</h5>
                <hr />
                <p className="card-text">{data._id}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
              <div className="card-body">
                <h5 className="card-title">Мой Email</h5>
                <hr />
                <p className="card-text">{data.email}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
              <div className="card-body">
                <h5 className="card-title">Обо мне</h5>
                <hr />
                <p className="card-text">{data.about}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
              <div className="card-body">
                <h5 className="card-title">Моя группа</h5>
                <hr />
                <p className="card-text">{data.group}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: '18rem', borderRadius: '20px' }}>
              <div className="card-body">
                <h5 className="card-title">Статус пользователся</h5>
                <hr />
                <p className="card-text">Обычный пользователь</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
