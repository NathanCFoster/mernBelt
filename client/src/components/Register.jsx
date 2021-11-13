import { useState, useEffect } from "react";
import axios from 'axios';
const bcrypt = require('bcryptjs');


export default props => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirm] = useState("");
    const [errs, setErrs] = useState({
        userErr: false,
        emailErr: false,
        pwErr: false,
        confirmErr: false,
        nameErr: false,
        mailErr: false
    })

    useEffect(async () => {
        // if there are no errors go ahead and validate back side...
        if (Object.keys(errs).every(e => errs[e] == false) && username.length != 0) {
            let user = await (axios.post("http://localhost:8000/api/users/new", {
                username,
                email,
                password: bcrypt.hashSync(password, 8)
            }))
            let updatedErrs = { ...errs };
            if (user.error) {
                if (user.error.errors.username) {
                    updatedErrs["userErr"] = true;
                }
                if (user.error.errors.email) {
                    updatedErrs["emailErr"] = true;
                }
                if (user.error.errors.password) {
                    updatedErrs["pwErr"] = true;
                }
                setErrs(updatedErrs);
            } else {
                // if there still isn't any errors login to the account!
                props.login(user.data._id);
            }
        }

    }, [errs])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // establish a spread of the current errors so we can update the errors
        let updatedErrs = { ...errs };

        // update the old validations to false so that we can validate the backend again if need
        updatedErrs["emailErr"] = false;
        updatedErrs["pwErr"] = false;
        updatedErrs["userErr"] = false;

        // check if passwords are the same
        if (confirmPW != password) {
            updatedErrs["confirmErr"] = true;
        } else {
            updatedErrs["confirmErr"] = false;
        }

        // check if the db has any users with the username
        const name = await (await (axios.get("http://localhost:8000/api/users/name/" + username + "/"))).data;
        if (name.length != 0) {
            updatedErrs["nameErr"] = true;
        } else {
            updatedErrs["nameErr"] = false;
        }

        // check if the email provided is already in use
        const mail = await (await (axios.get("http://localhost:8000/api/users/email/" + email + "/"))).data;
        if (mail.length != 0) {
            updatedErrs["mailErr"] = true;
        } else {
            updatedErrs["mailErr"] = false;
        }

        // update the errors with all the validations
        setErrs(updatedErrs);
    }

    return (
        <form onSubmit={handleSubmit} className="form col m-5">
            <p className="display-2">Register</p>
            {errs['userErr'] && <p className="alert alert-danger text-center m-3">Username must be at least 3 characters!</p>}
            {errs["nameErr"] && <p className="alert alert-danger text-center m-3">Someone's already used that username!</p>}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" onChange={e => setUsername(e.target.value)} value={username} placeholder="e" />
                <label className="text-black">Username</label>
                {!errs["userErr"] && <p className="form-text ms-3 text-start">Username must be at least 3 characters</p>}
            </div>
            {errs["emailErr"] && <div className="alert alert-danger text-center m-3">Email is invalid</div>}
            {errs["mailErr"] && <p className="alert alert-danger text-center m-3">Someone's already used that email!</p>}
            <div className="form-floating mb-3">
                <input type="text" value={email} placeholder="e" onChange={e => setEmail(e.target.value)} className="form-control" />
                <label className="text-black">Email</label>
            </div>
            {errs["pwErr"] && <p className="alert alert-danger text-center m-3">Password must be at least 8 characters and have at least one number!</p>}
            <div className="form-floating mb-3">
                <input type="password" value={password} placeholder="e" onChange={e => setPassword(e.target.value)} className="form-control" />
                <label className="text-black">Password</label>
                {!errs["pwErr"] && <p className="form-text ms-3 text-start">Password needs to be 8 chars and have at least one number</p>}
            </div>

            {errs["confirmErr"] && <p className="alert alert-danger text-center m-3">Passwords must be the same!</p>}
            <div className="form-floating mb-3">
                <input type="password" value={confirmPW} placeholder="e" onChange={e => setConfirm(e.target.value)} className="form-control" />
                <label className="text-black">Confirm Password</label>
            </div>
            <div className="d-grid">
                <input type="submit" value="Register" className="btn btn-outline-dark" />
            </div>
        </form>
    );
}