import React from 'react'
import Form from './Form'

const Register = () => {
  return (
    <>
        <h1>Register</h1>
        <Form route="api/user/register/" method="register" />
    </>
  )
}

export default Register