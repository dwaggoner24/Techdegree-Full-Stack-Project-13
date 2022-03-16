import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Context} from '../Context';

export default function UserSignUp() {

    const context = useContext(Context);
    //declaring state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        // const data = {
        //     firstName: firstName,
        //     lastName: lastName,
        //     emailAddress: emailAddress,
        //     password: password
        // }
        context.actions.createUser(firstName, lastName, emailAddress, password);
        // axios.post(`http://localhost:5000/api/users`, data)
        //     .then(res => {
        //         setData(res.data);
        //         setFirstName('');
        //         setLastName('');
        //         setEmailAddress('');
        //         setPassword('');
        //     })
        //     .catch(err => {
        //         setErrors(true)
        //     });
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

// export default class UserSignUp extends Component {
//     state = {
//         firstName: '', 
//         lastName: '',
//         emailAddres: '', 
//         password: '', 
//         errors: [],
//     }

//     render() {
//         const {
//             firstName, 
//             lastName, 
//             emailAddress, 
//             password,
//             errors, 
//         } = this.state;

//         return (
//             <div className="form--centered">
//                 <h2>Sign Up</h2>
//                 <Form 
//                 cancel={this.cancel}
//                 errors={errors}
//                 submit={this.submit}
//                 submitButtonText="Sign Up"
//                 elements={() => (
//                     <React.Fragment>
//                         <label for="firstName">First Name</label>
//                         <input 
//                         id="firstName"
//                         name="firstName"
//                         type="text"
//                         value={firstName}
//                         onChange={this.change}/>
//                         <label for="lastName">Last Name</label>
//                         <input
//                         id="lastName"
//                         name="lastName"
//                         type="text"
//                         value={lastName}
//                         onChange={this.change}/>
//                         <label for="emailAddress">Email Address</label>
//                         <input
//                         id="emailAddress"
//                         name="emailAddress"
//                         type="email"
//                         value={emailAddress}
//                         onChange={this.change}/>
//                         <label for="password">Password</label>
//                         <input
//                         id="password"
//                         name="password"
//                         type="password"
//                         value={password}
//                         onChange={this.change}/>
//                     </React.Fragment>
//                 )}/>
//                 <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
//             </div> 
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
//         const {context} = this.props;

//         const {
//             firstName, 
//             lastName,
//             emailAddress,
//             password
//         } = this.state;

//         //new user
//         const user = {
//             firstName, 
//             lastName,
//             emailAddress,
//             password,
//         };

//         context.data.createUser(user)
//             .then(errors => {
//                 if(errors.lenth) {
//                     this.setState({errors});
//                 } else {
//                     context.actions.signIn(emailAddress, password)
//                         .then(() => {
//                             this.props.history.push('/');
//                         });
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 this.props.history.push('/error')
//             });
//     };

//     cancel = () => {
//         this.props.history.push('/');
//     }
// }

