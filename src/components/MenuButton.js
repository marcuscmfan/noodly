import PropTypes from "prop-types"
import './ui/MenuButton.css'

export default function MenuButton(
    {link='/404'}
) {
    MenuButton.propTypes = {
        link: PropTypes.string,
    }

    return(
        <button className="menu-button" onClick={() => {window.open(link, "_blank", "noopener,noreferrer")}}>
            <div className="content">
                <span>go to menu</span>
                <img src="/images/go-to-arrow.png" alt="go to arrow"></img>
            </div>
        </button>
    )
}