import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

export default props => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.delete("http://localhost:8000/api/pirates/delete/" + id + "/").then(() => navigate("/"))
    }, [])

    return(
        <div>

        </div>
    );
}