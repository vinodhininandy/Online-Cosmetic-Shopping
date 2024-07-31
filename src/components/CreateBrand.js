import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ListBrand() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/api3/brand/save', inputs).then(function (response) {
            console.log(response.data);
            navigate('/ListBrand');
        });
    }
    return (
        <>
            <nav>
                <ul>
                    <li onClick={() => navigate("../user/list", { replace: true })}>
                        <Link >List Users</Link>
                    </li>
                    <li onClick={() => navigate("../user/create", { replace: true })}>
                        <Link >Create User</Link>
                    </li>
                    
                    <li onClick={() => navigate("../product/", { replace: true })}>
                        <Link> Product</Link>
                    </li>
                    <li onClick={() => navigate("../brand/create", { replace: true })}>
                        <Link >Create Brand</Link>
                    </li>
                    <li onClick={() => navigate("../brand/", { replace: true })}>
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
                <h1>Create brand</h1>
                <form onSubmit={handleSubmit}>
                    <table cellSpacing="10">
                        <tbody>
                            <tr>
                                <th>
                                    <label>BrandName: </label>
                                </th>
                                <td>
                                    <input type="text" name="brandname" onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Seller: </label>
                                </th>
                                <td>
                                    <input type="text" name="seller" onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>ProductName: </label>
                                </th>
                                <td>
                                    <input type="text" name="productname" onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="right">

                                    <button style={{ background: 'green' }}> Save </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )
}
