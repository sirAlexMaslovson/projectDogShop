/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import modalStyles from './modal.module.css'

function ModalContent({ closeHandler, children }) {
  useEffect(() => {
    const listenerHandler = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }
    document.addEventListener('keydown', listenerHandler)
    return () => {
      document.removeEventListener('keydown', listenerHandler)
    }
  }, [closeHandler])

  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  if (children.type.name === 'FormAddProduct') {
    return (
      <div className={`${modalStyles.modalRegOpenWindow} text-end`}>
        <button onClick={clickHandler} type="submit" className="btn btn-danger">X</button>
        {children}
      </div>
    )
  } if (children.type.name === 'FormRedMyUser' || children.type.name === 'FormRedMyAvatar') {
    return (
      <div className={`${modalStyles.modalAutOpenWindow} text-end`}>
        <button onClick={clickHandler} type="submit" className="btn btn-danger">X</button>
        {children}
      </div>
    )
  } if (children.type.name === 'FormEditProduct') {
    return (
      <div className={`${modalStyles.modalEditProduct} text-end`}>
        <button onClick={clickHandler} type="submit" className="btn btn-danger">X</button>
        {children}
      </div>
    )
  }
}

export function Modal({ closeHandler, isOpen, children }) {
  if (!isOpen) return null

  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onClick={clickHandler} className={modalStyles.modalOpen}>
      <ModalContent closeHandler={closeHandler}>
        { children }
      </ModalContent>
    </div>,
    document.getElementById('modal-root'),
  )
}
