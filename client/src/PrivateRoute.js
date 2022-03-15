import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import {Consumer} from './Context';

export default ({component: Component, ...rest}) => {
    return (
        <Consumer>
            {context => (
                <Route 
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props}/>
                        ) : (
                            <NavLink to={{
                                pathname: '/signin',
                                state: {from: props.location},
                            }} />
                        )
                    }
                />
            )}
        </Consumer>
    );
};