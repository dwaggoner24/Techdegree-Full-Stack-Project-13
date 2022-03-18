import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'; 
import {Link, useNavigate} from 'react-router-dom';
import {Context} from '../Context';

export default function CreateCourse() {

    let history = useNavigate();
    const context = useContext(Context);

    // // creating state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);




    async function handleSubmit(e) { //google resource and context reference
        e.preventDefault();
        const userId = context.authenticatedUser.id;
        const credentials = btoa(`${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`);
        const res = await fetch('http://localhost:5000/api/courses', {
            method: 'POST',
            body: JSON.stringify({title,
                                description, 
                                estimatedTime, 
                                materialsNeeded, 
                                userId}),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${credentials}`
            },
        });
        if(res.status === 201) {
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
    }
    const handleCancel = (e) => {
        e.preventDefault();
        history('/');
    }

    // const context = useContext(Context);
    
    // //creating state
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [estimatedTime, setEstimatedTime] = useState('');
    // const [materialsNeeded, setMaterialsNeeded] = useState('');
    // const [errors, setErrors] = useState(false);
    // const [data, setData] = useState(null);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setErrors(false);
    //     const data = {
    //         title: title,
    //         description: description,
    //         estimatedTime: estimatedTime,
    //         materialsNeeded: materialsNeeded,
    //         userId: context.authenticatedUser.id 
    //     }
    //     axios.post('http://localhost:5000/api/courses', data)
    //         .then(res => {setData(res.data);
    //                       setTitle(res.data.title);
    //                       setDescription(res.data.title);
    //                       setEstimatedTime(res.data.title)
    //                       setMaterialsNeeded(res.data.title)
    //                     })
    //         .catch(err => {
    //             setErrors(true);
    //         });
    // }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {
                    errors.length > 0 ?
                    (<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, i) => {
                                return (
                                    <li key={i}>{error}</li>
                                )
                            })
                          }
                        </ul>
                    </div>) : null 
                }
                
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                            <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" onClick="submit">Create Course</button><Link className="button button-secondary" onClick={handleCancel}>Cancel</Link>
                </form>
            </div>
        </main>
    )
}  