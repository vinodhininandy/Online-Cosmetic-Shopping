import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
function Login() {
    const navigate = useNavigate();
const [username, setUsername]=useState('');
const [password, setPassword]=useState('');

const handleUsernameChange = event => {
setUsername(event.target.value);
};

const handlePasswordChange = event => {
setPassword(event.target.value);
};

const handleSubmit = event => {
event.preventDefault();
axios.post('http://localhost/login/login.php', {
username: username,
password: password
})
.then(response => {
if (response.data==='success') {
alert('Login Successful..');
localStorage.setItem('token', true)
navigate('ListProduct   ');

} else {
alert('Invalid username or password');
}
})
.catch(error => {
console.log(error);
});
};
return (
<div align = 'center'>
<h2>Login</h2>
<form onSubmit={handleSubmit}>
<div>
<label>Username:</label>
<input type="text" name="username" value={username} onChange={handleUsernameChange} />
</div>
<div>
<label>Password: </label>
<input type="password" name="password" value={password} onChange={handlePasswordChange} />
</div>
<button type="submit">Submit</button>
</form>
<br></br>
<button type="button" onClick={() => navigate("/register")}>Register</button>
</div>
);
}
export default Login;
