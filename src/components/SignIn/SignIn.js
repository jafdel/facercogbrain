import React, { useState } from 'react';

const SignIn = ({ onRouteChange, loadUser }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onEmailChange = event => {
        setEmail(event.target.value);
    };
    const onPasswordChange = event => {
        setPassword(event.target.value);
    };    
    const onSignInSubmit = () => {       
        fetch('https://facerecogbrain-express.onrender.com/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, max-age=0'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json()).then(user => {
            if (user.id) {
                loadUser(user);
                onRouteChange('home');
            }
        });
    };

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3-ns center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <h1 className="f3 fw6 ph0 mh0">Sign In</h1>
                    <div className="mt3">   
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={onSignInSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register', null)} className="pointer f6 link dim black db">Register</p>
                    </div>
                </form>
            </main>
        </article>
    );
};

export default SignIn;