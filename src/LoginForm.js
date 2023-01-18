import React from 'react';

function LoginForm(){
    return (
        <form>
            <div className="form-inner">
                <h2>Login</h2>
                <div className="form-group"></div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name"></input>
            </div>
            <div className="form-group">
            <label htmlFor="name">Phone:</label>
                <input type="number" name="phone" id="phone"></input>
                </div>
        </form>
    )
}

export default LoginForm;