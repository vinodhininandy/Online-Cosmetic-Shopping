import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ListBrand() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getBrand();
    }, []);

    function getBrand() {
        axios.get(`http://localhost/api3/brand/${id}`).then(function(response) {
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

        axios.put(`http://localhost/api3/brand/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/ListBrand');
        });
        
    }
    return (
        <div>
            <h1>Edit brand</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>BrandName: </label>
                            </th>
                            <td>
                                <input value={inputs.brandname} type="text" name="brandname" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>seller: </label>
                            </th>
                            <td> 
                                <input value={inputs.seller} type="text" name="seller" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>ProductName: </label>
                            </th>
                            <td>
                                <input value={inputs.productname} type="text" name="productname" onChange={handleChange} />
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