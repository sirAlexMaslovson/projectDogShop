import { Field, Form, Formik } from 'formik'
import formStyles from './modal.module.css'

/*
{
  "available": true, // boolean
  "pictures": "https://react-learning.ru/image-compressed/2.jpg", // string
  "name": "Куриные желудочки для собак", // string, обязательное
  "price": 450, // number, обязательное
  "discount": 10, // number
  "stock": 10, // number
  "wight": "100 г", // string
  "description": "Описание demo", // string, обязательное
}
*/

export function FormAddProduct({ closeModal }) {
  return (
    <Formik
      initialValues={{
        pictures: '',
        name: '',
        price: '',
        discount: '',
        stock: '',
        wight: '',
        description: '',
      }}
      onSubmit={closeModal}
    >
      <Form className={`d-flex flex-column align-items-center ${formStyles.modalForm}`}>
        <h5 className="text-center mb-3">Добавление товара в магазин</h5>

        <div className="mb-2">
          <div id="picturesHelp" className="form-text text-dark text-center">Изображение</div>
          <Field as="textarea" type="text" placeholder="ссылка на картинку" name="pictures" className="form-control" id="InputPictures" aria-describedby="picturesHelp" />
        </div>

        <div className="mb-2">
          <div id="nameHelp" className="form-text text-dark text-center">Название товара</div>
          <Field type="text" placeholder="Наименование товара" name="name" className="form-control" id="InputName" aria-describedby="nameHelp" />
        </div>

        <div className="mb-2">
          <div id="priceHelp" className="form-text text-dark text-center">Стоимость товара</div>
          <Field type="text" placeholder="стоимость" name="price" className="form-control" id="InputPrice" aria-describedby="priceHelp" />
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
        </div>

        <div className="text-center"><button type="submit" className="btn btn-success">Добавить товар</button></div>
      </Form>
    </Formik>
  )
}
