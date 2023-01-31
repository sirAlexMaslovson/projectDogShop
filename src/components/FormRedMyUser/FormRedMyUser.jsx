import {
  Field, Form, Formik, ErrorMessage,
} from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { addUserInfo } from '../../redux/slices/myUserSlice/myUserSlice'
import { api } from '../helpers/Api'
import formStyles from './modal.module.css'
import { USER_INFO } from '../UserInfo/UserInfo'

const REQUIRED_ERROR_MESSAGE_USER = 'Не верно заполнено поле'

export function FormRedMyUser({ closeModal }) {
  const queryClient = useQueryClient()

  const TOKEN = useSelector((store) => store.TOKEN)

  const myGroup = useSelector((store) => store.myUser.group)

  const myUser = useSelector((store) => store.myUser)

  const dispatch = useDispatch()

  useEffect(() => {
    api.setNewToken(TOKEN)
    api.setNewGroup(myGroup)
  }, [])

  const editUser = (values) => {
    api.editUserInfo(values)
      .then((userObj) => dispatch(addUserInfo(userObj)))
    closeModal()
  }

  const { mutate } = useMutation({
    mutationFn: editUser,
    onSuccess: () => queryClient.invalidateQueries([USER_INFO]),
  })

  return (
    <Formik
      initialValues={{
        name: myUser.name,
        about: myUser.about,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Укажите минимум два символа')
          .max(20, 'Не более 20 символов')
          .required(REQUIRED_ERROR_MESSAGE_USER),
        about: Yup.string()
          .min(2, 'Не менее 20 символов')
          .required(REQUIRED_ERROR_MESSAGE_USER),
      })}
      onSubmit={mutate}
    >
      <Form className={`d-flex flex-column align-items-center ${formStyles.modalForm}`}>
        <h5 className="text-center mb-3">Редактировать профиль</h5>

        <div className="mb-2">
          <div id="nameHelp" className="form-text text-dark text-center">Имя пользователя</div>
          <Field type="text" placeholder="имя" name="name" className="form-control" id="InputName" aria-describedby="nameHelp" />
          <ErrorMessage name="name" />
        </div>

        <div className="mb-2">
          <div id="aboutHelp" className="form-text text-dark text-center">Обо мне</div>
          <Field type="text" placeholder="обо мне" name="about" className="form-control" id="InputAbout" aria-describedby="aboutHelp" />
          <ErrorMessage name="about" />
        </div>

        <div className="text-center"><button type="submit" className="btn btn-success">Принять изменения</button></div>
      </Form>
    </Formik>
  )
}
