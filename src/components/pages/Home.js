import React, { useState } from 'react';

import Login from './Login';
import Registration from './Registration';

function Home() {
    const [login, setLogin] = React.useState(true);

    const toggleRegistration = () => {
        setLogin(!login);
    }

    return (
        <div>
            <h1>Łóżko dla chorego v0.1</h1>
            {login ? <Login /> : <Registration />}
            <button onClick={toggleRegistration}>
                {login ? "Rejestracja" : "Logowanie"}
            </button>
        </div>
    )
}

export default Home;