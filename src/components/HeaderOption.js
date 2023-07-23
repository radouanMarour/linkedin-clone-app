import React from 'react'
import './HeaderOption.css';
import { Link } from 'react-router-dom';

function HeaderOption({ Icon, title, active, color, url, callback }) {
    if (url) {
        return (
            <Link className={`header__option ${active && 'active'}`} to={url}>
                <Icon style={{ color: color }} />
                <p>{title}</p>
            </Link>
        )
    }

    return (
        <div className={`header__option ${active && 'active'}`} onClick={callback}>
            <Icon style={{ color: color }} />
            <p>{title}</p>
        </div>
    )
}

export default HeaderOption