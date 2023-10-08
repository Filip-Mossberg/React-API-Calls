import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Constants from '../Utilities/Constants';

export default function BookUpdate(){

    let { id } = useParams();
    const startData = Object.freeze({
        Id: id,
        Name: "",
        Author: "",
        Genre: "",
        isAvalible: false,
        Description: ""
    })

    const [formData, setFormData] = useState(startData);

    const handleChange = (b) => {
        setFormData({
            ...formData,
            [b.target.name]: b.target.value,
        })
    }

    const handleCheckboxChange = () => {
        if(formData.isAvalible){
            formData.isAvalible = false;
        } else{
            formData.isAvalible = true;
        }
    }

    const handleSubmit = (b) => {
        b.preventDefault();

        const postToUpdate = {
            Id: formData.Id,
            Title: formData.Title, 
            Author: formData.Author,
            Genre: formData.Genre,
            isAvalible: formData.isAvalible,
            Description: formData.Description
        };

        fetch(Constants.API_URL_UPDATE_BOOK, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToUpdate)
        }).then(response => response.json())
        .then(responseFromServer => {
            console.log(responseFromServer)
            if(responseFromServer.isSuccess) alert("Successfully Updated Book")
            else{
        alert(responseFromServer.errorMessages.map(element => `${element}`).join('\n'))
        }
        }).catch((error) => {
            alert(error)
        });
    }

    return(
        <form className="container mt-5">
            <h2><b>Update Book</b></h2>
            <br />
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Title</label>
                <input value={formData.Title} type="text" onChange={handleChange} className="form-control" name="Title" id="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input value={formData.Author} name="Author" type="text" onChange={handleChange} className="form-control" id="author"/>
            </div>
            <div className="mb-3">
                <label htmlFor="genre" className="form-label">Genre</label>
                <input value={formData.Genre} name="Genre" onChange={handleChange} type="text" className="form-control" id="genre"/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input value={formData.Description} name="Description" onChange={handleChange} type="text" className="form-control" id="description"/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="isAvalible" />
                <label value={formData.isAvalible} name="isAvalible" onClick={handleCheckboxChange} className="form-check-label" htmlFor="isAvalible">Is Avalible</label>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-success">Update</button>
            <Link to="/Books" className="btn btn-primary mx-3">Back</Link>
        </form>
    );
}