import formStyles from './styles.module.css'

export function Footer() {
  return (
    <footer className={`page-footer font-small ${formStyles.footer}`}>

      <div className="footer-copyright text-center py-3">
        © 2020 Copyright
      </div>

    </footer>
  )
}
