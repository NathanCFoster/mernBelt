import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { io } from "socket.io-client";

export default props => {
    const [pirates, setPirates] = useState([]);
    const [socket] = useState(() => io(':8000'));

    useEffect(() => {
        socket.emit("updateAllPirates");
        socket.on("pirates", e => setPirates(e));
    }, [])

    return (
        <div className="row m-3">
            <div className="nav m-3 align-items-center justify-content-between">
                <p className="display-2">Pirate Crew</p>
                <div className="d-flex flex-row">
                    <Link to="/create" className="nav-link">Add Pirate</Link>
                    <Link to="/logout" className="nav-link">Logout</Link>
                </div>
            </div>
            <TransitionGroup className="list-group list-group-flush">
            {pirates.map((item) => 
            <CSSTransition
            timeout={300}
            classNames="pirates"
            key={item._id}>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <img src={item.image} alt="pirate img" style={{height:200}} />
                <Link to={"/view/" + item._id} className="nav-link">{item.name}</Link>
                <Link className="nav-link text-danger" to={"/delete/" + item._id}>Make them walk the plank</Link>
            </li>
            </CSSTransition>
            )}
            </TransitionGroup>
        </div>
    );
}