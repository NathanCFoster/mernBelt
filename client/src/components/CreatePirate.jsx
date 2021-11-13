import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default props => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [numofchests, setChests] = useState("");
    const [catchphrase, setPhrase] = useState("");
    const [position, setPosition] = useState("Captain");
    const [pegleg, setPegleg] = useState(true);
    const [eyepatch, setEyepatch] = useState(true);
    const [hookhand, setHookhand] = useState(true);
    const [errs, setErrrs] = useState({
        name: "",
        image: "",
        numofchests: "",
        catchphrase: "",
        position:"",
        pegleg:"",
        eyepatch:"",
        hookhand:""
    })

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        let res = await (axios.post("http://localhost:8000/api/pirates/new", {
            name,
            image,
            numofchests,
            catchphrase,
            position,
            pegleg,
            eyepatch,
            hookhand
        }));
        if (res.data.error) {
            let updatedErrs = {...errs};
            for(const error in res.data.error.errors) {
                updatedErrs[error] = res.data.error.errors[error]["message"];
            }
            console.log(position)
            setErrrs(updatedErrs);
        } else {
            navigate("/");
        }
    }

    return (
        <div className="row m-3">
            <div className="nav justify-content-between m-3 align-items-center">
                <p className="display-3">Add Pirate</p>
                <Link to="/" className="nav-link">Crew Board</Link>
            </div>
            <form onSubmit={handleSubmit} className="form me-5">
            {errs["name"] != "" && <div className="alert alert-danger">{errs["name"]}</div>}
                <div className="form-floating mb-3">
                    <input type="text" placeholder='e' value={name} onChange={e => setName(e.target.value)} className="form-control" />
                    <label className="text-black">Pirate Name</label>
                </div>
                {errs["image"] != "" && <div className="alert alert-danger">{errs["image"]}</div>}
                <div className="form-floating mb-3">
                    <input type="text" placeholder="e" value={image} onChange={e => setImage(e.target.value)} className="form-control" />
                    <label className="text-black">Image Url</label>
                </div>
                {errs["numofchests"] != "" && <div className="alert alert-danger">{errs["numofchests"]}</div>}
                <div className="form-floating mb-3">
                    <input type="number" placeholder="e" value={numofchests} onChange={e => setChests(e.target.value)} className="form-control" />
                    <label className="text-black">Num of Chests</label>
                </div>
                {errs["catchphrase"] != "" && <div className="alert alert-danger">{errs["catchphrase"]}</div>}
                <div className="form-floating mb-3">
                    <textarea className="form-control" style={{ height: 100 }} placeholder="e" value={catchphrase} onChange={e => setPhrase(e.target.value)}></textarea>
                    <label className="text-black">Pirate Catch Phrases</label>
                </div>
                {errs["position"] != "" && <div className="alert alert-danger">{errs["position"]}</div>}
                <div className="text-start">
                    <label htmlFor="select" className="text-black ms-2">Position</label>
                    <select id="select" onChange={e => setPosition(e.target.value)} value={position} className="form-select mb-3">
                        <option value="Captain">Captain</option>
                        <option value="First Mate">First Mate</option>
                        <option value="Quarter Master">Quarter Master</option>
                        <option value="Boatswain">Boatswain</option>
                        <option value="Powder Monkey">Powder Monkey</option>
                    </select>
                </div>
                <div className="form-check mb-3 text-start">
                    <input type="checkbox" checked={pegleg} onChange={e => setPegleg(!pegleg)} className="form-check-input" id="pegleg" />
                    <label htmlFor="pegleg" className="form-check-label">Pegleg</label>
                </div>
                <div className="form-check mb-3 text-start">
                    <input type="checkbox" checked={eyepatch} onChange={e => setEyepatch(!eyepatch)} className="form-check-input" id="eyepatch" />
                    <label htmlFor="eyepatch" className="form-check-label">Eyepatch</label>
                </div>
                <div className="form-check mb-3 text-start">
                    <input type="checkbox" checked={hookhand} onChange={e => setHookhand(!hookhand)} className="form-check-input" id="hookhand" />
                    <label htmlFor="hookhand" className="form-check-label">Hookhand</label>
                </div>
                <div className="d-grid">
                    <input type="submit" value="Create" className="btn btn-outline-dark" />
                </div>
            </form>
        </div>
    );
}