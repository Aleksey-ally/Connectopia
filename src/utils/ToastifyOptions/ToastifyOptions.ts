import 'react-toastify/dist/ReactToastify.min.css'
import s from './ToastifyOptions.module.scss'

export const infoOptions = {
    style: {background: 'var(--color-dark-700)'},
    progressStyle: {background: 'var(--color-info-700)'},
    className: s.infoIcon,
}

export const successOptions = {
    style: {background: 'var(--color-dark-700)'},
    progressStyle: {background: 'var(--color-success-700)'},
    className: s.successIcon,
}

export const errorOptions = {
    style: {background: 'var(--color-dark-700)'},
    progressStyle: {background: 'var(--color-danger-500)'},
    className: s.errorIcon,
}