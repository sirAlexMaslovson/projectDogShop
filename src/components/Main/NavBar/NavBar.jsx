import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  deleteSort, sortByABC, sortByCost, sortByDiscount,
} from '../../../redux/slices/methodSortSlice/methodSortSlice'

export function NavBar() {
  const dispatch = useDispatch()

  return (
    <ul className="nav justify-content-center align-items-center">
      <li className="nav-item">
        <h5>сортировка:</h5>
      </li>
      <li className="nav-item">
        <h6 className="nav-link"><Link to="/" onClick={() => dispatch(sortByABC())}>По алфавиту</Link></h6>
      </li>
      <h6>/</h6>
      <li className="nav-item">
        <h6 className="nav-link"><Link to="/" onClick={() => dispatch(sortByCost())}>По стоимости</Link></h6>
      </li>
      <h6>/</h6>
      <li className="nav-item">
        <h6 className="nav-link"><Link to="/" onClick={() => dispatch(sortByDiscount())}>По скидке</Link></h6>
      </li>
      <h6>/</h6>
      <li className="nav-item">
        <h6 className="nav-link"><Link to="/" onClick={() => dispatch(deleteSort())}>Без фильтра</Link></h6>
      </li>
    </ul>
  )
}
