// // //Reference/adpatations from treehouse authentication project
// // //This will set up provider and consumer


import React, {useState} from 'react';


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
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    const value = {
        authenticatedUser,
        actions: {
            getUser: getUser,
            createUser: createUser,
            signIn: signIn,
            signOut: signOut
        },
    };

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
        };
        return user;
    };

    // Signout user
    async function signOut() {
        setAuthenticatedUser(null);
    };

    return (
        <Context.Provider value={value}>
            {props.children}    
        </Context.Provider>
    );
}

export const Consumer = Context.Consumer;




