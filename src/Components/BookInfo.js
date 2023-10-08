import { Link, useParams } from 'react-router-dom';
import Constants from '../Utilities/Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import bookURL from '../media/Book.jpeg';
import '../TabsStyle/Info.css';

export default function Info(){

    const [book, setBook] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        
        fetch(`${Constants.API_URL_GET_BOOK_BY_ID}/${id}`, {
            method: "GET"
        }).then(response => response.json())
        .then(responseFromServer => {
            setBook(responseFromServer.result)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    console.log(book)

    return (
<div className="container mt-5">
    <div className="card mx-auto border-0">
        <img className="card-img-top mx-auto" src={bookURL} alt="Book image" />
        <div className="card-body text-center">
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <Link to="/Books" className="btn btn-primary">Back</Link>
        </div>
    </div>
</div>
    )
}