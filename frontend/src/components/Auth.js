import { GoogleLogin } from 'react-google-login'
import actions from '../api'

console.log(process.env)

const Auth = (props) => {
    const onResponse = (response) => {
        console.log(response)
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