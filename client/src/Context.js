// // //Reference/adpatations from treehouse authentication project
// // //This will set up provider and consumer


import React, {useState} from 'react';
import Cookies from 'js-cookie';


export const Context = React.createContext();

const api = (path, method, body = null, requireAuth = false, credentials = null) => {
    const url = 'http://localhost:5000/api' + path;

    const authOptions = {
        method, 
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    };
    
    if (body !== null) {
        authOptions.body = JSON.stringify(body);
    }
    
    if (requireAuth) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        authOptions.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    
    return fetch(url, authOptions);
    };

export function Provider(props) {
    
    //declaring state
    const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.get('authenticatedUser') ? JSON.parse(Cookies.get('authenticatedUser')) : null); //TH Workshop
    const [authenticatedPassword, setAuthenticatedPassword] = useState(Cookies.get('password') ? JSON.parse(Cookies.get('authenticatedPassword')) : null);
 

    const value = {
        authenticatedUser,
        authenticatedPassword,
        actions: {
            getUser: getUser,
            createUser: createUser,
            signIn: signIn,
            signOut: signOut,

        },
    };
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )

    //get user from API
    async function getUser(emailAddress, password) {
        const res = await api(`/users`, 'GET', null, true, {emailAddress, password});
        if (res.status === 200) {
            return res.json()
                .then(data => data);
        }
        else if (res.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    //create user in API
    async function createUser(user) {
        const res = await api('/users', 'POST', user);
        if (res.status === 201) {
            return [];
        }
        else if (res.status === 400) {
            return res.json()
                .then(data => {
                     return data.errors;
                });
        }
        else {
            throw new Error();
        }
    }

    // Signin and authenticate user from API
    async function signIn (emailAddress, password) {
        const user = await getUser(emailAddress, password);
        if(user !== null) {
            setAuthenticatedUser(user);
            setAuthenticatedPassword(password);
            Cookies.set('authenticatedUser', JSON.stringify(user));
            Cookies.set('password', JSON.stringify(password)); //leaving out expires param so default removes cookie when browser closes
        };
        return user;
    };

    // Signout user
    async function signOut() {
        setAuthenticatedUser(null);
        setAuthenticatedPassword(null);
        Cookies.remove('authenticatedUser');
        Cookies.remove('password');
    };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component) {
    return function ContextComponet(props) {
        return(
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}
