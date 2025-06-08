import React, {useState} from "react"
import Burger from "../utils/minicomponents/Burger"
import SlideOut from "../utils/minicomponents/SlideOut";
import { Link } from "react-router-dom";
import './ui/MenuOption.css'
function MenuOption() {
    const [open, setOpen] = useState(false);
    return(
        <div className="burgernav-cont">
            <span><Link to='/'>noodly</Link></span>

            <Burger
            isOpen={open}
            onClick={() => setOpen(prev => !prev)} />
            <SlideOut isOpen={open} onClose={() => setOpen(false)} />
        </div>
    )
}

export default MenuOption