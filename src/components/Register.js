import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
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
axios.post('http://localhost/login/register.php', {
username: username,
password: password
})
.then(response => {
if (response.data==='success') {
alert('Register Success..');
navigate('../', {replace : true});
} else {
alert('Unable to register');
}
})
.catch(error => {
console.log(error);
});
};
return (
<div>
<h2>Register User</h2>
<form onSubmit={handleSubmit}>
<div>
<label>Username:</label>
<input type="text" name="username" value={username} onChange={handleUsernameChange} />
</div>
<div>
<label>Password: </label>
<input type="password" name="password" value={password} onChange={handlePasswordChange} />
</div>
<button type="submit">Register</button>
</form>
</div>
);
}
export default Register;
