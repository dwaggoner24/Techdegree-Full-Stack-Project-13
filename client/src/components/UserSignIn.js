import React, { useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../Context';

export default function UserSignIn() {

    const context = useContext(Context);
    //state
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        context.actions.signIn(emailAddress, password);
    }

        return (
            <div>
                <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <button className="button" type="submit" onClick={handleSubmit}>Sign In</button><button className="button button-secondary" to="/">Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                    
                </div>
            </main>
            </div>
        );
}
