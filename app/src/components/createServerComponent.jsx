import "./../css/serverListComponent.css";

export const CreateServerWindow = ({isWindowOpen, setServerWindow}) => {
    return (
        <>
            {isWindowOpen ?
            <div className="create-server">
                <div className="create-server-header">
                    <div></div>
                    <h3>Stwórz Swój Server</h3>
                    <button onClick={() => setServerWindow(false)} className="close-server-window">x</button>
                </div>
                <form action="#">
                    <table>
                        <tr>
                            <td>
                                <label htmlFor="server-img">Ustaw zdjęcie servera</label>
                            </td>
                            <td>
                                <input type="file" name="server-img" id="server-img" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="server-name">Nazwa Server</label>
                            </td>
                            <td>
                                <input type="text" name="server-name" id="server-name" />
                            </td>
                        </tr>
                    </table>
                    <button className="add-server">Stwórz</button>
                </form>
            </div> : null}
        </>
    )
}