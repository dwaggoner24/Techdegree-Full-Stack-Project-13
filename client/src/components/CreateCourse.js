import React, { useState, useContext, useEffect } from 'react'; 
import {useNavigate} from 'react-router-dom';
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
        setErrors([]);
        const userId = context.authenticatedUser.id;
        const authCred = btoa(`${context.authenticatedUser.emailAddress}:${context.authenticatedPassword}`);
        const res = await fetch(`http://localhost:5000/api/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${authCred}`
            },
            body: JSON.stringify({
                title,
                description, 
                estimatedTime, 
                materialsNeeded,
                userId}),
        });
        
        if(res.status === 201) {
            if (res.status === 201) {
                history('/'); //directs to home page when course is created to show new course
            }
            else if (res.status === 400) {
                res.json()
                    .then(data => {
                        return data.errors;
                    });
            }
            else {
                throw new Error();
            }
        }
    }

    //directs to home page when cancel is clicked
    const handleCancel = (e) => {
        e.preventDefault();
        history('/');
    }

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

                            <p>By {context?.authenticatedUser ? `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}` : ''}</p>

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
                    <button className="button" onClick={handleSubmit}>Create Course</button><a className="button button-secondary" onClick={handleCancel}>Cancel</a>
                </form>
            </div>
        </main>
    )
}  