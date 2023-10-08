import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

export default function header (){
    return(
<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#C2A7A0' }}>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
        <CurrentPage className="nav-link" to="/"><b><i className="fa-solid fa-house"></i> Home</b></CurrentPage>
        <CurrentPage className="nav-link" to="/Books"><b><i className="fa-solid fa-book"></i> Books</b></CurrentPage>
        <CurrentPage className="nav-link" to="/Genres"><b><i className="fa-solid fa-file"></i> Genres</b></CurrentPage>
        <CurrentPage className="nav-link" to="/Authors"><b><i className="fa-solid fa-user"></i> Authors</b></CurrentPage>
        </ul>
    </div>
</nav>
    )
}

function CurrentPage({to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props} style={{ margin: "0 30px"}}>{children}</Link>
        </li>
    )
}