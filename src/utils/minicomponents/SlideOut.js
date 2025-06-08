import './ui/SlideOut.css'
import { Link } from 'react-router-dom'
export default function SlideOut({isOpen, onClose}) {

    const handleContainerTap = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    return(
        <div className={`slide-container ${isOpen ? 'open' : ''}`} onClick={handleContainerTap}>
            <ul className="slide-list">
                <li><Link className="slide-link" to='/about' onClick={onClose}>about</Link></li>
                <li><Link className="slide-link" to='/' onClick={onClose}>home</Link></li>
                <li><Link className="slide-link" to='/explore' onClick={onClose}>explore</Link></li>
                <li><button className='slide-button' onClick={onClose}>x</button></li>
            </ul>
        </div>
    )
}