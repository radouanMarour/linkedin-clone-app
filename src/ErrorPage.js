import React from 'react'

function ErrorPage() {
    const style = {
        width: "90vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    return (
        <div style={style}>
            <h1>Sorry this page does not exist 😕</h1>
        </div>
    )
}

export default ErrorPage