import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';


export default function CourseDetail() {
    //calling state
    
    let {id} = useParams() //accessing id in router link 
    const [courses, setCourse] = useState('');
    const [courseUser, setUser] = useState('');

    //obtains the course info from the API 
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {setCourse(res.data);
                         setUser(res.data.User);
                         })
            .catch(err => console.log('Oh no! Something went wrong fetching data', err))
        }, [id])

    const deleteCourse = (id) => { //StackOverflow assistance
        let url = `http://localhost:5000/api/courses/${id}`

        axios.delete(url)
            .then(res => {
                const deleteCourse = courses.filter(course => id !== course.id)
                setCourse(deleteCourse)
                console.log('res', res)
            })
            .catch(err => {console.log('Oh no! Something went wrong when deleting data', err);
        })
    }
    
    return (
        
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${courses.id}/update`}>Update Course</Link>
                    <Link className="button" to ={'/'} onClick={deleteCourse} >Delete Course</Link>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courses.title}</h4>
                            <p>By {courseUser.firstName} {courseUser.lastName}</p> 

                            <p>{courses.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courses.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>{courses.materialsNeeded}</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );

};
