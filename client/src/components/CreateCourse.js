import axios from 'axios';
import React, { useState, useContext } from 'react'; 
import {Link} from 'react-router-dom';
import {Context} from '../Context';



export default function CreateCoures() {

    const context = useContext(Context);
    
    //creating state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState(false);
    const [data, setData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(false);
        const data = {
            title: title,
            description: description,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
            userId: context.authenticatedUser.id 
        }
        axios.post('http://localhost:5000/api/courses', data)
            .then(res => {setData(res.data);
                          setTitle('');
                          setDescription('')
                          setEstimatedTime('')
                          setMaterialsNeeded('')
                        })
            .catch(err => {
                setErrors(true);
            });
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

                            <p>By Joe Smith</p>

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
                    <button className="button" onClick="submit">Create Course</button><Link className="button button-secondary" to="/">Cancel</Link>
                </form>
            </div>
        </main>
    )
}
    