import axios from "axios";
import { useState } from "react";
import bcrypt from 'bcryptjs';

export default props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        let user = await(await (axios.get("http://localhost:8000/api/users/name/" + username + "/"))).data[0];
        if(bcrypt.compareSync(password, user.password)) {
            props.login(user._id);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="form col m-5">
            <p className="display-2">Login</p>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" value={username} placeholder="e" onChange={(e) => setUsername(e.target.value)} />
                <label className="text-black">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" value={password} placeholder="e" onChange={e => setPassword(e.target.value)} />
                <label className="text-black">Password</label>
            </div>
            <div className="d-grid">
                <input type="submit" value="Login" className="btn btn-outline-dark" />
            </div>
        </form>
    );
}