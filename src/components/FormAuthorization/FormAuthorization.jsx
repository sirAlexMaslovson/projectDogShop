import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { api } from '../helpers/Api'
import formStyles from './styles.module.css'
import { addToken } from '../../redux/slices/tokenSlice/tokenSlice'
import { addUserInfo } from '../../redux/slices/myUserSlice/myUserSlice'

export function FormAuthorization() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const REQUIRED_ERROR_MESSAGE = 'Пожалуйста заполните поле'

  const myMail = sessionStorage.getItem('myMail')

  const myPassword = sessionStorage.getItem('myPassword')

  const getMyMail = () => {
    if (myMail) {
      return myMail
    }
    return ''
  }

  const getMyPassword = () => {
    if (myPassword) {
      return myPassword
    }
    return ''
  }

  const isSuccess = sessionStorage.getItem('success')

  const postValuesAuthorization = (values) => api.authorization(values)
    .then((data) => {
      const { token, ...rest } = data
      dispatch(addToken(token))
      dispatch(addUserInfo(rest.data))
    })
    .then(() => sessionStorage.clear())
    .then(() => navigate('/'))

  const { mutate } = useMutation({
    mutationFn: postValuesAuthorization,
  })

  return (
    <div className={`d-flex justify-content-center align-items-center ${formStyles.pageAuth}`}>
      <Formik
        initialValues={{
          email: getMyMail(),
          password: getMyPassword(),
        }}
        validationSchema={Yup.object(
          {
            password: Yup.string()
              .min(2, 'Укажите минимум два символа')
              .max(20, 'Не более 20 символов')
              .required(REQUIRED_ERROR_MESSAGE),
            email: Yup.string().email('Invalid email address').required(REQUIRED_ERROR_MESSAGE),
          },
        )}
        onSubmit={mutate}
      >
        <Form>
          { isSuccess ? (
            <div className="alert alert-success text-center" role="alert">
              <h5>Вы успешно зарегистрировались!</h5>
            </div>
          ) : <div />}
          <div className={`d-flex justify-content-center align-items-center flex-column ${formStyles.formikForm}`}>
            <h5 className="text-center mb-3">Пройдите авторизацию</h5>
            <p className="text-center">
              Если вы еще не авторизованы в системе
              <br />
              <Link to="/signup" onClick={() => navigate('/signup')}>зарегистрируйтесь</Link>
            </p>
            <div className="mb-3">
              <div id="emailHelp" className="form-text text-dark text-center">Введите свою почту</div>
              <Field type="text" placeholder="email" name="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" />
              <ErrorMessage name="email" />
            </div>
            <div className="mb-3">
              <div id="emailHelp" className="form-text text-dark text-center">Введите пароль</div>
              <Field type="password" placeholder="password" name="password" className="form-control" id="InputPassword1" />
              <ErrorMessage name="password" />
            </div>
          </div>
          <div className="text-center"><button type="submit" className="btn btn-success">Авторизоваться</button></div>
        </Form>
      </Formik>
    </div>
  )
}
