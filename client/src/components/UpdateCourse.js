import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Context} from '../Context';

export default function UpdateCourse() { //external resource
    
    const context = useContext(Context);

    let {id} = useParams()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(false);
    const [data, setData] = useState(null);

    const updateCourse = (e) => {
        setErrors(false);
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
            userId: context.authenticatedUser.id
        }
        axios.put(`http://localhost:5000/api/courses/${id}`, data)
            .then(res => {setData(res.data);})
            .catch(err => {console.log('Oh no! Something went wrong fetching data', err);
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`, data)
            .then(res => {setData(res.data);
                          setTitle('');
                          setDescription('');
                          setEstimatedTime('');
                          setMaterialsNeeded('');
                          setLoading(false);})
            .catch(err => {
                setLoading(false);
                setErrors(true);
            });
    }, []);

    return(
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}>{materialsNeeded}</textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={updateCourse}>Update Course</button><Link className="button button-secondary" onClick="submit" to="/">Cancel</Link>
                </form>
            </div>
        </main>
    )
}


