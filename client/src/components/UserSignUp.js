import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../Context';

export default function UserSignUp() {

    const context = useContext(Context);
    
    //declaring state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
       
        context.actions.createUser({firstName, lastName, emailAddress, password});
    }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button><button className="button button-secondary" to="/">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
}