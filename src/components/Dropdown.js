import { useState } from "react";
import './ui/Dropdown.css'
function Dropdown({items, selected, setSelected}) {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="drop-wrapper">
            <button
                className="drop-button"
                onClick={() => setIsOpen(o => !o)}
            >
                {selected || "Select..."}
            </button>

                {isOpen && (
                    <ul className="drop">
                        {items.map(item => (
                            <li
                                id='option'
                                key={item}
                                onClick={() => {
                                setSelected(item.label);
                                setIsOpen(false);
                                }}>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
    )
}

export default Dropdown