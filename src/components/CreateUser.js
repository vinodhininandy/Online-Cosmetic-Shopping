import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/api/user/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/ListUser');
        });
        
    }
    return (
        <>
        <nav>
          <ul>
            <li onClick={() => navigate("../user/list", {replace : true})}>
              <Link >List Users</Link>
            </li>
            <li onClick={() => navigate("../user/create", {replace : true})}>
              <Link >Create User</Link>
            </li>
        
            <li onClick={() => navigate("../product/", {replace : true})}>
              <Link> Product</Link>
            </li>
             <li onClick={() => navigate("../brand/create", {replace : true})}>
                <Link >Create Brand</Link>
            </li>
             <li onClick={() => navigate("../brand/", {replace : true})}>
                <Link>List Brand</Link>
             </li>        
             
                    <li onClick={() => navigate("../order/create", { replace: true })}>
                        <Link >Create Order</Link>
                    </li>
                    <li onClick={() => navigate("../order/", { replace: true })}>
                        <Link>List Order</Link>
                    </li>
          </ul>
        </nav>
        <div>
            <h1>Create user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td> 
                                <input type="text" name="email" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input type="text" name="mobile" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="right">
                                <button style={{ background: 'green' }}>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        </>
    )
}
