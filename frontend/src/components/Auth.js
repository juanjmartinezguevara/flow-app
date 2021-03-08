import React from 'react';
import { GoogleLogin } from 'react-google-login'
import actions from '../api'
import TheContext from '../TheContext'

const Auth = (props) => {

    const { user, setUser } = React.useContext(TheContext)

    const onResponse = (response) => {
        actions
            .logIn(response)
            .then(res => {
                console.log(res)
                props.setUser(res.data)
            })
            .catch(console.error)
    }

    return (
        <div style={{ height:"50%", zIndex:'1000'}}>
            <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLEID}
            buttonText="Signup"
            onSuccess={onResponse}
            onFailure={onResponse}
            cookiePolicy={"single_host_origin"}
        />
        </div>
    );
}

export default Auth