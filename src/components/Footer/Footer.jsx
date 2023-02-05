import {
  SlSocialVkontakte, SlSocialTwitter, SlSocialFacebook, SlSocialLinkedin, SlSocialYoutube,
} from 'react-icons/sl'
import formStyles from './styles.module.css'
import companyLogo from './pngwing.com.png'

export function Footer() {
  return (
    <footer className={`page-footer font-small blue pt-4 ${formStyles.footer}`}>

      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-3 mt-md-0 mt-3">
            <h5 className="text-uppercase">Интернет-магазин DOG FOOD</h5>
            <img src={companyLogo} style={{ width: '15%' }} alt="logo" />
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-2 mb-md-0 mb-3">
            <ul className="list-unstyled">
              <li className="text-start"><a className="text-dark" href="#!">Оплата и доставка</a></li>
              <li className="text-start"><a className="text-dark" href="#!">Новости</a></li>
              <li className="text-start"><a className="text-dark" href="#!">Отзывы</a></li>
              <li className="text-start"><a className="text-dark" href="#!">Акции</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-md-0 mb-3">
            <ul className="list-unstyled">
              <li className="text-start"><a className="text-dark" href="#!">Часто спрашивают</a></li>
              <li className="text-start"><a className="text-dark" href="#!">Каталог</a></li>
              <li className="text-start"><a className="text-dark" href="#!">Обратная связь</a></li>
              <li className="text-start"><a className="text-dark" href="#!">Контакты</a></li>
            </ul>
          </div>

          <div className="col-md-3 mt-md-0 mt-3">
            <h5 className="text-uppercase">Мы на связи</h5>
            <h5 className="text-uppercase">8-999-999-99-99</h5>
            <div className="d-flex justify-content-around">
              <b className="fs-4"><SlSocialVkontakte /></b>
              <b className="fs-4"><SlSocialTwitter /></b>
              <b className="fs-4"><SlSocialFacebook /></b>
              <b className="fs-4"><SlSocialLinkedin /></b>
              <b className="fs-4"><SlSocialYoutube /></b>
            </div>
          </div>

        </div>
      </div>

    </footer>
  )
}
