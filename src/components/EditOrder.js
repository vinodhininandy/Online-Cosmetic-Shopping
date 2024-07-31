import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ListOrder() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getOrder();
    }, []);

    function getOrder() {
        axios.get(`http://localhost/api4/order/${id}`).then(function(response) {
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

        axios.put(`http://localhost/api4/order/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/ListOrder');
        });
        
    }
    return (
        <div>
            <h1>Edit order</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>customerName: </label>
                            </th>
                            <td>
                                <input value={inputs.cust_name} type="text" name="cust_name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>product_name: </label>
                            </th>
                            <td> 
                                <input value={inputs.product_name} type="text" name="product_name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>brandName: </label>
                            </th>
                            <td>
                                <input value={inputs.brand_name} type="text" name="brand_name" onChange={handleChange} />
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