// import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

// export default function UserSignIn() {
//     const [emailAddress, getEmail] = useState (''),
//     const [password, getPassword] =useState('')

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/courses')
//             then.(res => {getEmail(res.json)
//                           getPassword(res.json)
//         })
//     })

        

// }

//referenced from Treehouse authentication workshop
//

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            emailAddress, 
            password, 
            errors,
        } = this.state;

        return(
            <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                <label for="emailAddress">Email Address</label>
                                <input 
                                id="emailAddress"
                                name="emailAddress"
                                type="email"
                                value={emailAddress}
                                onChange={this.change}/>
                                <label for="password">Password</label>
                                <input 
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.change} />
                            </React.Fragment>
                        )} />
                    <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                </div>
            </main>
        );
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {

        const {context}=this.props;
        const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
        const {emailAddress, password} = this.state;
        context.actions.signIn(emailAddress, password)
        .then(user=>{
          if(user===null){
            this.setState(()=>{
              return{errors:['Sign-in was unsuccessful']};
            })
          }
          else {
            this.props.history.push(from);
    
          }
        } )
        .catch(err=>{
          this.props.history.push('/error');
        })
    
      }
    
      cancel = () => {
        this.props.history.push('/');
      }
    }
