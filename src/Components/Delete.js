import Constants from "../Utilities/Constants";

export default function deleteSelected (props) {
    for(let i = 0; i < props.length; i++){
        fetch(`${Constants.API_URL_DELETE_BOOK_BY_ID}/${props[i]}`, {
            method: "DELETE"
        })
        .then(responseFromServer => {
            console.log(responseFromServer)
        }).catch(error => {
            alert(error)
            console.log(error)
        })
        window.location.reload(true);
    }
}