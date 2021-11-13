import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default props => {
    const {id } = useParams();
    const [pirate, setPirate] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates/" + id + "/").then(e => {console.log(e.data); setPirate(e.data)}).catch(e => console.log(e));
    }, [])

    return(
        <div className="row m-3">
            <div className="nav m-3 align-items-center justify-content-between">
                <p className="display-3">{pirate.name}</p>
                <Link to="/" className="nav-link">Home</Link>
            </div>
            <div className="row m-5">
                <div className="col">
                    <img src={pirate.image} alt="pirate img"/>
                </div>
                <div className="col row">
                    <p className="display-4">About</p>
                    <dt className="col-sm-3">Position:</dt>
                    <dd className="col-sm-9">{pirate.position}</dd>
                    <dt className="col-sm-3">Treasures:</dt>
                    <dd className="col-sm-9">{pirate.numofchests}</dd>
                    <dt className="col-sm-3">Peg Leg:</dt>
                    <dd className="col-sm-9">{pirate.pegleg ? "Yes" : "No"}</dd>
                    <dt className="col-sm-3">Eye Patch:</dt>
                    <dd className="col-sm-9">{pirate.eyepatch ? "Yes" : "No"}</dd>
                    <dt className="col-sm-3">Hook Hand:</dt>
                    <dd className="col-sm-9">{pirate.hookhand ? "Yes" : "No"}</dd>
                </div>
            </div>
        </div>
    );
}