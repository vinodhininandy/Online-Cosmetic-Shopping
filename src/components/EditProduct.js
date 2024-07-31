import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ListProduct() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        axios.get(`http://localhost/api1/product/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost/api1/product/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/ListProduct');
        });
        
    }
    return (
        <div>
            <h1>Edit product</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>ProductName: </label>
                            </th>
                            <td>
                                <input value={inputs.prodname} type="text" name="prodname" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Price: </label>
                            </th>
                            <td> 
                                <input value={inputs.price} type="text" name="price" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Qty: </label>
                            </th>
                            <td>
                                <input value={inputs.qty} type="text" name="qty" onChange={handleChange} />
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
    )
}
