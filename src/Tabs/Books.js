import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate} from 'react-router-dom';
import Constants from '../Utilities/Constants'

export default function Books() {

    const [reload, setReaload] = useState([])
    const [load, setLoading] = useState(false);
    const [items, setDataItems] = useState([]);
    const [itemsToDelete, setItemsToDelete] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [searchType, setSearchType] = useState("Title");
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        // Put it here to prevent a green border when put int the elemets class as default color
        if(reload.length === 0) document.getElementById("Title").style.backgroundColor = "#38BB0D";

        fetch(Constants.API_URL_GET_ALL_BOOKS, {
            method: 'GET'
        }).then(response => response.json())
        .then(dataFromServer => {
            setLoading(true)
            setDataItems(dataFromServer.result)
        }).catch((error) => {
            alert(error)
            setLoading(true)
        });
    }, [reload])

    useEffect(() => {
        if(itemsToDelete.length == 0){
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [itemsToDelete])

    useEffect(() => {
        if(searchType == "Title"){
            document.getElementById("Author").style.backgroundColor = "#CDDEDE";
            document.getElementById("Genre").style.backgroundColor = "#CDDEDE";
        } else if(searchType == "Author"){
            document.getElementById("Title").style.backgroundColor = "#CDDEDE";
            document.getElementById("Genre").style.backgroundColor = "#CDDEDE";
        } else if(searchType == "Genre") {
            document.getElementById("Title").style.backgroundColor = "#CDDEDE";
            document.getElementById("Author").style.backgroundColor = "#CDDEDE";
        }
    }, [searchType])

    const selectedSearch = (type) => {
        document.getElementById(type).style.backgroundColor = "#38BB0D";
        setSearchType(type)
    }

    const selectItems = (item) => {

        let elements = document.getElementsByClassName(item.toString())

        if(elements[0].style.backgroundColor == "rgb(95, 118, 236)"){
            for(let i = 0; i < elements.length; i++){
                elements[i].style.backgroundColor = "#ffffff";
            }
            setItemsToDelete(itemsToDelete.filter(b => b !== parseInt(item)))
            itemsToDelete != [] ? document.getElementById("delete").hidden = false : document.getElementById("delete").hidden = true
        } else {
            for(let i = 0; i < elements.length; i++){
                elements[i].style.backgroundColor = "#5f76ec";
            }

            setItemsToDelete(itemsToDelete => [...itemsToDelete, item])
        }
    }

    const onDelete = (id) => {
        fetch(`${Constants.API_URL_DELETE_BOOK_BY_ID}/${id}`, {
            method: "DELETE"
        })
        .then(responseFromServer => {
            console.log(responseFromServer)
            window.location.reload(true);
        }).catch(error => {
            alert(error)
            console.log(error)
        })
    }

    const deleteSelected = (props) => {
        for(let i = 0; i < props.length; i++){
            fetch(`${Constants.API_URL_DELETE_BOOK_BY_ID}/${props[i]}`, {
                method: "DELETE"
            })
            .then(responseFromServer => {
                console.log(responseFromServer)
            }).catch(error => {
                console.log(error)
            })
        }
        window.location.reload(true);
    }

    const handleChange = (b) => {
        setSearchString({
            ...searchString,
            [b.target.name]: b.target.value,
        })
    }

    const filteredSearch = (b) => {
        b.preventDefault();

        if(searchString != ""){
            fetch(`${Constants.API_URL_GET_BOOKS_BY_SEARCH}/${searchString.search}/${searchType}`, {
                method: "GET"
            }).then(response => response.json())
            .then(responseFromServer => {
                if(responseFromServer.isSuccess == true){
                    setDataItems(responseFromServer.result)
                } else {
                    alert("No items found!")
                }
            }).catch(error => {
                setReaload([...reload, "Reaload"])
            })
        }
        else {
            setReaload([...reload, "Reaload"])
        }
    }

    return (
        <main className="mt-4 container">
        <Link to="/CreateBook"><button className="btn bg-primary"><b className="text-white">Create new</b></button></Link>
        <br />
        <br />
        <form className="input-group" onSubmit={filteredSearch}>
                <input type="search" onChange={handleChange} name="search" className="form-control" placeholder="Search"/>
                <button type="submit" className="btn btn-primary"><i className="fas fa-search"></i></button>
        </form>
        <div className="mt-2">
            <button onClick={() => selectedSearch("Title")} id="Title" className="btn btn-sm">Title</button>
            <button onClick={() => selectedSearch("Author")} id="Author" className="btn btn-sm mx-3">Author</button>
            <button onClick={() => selectedSearch("Genre")} id="Genre" className="btn btn-sm">Genre</button>
        </div>
        <hr />
        {renderDataTable(items, load, onDelete, selectItems, itemsToDelete, deleteSelected, isDisabled)}
        </main>
    )
}

function renderDataTable(items, load, onDelete, selectItems, itemsToDelete, deleteSelected, isDisabled){

    if(!load){
        return (
        <table className="table">
        <thead className="table-dark">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>IsAvalible</th>
                <th colSpan="3">Actions</th>
            </tr>
        </thead>
            <tbody>
                <tr>
                    <td colSpan="7" className="text-center align-middle" style={{ paddingTop: '80px' }}>
                        <h2>Loading Content...</h2>
                    </td>
                </tr>
            </tbody>
        </table>
        )
    }
    else{
        return(
            <>
            <table className="table">
        <thead className="table-dark">
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>IsAvalible</th>
            <th>Actions</th>
        </tr>
    </thead>
            <tbody>
                {items.map(item => (
                    <tr onClick={() => selectItems(item.id)} key={item.id} className={item.id.toString()}>
                        <td className={item.id.toString()}>{item.title}</td>
                        <td className={item.id.toString()}>{item.author}</td>
                        <td className={item.id.toString()}>{item.genre}</td>
                        <td className={item.id.toString()}>{item.isAvalible ? "Yes" : "No"}</td>
                        <td className={item.id.toString()}>
                        <Link to={"/Info/" + item.id}><button className="btn bg-info"><i className="bi bi-info-circle"></i></button></Link>
                        <Link to={"/UpdateBook/" + item.id}><button className="btn bg-warning mx-2">Update <i className="bi bi-pencil-square"></i></button></Link>
                        <button className="btn bg-danger" onClick={() => onDelete(item.id)}>Delete <i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className="btn bg-danger mt-3 mb-3" onClick={() => deleteSelected(itemsToDelete)} disabled={isDisabled} id="delete">Delete</button>
        </>
        )
    }
}

