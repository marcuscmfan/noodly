import './ui/Burger.css'
export default function Burger({isOpen, onClick}) {
    return(
        <button
        className={`burger ${isOpen ? 'open' : ''}`}
        onClick={onClick}
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
            <span />
            <span />
            <span />
        </button>
    )
}