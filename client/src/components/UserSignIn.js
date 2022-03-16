import React, { useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function UserSignIn() {
    //state
    const [emailAddress, setEmailAddress] = useState ('');
    const [password, setPassword] =useState ('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = () => {
        setErrors([]);
        const data = {
            emailAddress: emailAddress,
            password: password
        }
        axios.get(`http://localhost:5000/api/users`)
            .then(res => {
                setEmailAddress(res.data);
                setPassword(res.data);
            })
            .catch(err => {
                setErrors(true)
            });
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
                        <button className="button" type="submit" onSubmit={handleSubmit}>Sign In</button><button className="button button-secondary" to="/">Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                    
                </div>
            </main>
            </div>
        );
}

// import axios from 'axios';
// import React, {useRef, useState, useEffect, useContext} from 'react';
// import AuthContext from '../Context';
// import {Link} from 'react-router-dom';
// import config from '../config';

// export default function UserSignIn() {
//     const { setAuth } = useContext(AuthContext);
//     const userRef = useRef();
//     const errRef = useRef();

//     const [emailAddress, setEmailAddress] = useState ('');
//     const [password, setPassword] =useState ('');
//     const [errors, setErrors] = useState('');

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrors('');
//     }, [emailAddress, password])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {

//             setEmailAddress('');
//             setPassword('');
//         } catch (err) {

//         }
//         axios.get('http://localhost:5000/api/users/signin')
//     }

//     return (
//         <div>
//             <main>
//             <div className="form--centered">
//                 <h2>Sign In</h2>
                
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="emailAddress">Email Address</label>
//                     <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} ref={userRef} onChange={(e) => setEmailAddress(e.target.value)} required/>
//                     <label htmlFor="password">Password</label>
//                     <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
//                     <button className="button" type="submit" onSubmit={handleSubmit}>Sign In</button><button className="button button-secondary" to="/">Cancel</button>
//                 </form>
//                 <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
//             </div>
//         </main>
//         </div>
//     )
// }

//referenced from Treehouse authentication workshop
//

// export default class UserSignIn extends Component {
//     state = {
//         emailAddress: '',
//         password: '',
//         errors: [],
//     }

//     render() {
//         const {
//             emailAddress, 
//             password, 
//             errors,
//         } = this.state;

//         return(
//             <main>
//                 <div className="form--centered">
//                     <h2>Sign In</h2>
//                     <Form 
//                         cancel={this.cancel}
//                         errors={errors}
//                         submit={this.submit}
//                         submitButtonText="Sign In"
//                         elements={() => (
//                             <React.Fragment>
//                                 <label for="emailAddress">Email Address</label>
//                                 <input 
//                                 id="emailAddress"
//                                 name="emailAddress"
//                                 type="email"
//                                 value={emailAddress}
//                                 onChange={this.change}/>
//                                 <label for="password">Password</label>
//                                 <input 
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 value={password}
//                                 onChange={this.change} />
//                             </React.Fragment>
//                         )} />
//                     <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
//                 </div>
//             </main>
//         );
//     }

//     change = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;

//         this.setState(() => {
//             return {
//                 [name]: value
//             };
//         });
//     }

//     submit = () => {

//         const {context}=this.props;
//         const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
//         const {emailAddress, password} = this.state;
//         context.actions.signIn(emailAddress, password)
//         .then(user=>{
//           if(user===null){
//             this.setState(()=>{
//               return{errors:['Sign-in was unsuccessful']};
//             })
//           }
//           else {
//             this.props.history.push(from);
    
//           }
//         } )
//         .catch(err=>{
//           this.props.history.push('/error');
//         })
    
//       }
    
//       cancel = () => {
//         this.props.history.push('/');
//       }
//     }
