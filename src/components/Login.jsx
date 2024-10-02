import Form from "./Form"

const Login = () => {
    return(
        <>
            <h1>Login</h1>
            <Form route="api/user/token/" method="login" />
        </>
    )
}

export default Login