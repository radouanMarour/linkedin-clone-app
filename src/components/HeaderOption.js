import React from 'react'
import './HeaderOption.css';

function HeaderOption({ Icon, title, active, color, url, callback }) {
    if (url) {
        return (
            <a className={`header__option ${active && 'active'}`} href={url}>
                <Icon style={{ color: color }} />
                <p>{title}</p>
            </a>
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