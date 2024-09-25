import React, { useState, useRef } from "react"
import { useSelector } from "react-redux"
import "./../css/header.css"


export function Header() {
    const user = useSelector(state => state.loginUsersReducer)

    const handleLogoutButton = () => {
        console.log("logout")
    }
    
    return (
        <>
            <header className="header">
                <div className="content">
                    <article>
                        <div className="info">
                            <p>{user.user.login}</p>
                        </div>
                    </article>
                    <article className="dropdown">
                            <button className="logout" onClick={handleLogoutButton}>Wyloguj</button>
                    </article>
                </div>
            </header>
        </>
    )
}