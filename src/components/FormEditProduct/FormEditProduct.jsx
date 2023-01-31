/* eslint-disable no-underscore-dangle */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { CART_INFO } from '../DetailCardPage/DetailCardPage'
import { api } from '../helpers/Api'
import formStyles from './modal.module.css'

export function FormEditProduct({ closeModal, card }) {
  const REQUIRED_ERROR_MESSAGE_PRODUCT = 'Пожалуйста заполните обязательное поле'

  const cardId = card._id

  const queryClient = useQueryClient()

  const addMyProduct = (values) => {
    api.editMyProduct(cardId, values)
    closeModal()
  }

  const { mutate } = useMutation({
    mutationFn: addMyProduct,
    onSuccess: () => queryClient.invalidateQueries([CART_INFO]),
  })

  return (
    <Formik
      initialValues={{
        pictures: card.pictures,
        name: card.name,
        price: card.price,
        discount: card.discount,
        stock: card.stock,
        wight: card.wight,
        description: card.description,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Укажите минимум два символа')
          .max(100, 'Не более 100 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        price: Yup.number()
          .min(2, 'Не менее 20 символов')
          .max(5, 'Не более 5 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        wight: Yup.string()
          .min(1, 'Укажите минимум один символ')
          .max(20, 'Не более 20 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        discount: Yup.number(),
        stock: Yup.number(),
        description: Yup.string()
          .min(2, 'Не менее 2 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
      })}
      onSubmit={mutate}
    >
      <Form className={`d-flex flex-column align-items-center ${formStyles.modalForm}`}>
        <h5 className="text-center mb-3">Редактирование товара</h5>

        <div className="mb-2">
          <div id="picturesHelp" className="form-text text-dark text-center">Изображение</div>
          <Field as="textarea" type="text" placeholder="ссылка на картинку" name="pictures" className="form-control" id="InputPictures" aria-describedby="picturesHelp" />
        </div>

        <div className="mb-2">
          <div id="nameHelp" className="form-text text-dark text-center">Название товара</div>
          <Field type="text" placeholder="Наименование товара" name="name" className="form-control" id="InputName" aria-describedby="nameHelp" />
          <ErrorMessage name="name" />
        </div>

        <div className="mb-2">
          <div id="priceHelp" className="form-text text-dark text-center">Стоимость товара</div>
          <Field type="text" placeholder="стоимость" name="price" className="form-control" id="InputPrice" aria-describedby="priceHelp" />
          <ErrorMessage name="price" />
        </div>

        <div className="mb-2">
          <div id="discountHelp" className="form-text text-dark text-center">Скидка в %</div>
          <Field type="text" placeholder="скидка в %" name="discount" className="form-control" id="InputDiscount" aria-describedby="discountHelp" />
        </div>

        <div className="mb-2">
          <div id="stockHelp" className="form-text text-dark text-center">Количество товара на складе</div>
          <Field type="text" placeholder="количество товара" name="stock" className="form-control" id="InputStock" aria-describedby="stockHelp" />
        </div>

        <div className="mb-2">
          <div id="wightHelp" className="form-text text-dark text-center">Вес товара за 1 шт</div>
          <Field type="text" placeholder="вес" name="wight" className="form-control" id="InputWight" aria-describedby="wightHelp" />
        </div>

        <div className="mb-2">
          <div id="descriptionHelp" className="form-text text-dark text-center">Описание</div>
          <Field as="textarea" type="text" placeholder="описание" name="description" className="form-control" id="InputDescription" aria-describedby="descriptionHelp" />
          <ErrorMessage name="description" />
        </div>

        <div className="text-center"><button type="submit" className="btn btn-success">Принять изменения</button></div>
      </Form>
    </Formik>
  )
}
