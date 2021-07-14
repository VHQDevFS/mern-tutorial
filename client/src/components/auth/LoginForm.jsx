import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
  // context
  const { loginUser } = useContext(AuthContext);

  //local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  
  const [alert, setAlert] = useState(null)

  const history = useHistory()

  const { username, password } = loginForm;

  const onChangeLoginForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if(loginData.success) {
        history.push('/dashboard')
      } else {
        setAlert({type:'danger', message: loginData.message})
        setTimeout(() => setAlert(null), 3000)
      } 
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Form className="my-2" onSubmit={login}>
        <AlertMessage info={alert}/>
        <Form.Group>
          <Form.Control
            className="mb-2"
            type="text"
            placeholder="Enter Username..."
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="mb-2"
            type="password"
            placeholder="Enter Password..."
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>

        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
