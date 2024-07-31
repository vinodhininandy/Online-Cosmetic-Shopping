import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListBrand() {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        getBrands();
    }, []);

    function getBrands() {
        axios.get('http://localhost/api3/brand/').then(function(response) {
            console.log(response.data);
            setBrands(response.data);
        });
    }

    const deleteBrand = (id) => {
        axios.delete(`http://localhost/api3/brand/${id}/delete`).then(function(response){
            console.log(response.data);
            getBrands();
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
            
                    <li onClick={() => navigate("../order/create", { replace: true })}>
                        <Link >Create Order</Link>
                    </li>
                    <li onClick={() => navigate("../order/", { replace: true })}>
                        <Link>List Order</Link>
                    </li>    
          </ul>
        </nav>
        <div>
            <h1>List Brands</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>BrandName</th>
                        <th>Seller</th>
                        <th>ProductName</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand, key) =>
                        <tr key={key}>
                            <td>{brand.id}</td>
                            <td>{brand.brandname}</td>
                            <td>{brand.seller}</td>
                            <td>{brand.productname}</td>
                            <td>
                                <Link to={`brand/${brand.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button style={{ background: 'green' }} onClick={() => deleteBrand(brand.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
        </>
    )
}
