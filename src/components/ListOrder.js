import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListOrder() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders();
    }, []);

    function getOrders() {
        axios.get('http://localhost/api4/order/').then(function(response) {
            console.log(response.data);
            setOrders(response.data);
        });
    }

    const deleteOrder = (id) => {
        axios.delete(`http://localhost/api4/order/${id}/delete`).then(function(response){
            console.log(response.data);
            getOrders();
        });
    }
    return (
        <>
        <nav>
          <ul>
          <li onClick={() => navigate("/ListUser", {replace : true})}>
              <Link >List Users</Link>
            </li>
            <li onClick={() => navigate("../user/create", {replace : true})}>
              <Link >Create User</Link>
            </li>
            
            <li onClick={() => navigate("/ListProduct", {replace : true})}>
             <Link>Product</Link>
            </li>       
            <li onClick={() => navigate("../brand/create", {replace : true})}>
              <Link >Create Brand</Link>
            </li>
            <li onClick={() => navigate("/ListBrand", {replace : true})}>
             <Link>List Brand</Link>
            </li>               
            <li onClick={() => navigate("../order/create", {replace : true})}>
              <Link >Create Order</Link>
            </li>
            <li onClick={() => navigate("/ListOrder", {replace : true})}>
             <Link>List Order</Link>
            </li>     
          </ul>
        </nav>
        <div>
            <h1>List Orders</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>CustormerName</th>
                        
                        <th>ProductName</th>
                        <th>BrandName</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, key) =>
                        <tr key={key}>
                            <td>{order.id}</td>
                            <td>{order.cust_name}</td>
                            <td>{order.product_name}</td>
                            <td>{order.brand_name}</td>
                            <td>
                                <Link to={`order/${order.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button style={{ background: 'green' }} onClick={() => deleteOrder(order.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
        </>
    )
}
