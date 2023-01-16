import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FaBoxOpen, FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useEffect, useState } from 'react'
import companyLogo from './kisspng-logo-dog-la-baule-escoublac-petplate-brand-5beda5be4ad450.3618153715423011183065.png'
import formStyles from './modal.module.css'
import { addSearch, nullSearch } from '../../redux/actionsCreators/searchAC'
import { useDebonce } from '../hooks/useDebonce'
import { deleteSort } from '../../redux/actionsCreators/methodSortAC'
// import { useDebonce } from '../hooks/useDebonce'

export function Header() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const cart = useSelector((store) => store.cart)
  const [searchInput, setSearchInput] = useState(() => searchParams.get('q') ?? '')
  const badge = cart.length

  const debouncedSearchValue = useDebonce(searchInput, 500)

  const dispatch = useDispatch()

  const myID = localStorage.getItem('myId')

  const clickHandlerUser = (e) => {
    if (e.target === e.currentTarget) {
      navigate(`/user/${myID}`)
    }
  }

  useEffect(() => {
    dispatch(addSearch(debouncedSearchValue))
  }, [debouncedSearchValue])

  const changeInputHandler = (e) => {
    setSearchInput(e.target.value)
    setSearchParams({
      q: e.target.value,
    })
  }

  const getMainPage = () => {
    dispatch(nullSearch())
    dispatch(deleteSort())
  }

  return (
    <header>
      <div
        className={`d-flex justify-content-around align-items-center pt-3 pb-3 ${formStyles.header}`}
      >
        <div
          className="d-flex justify-content-start align-items-center"
          style={{ width: '65%' }}
        >
          <Link to="/" onClick={() => getMainPage} style={{ width: '20%' }}>
            <img src={companyLogo} style={{ width: '40%' }} alt="logo" />
          </Link>

          <input value={searchInput} onChange={changeInputHandler} style={{ width: '100%' }} />
        </div>
        {localStorage.getItem('myId') ? (
          <>
            <Link to="/favorites">
              <div type="button" className="position-relative">
                <FaHeart size="40" style={{ color: 'red' }} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  +
                  <span className="visually-hidden">unread messages</span>
                </span>
              </div>
            </Link>

            <Link to={`/cart/${localStorage.getItem('myId')}`}>
              <div type="button" className="position-relative">
                <FaBoxOpen size="40" style={{ color: 'black' }} />
                {badge > 0 ? (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {badge}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                ) : (
                  <div />
                )}
              </div>
            </Link>

            <ul className="nav justify-content-end align-items-center">
              <li className="nav-item position-relative">

                <button
                  type="button"
                  onClick={clickHandlerUser}
                  className="btn btn-warning"
                >
                  {localStorage.getItem('myName')}
                </button>

              </li>
            </ul>
          </>
        ) : (
          <div>
            <h5>Вы не авторизованы в системе</h5>
          </div>
        )}
      </div>
    </header>
  )
}
