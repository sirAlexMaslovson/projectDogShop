import { useMutation } from '@tanstack/react-query'
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { sortByMyProduct } from '../../redux/slices/methodSortSlice/methodSortSlice'
import { api } from '../helpers/Api'
import formStyles from './modal.module.css'

export function FormAddProduct({ closeModal }) {
  const REQUIRED_ERROR_MESSAGE_PRODUCT = 'Пожалуйста заполните обязательное поле'
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addMyProduct = (values) => {
    api.postMyProduct(values)
    dispatch(sortByMyProduct())
    navigate('/')
    closeModal()
  }

  const { mutate } = useMutation({
    mutationFn: addMyProduct,
  })

  return (
    <Formik
      initialValues={{
        pictures: 'https://react-learning.ru/image-compressed/default-image.jpg',
        name: '',
        price: '',
        discount: '',
        stock: '',
        wight: '',
        description: '',
      }}
      validationSchema={Yup.object({
        pictures: Yup.string().url()
          .min(20, 'Укажите минимум 20 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        name: Yup.string()
          .min(2, 'Укажите минимум два символа')
          .max(40, 'Не более 40 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        price: Yup.number()
          .min(2, 'Не менее 20 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        wight: Yup.string()
          .min(1, 'Укажите минимум один символ')
          .max(20, 'Не более 20 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        discount: Yup.number()
          .min(1, 'Укажите минимум один символ')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        stock: Yup.number()
          .min(1, 'Укажите минимум один символ')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
        description: Yup.string()
          .min(2, 'Не менее 20 символов')
          .required(REQUIRED_ERROR_MESSAGE_PRODUCT),
      })}
      onSubmit={mutate}
    >
      <Form className={`d-flex flex-column align-items-center ${formStyles.modalForm}`}>
        <h5 className="text-center mb-3">Добавление товара в магазин</h5>

        <div className="mb-2">
          <div id="picturesHelp" className="form-text text-dark text-center">
            Изображение
          </div>
          <Field as="textarea" type="text" placeholder="ссылка на картинку" name="pictures" className="form-control" id="InputPictures" aria-describedby="picturesHelp" />
          <ErrorMessage name="pictures" />
        </div>

        <div className="mb-2">
          <div id="nameHelp" className="form-text text-dark text-center">
            Название товара
          </div>
          <Field type="text" placeholder="Наименование товара" name="name" className="form-control" id="InputName" aria-describedby="nameHelp" />
          <ErrorMessage name="name" />
        </div>

        <div className="mb-2">
          <div id="priceHelp" className="form-text text-dark text-center">
            Стоимость товара
          </div>
          <Field type="text" placeholder="стоимость" name="price" className="form-control" id="InputPrice" aria-describedby="priceHelp" />
          <ErrorMessage name="price" />
        </div>

        <div className="mb-2">
          <div id="discountHelp" className="form-text text-dark text-center">Скидка в %</div>
          <Field type="text" placeholder="скидка в %" name="discount" className="form-control" id="InputDiscount" aria-describedby="discountHelp" />
          <ErrorMessage name="discount" />
        </div>

        <div className="mb-2">
          <div id="stockHelp" className="form-text text-dark text-center">Количество товара на складе</div>
          <Field type="text" placeholder="количество товара" name="stock" className="form-control" id="InputStock" aria-describedby="stockHelp" />
          <ErrorMessage name="stock" />
        </div>

        <div className="mb-2">
          <div id="wightHelp" className="form-text text-dark text-center">Вес товара за 1 шт</div>
          <Field type="text" placeholder="вес" name="wight" className="form-control" id="InputWight" aria-describedby="wightHelp" />
          <ErrorMessage name="wight" />
        </div>

        <div className="mb-2">
          <div id="descriptionHelp" className="form-text text-dark text-center">
            Описание
          </div>
          <Field as="textarea" type="text" placeholder="описание" name="description" className="form-control" id="InputDescription" aria-describedby="descriptionHelp" />
          <ErrorMessage name="description" />
        </div>

        <div className="text-center"><button type="submit" className="btn btn-success">Добавить товар</button></div>
      </Form>
    </Formik>
  )
}
