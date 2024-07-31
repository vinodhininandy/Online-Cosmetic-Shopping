import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function ListUser() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/api/user/').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost/api/user/${id}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
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
              <Link>Product</Link>
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
            <h1>List Users</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button style={{ background: 'green' }} onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
            
        </div>
        </>
    )
}
