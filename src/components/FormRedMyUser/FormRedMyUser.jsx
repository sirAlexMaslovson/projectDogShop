import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { addUserInfo } from '../../redux/slices/myUserSlice/myUserSlice'
import { api } from '../helpers/Api'
import formStyles from './modal.module.css'
import { USER_INFO } from '../UserInfo/UserInfo'

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
      onSubmit={mutate}
    >
      <Form className={`d-flex flex-column align-items-center ${formStyles.modalForm}`}>
        <h5 className="text-center mb-3">Редактировать профиль</h5>

        <div className="mb-2">
          <div id="nameHelp" className="form-text text-dark text-center">Имя пользователя</div>
          <Field type="text" placeholder="имя" name="name" className="form-control" id="InputName" aria-describedby="nameHelp" />
        </div>

        <div className="mb-2">
          <div id="aboutHelp" className="form-text text-dark text-center">Обо мне</div>
          <Field type="text" placeholder="обо мне" name="about" className="form-control" id="InputAbout" aria-describedby="aboutHelp" />
        </div>

        <div className="text-center"><button type="submit" className="btn btn-success">Принять изменения</button></div>
      </Form>
    </Formik>
  )
}
