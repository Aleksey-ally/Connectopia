import PreloaderGif from "imgs/Preloader.gif";
import s from './Preloader.module.css';

export const Preloader = () => {
    return <div className={s.preloader}><img src={PreloaderGif} alt="Preloader" /></div>
}