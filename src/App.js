import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

import EditProduct from './components/EditProduct';
import ListProduct from './components/ListProduct';

import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';
import CreateBrand from './components/CreateBrand';
import ListBrand from './components/ListBrand';
import EditBrand from './components/EditBrand';
import CreateOrder from './components/CreateOrder';
import EditOrder from './components/EditOrder';
import ListOrder from './components/ListOrder';
import  {useEffect, useState  }from 'react';

function App() {
  const [auth, setAuth] = useState(false);

  const logout = () => {
    localStorage.setItem('token', null);
    setAuth(false)
  }
  return (
    <div className="App">
      <h3>TIRA BEAUTY </h3>

      
      <BrowserRouter>
        {}
        <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
          <Route path="ListUser" element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="/ListUser/user/:id/edit" element={<EditUser />} />
          <Route path="ListProduct" element={<ListProduct />} />
          
          <Route path="ListProduct/product/:id/edit" element={<EditProduct />} />
          <Route path="ListBrand" element={<ListBrand />} />
          <Route path="brand/create" element={<CreateBrand />} />
          <Route path="/ListBrand/brand/:id/edit" element={<EditBrand />} />
          <Route path="ListOrder" element={<ListOrder />} />
          <Route path="order/create" element={<CreateOrder />} />
          <Route path="/ListOrder/order/:id/edit" element={<EditOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
