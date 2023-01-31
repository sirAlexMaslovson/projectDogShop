import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../../redux/slices/myUserSlice/myUserSlice'
import { api } from '../helpers/Api'
import { USER_INFO } from '../UserInfo/UserInfo'
import formStyles from './modal.module.css'

export function FormRedMyAvatar({ closeModal }) {
  const queryClient = useQueryClient()

  const [srcInput, setSrcInput] = useState('https://react-learning.ru/image-compressed/default-image.jpg')

  const dispatch = useDispatch()

  const changeInputHandler = (e) => {
    setSrcInput(e.target.value)
  }

  const editAvatar = () => {
    api.editUserAvatar(srcInput).then((userObj) => dispatch(addUserInfo(userObj)))
    closeModal()
  }

  const { mutate } = useMutation({
    mutationFn: editAvatar,
    onSuccess: () => queryClient.invalidateQueries([USER_INFO]),
  })

  return (
    <div className={`d-flex flex-column align-items-center ${formStyles.modalForm}`}>
      <h5 className="text-center mb-3">Редактировать изображение</h5>

      <div className="mb-2">
        <div id="nameHelp" className="form-text text-dark text-center">Имя пользователя</div>
        <textarea type="text" value={srcInput} onChange={changeInputHandler} placeholder="ссылка на изображение" name="avatar" className="form-control" id="InputName" aria-describedby="nameHelp" />
      </div>

      <div className="text-center"><button type="button" onClick={mutate} className="btn btn-success">Изменить аватар</button></div>

    </div>
  )
}
