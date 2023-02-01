import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { api } from '../helpers/Api'
import formStyles from './styles.module.css'

export function FormRegistration() {
  const navigate = useNavigate()

  const REQUIRED_ERROR_MESSAGE = 'Пожалуйста заполните поле'

  const postValuesRegistration = (values) => {
    const { group, ...rest } = values
    return api.registration(values)
      .then((datas) => {
        if (datas) {
          console.log(datas)
          sessionStorage.setItem('myMail', rest.email)
          sessionStorage.setItem('myPassword', rest.password)
          sessionStorage.setItem('success', true)
          navigate('/signin')
        } else {
          navigate('/signup')
        }
      })
  }

  const { mutate, isError, error } = useMutation({
    mutationFn: postValuesRegistration,
  })

  console.log({ isError, error })

  return (
    <div className={`d-flex justify-content-center align-items-center ${formStyles.pageAuth}`}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          group: '',
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(2, 'Укажите минимум два символа')
            .max(20, 'Не более 20 символов')
            .required(REQUIRED_ERROR_MESSAGE),
          group: Yup.string()
            .min(2, 'Не менее 2 символов')
            .required(REQUIRED_ERROR_MESSAGE),
          email: Yup.string().email('Invalid email address').required(REQUIRED_ERROR_MESSAGE),
        })}
        onSubmit={mutate}
      >
        <Form>

          {isError
            ? (
              <div className="alert alert-danger text-center" role="alert">
                <h5>{error.toString()}</h5>
              </div>
            )
            : <div />}

          <div className={`d-flex justify-content-center align-items-center flex-column ${formStyles.formikForm}`}>
            <h5 className="text-center mb-3">Пройдите регистрацию</h5>
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
            <div className="mb-3">
              <div id="emailHelp" className="form-text text-dark text-center">Введите название своей группы</div>
              <Field type="text" placeholder="groupe name" name="group" className="form-control" id="InputGroupeName" aria-describedby="emailHelp" />
              <ErrorMessage name="group" />
            </div>
          </div>
          <div className="text-center"><button type="submit" className="btn btn-success">Зарегистрироваться</button></div>
        </Form>
      </Formik>
    </div>
  )
}
