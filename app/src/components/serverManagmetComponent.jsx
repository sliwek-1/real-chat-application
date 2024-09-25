import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { CreateServerWindow } from "./createServerComponent";
import "./../css/serverListComponent.css";

export const ServerComponent = () => {
    const [serverWindow, setServerWindow] = useState(false);
    return (
        <>
            <aside className="serverElement">
                <header className="server-header">
                    <button className="add-server" title="Utwórz server" onClick={() => setServerWindow(true)}>
                        +
                    </button>

                    <button className="add-server" title="Prywatne Wiadomość">
                        <FontAwesomeIcon  icon={faEnvelope}/>
                    </button>
                </header>
                <section className="servers-list">

                </section>
                <CreateServerWindow isWindowOpen={serverWindow} setServerWindow={setServerWindow} />
            </aside>
        </>
    )
}