import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudentInfo from './studentInfo';  
export default function ListProduct() {
    const navigate = useNavigate();     
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    function getProducts() {
        axios.get('http://localhost/api1/product/').then(function(response) {
            console.log(response.data);
            setProducts(response.data);
        });
    }

    const deleteProduct = (id) => {
        axios.delete(`http://localhost/api1/product/${id}/delete`).then(function(response){
            console.log(response.data);
            getProducts();
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
             <Link> Product</Link>
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
        
            <div className="row">  
              <div className="col-md-8 offset-md-2">  
                <StudentInfo />  
              </div>  
            </div> 
        
        </>
    )
}
