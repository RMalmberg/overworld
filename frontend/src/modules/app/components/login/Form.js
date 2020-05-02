import React, { useState } from "react";
import { login } from "../../actions";
import Error from "../errors/";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "semantic-ui-react";

/* Original form
export const LoginForm = ({
  handleChange,
  handleSubmit,
  validateForm,
  username,
  password
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Username</label>
      <input name="username" value={username} onChange={handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
      />
    </Form.Field>
    <Button
      floated="right"
      positive
      fluid
      type="submit"
      disabled={!validateForm()}
    >
      Sign In
    </Button>
  </Form>
);

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired
};
*/

export const LoginForm = () => {
  const defaultState = {
    username: "",
    password: ""
  };
  const [{ username, password }, setState] = useState(defaultState);
  const { errors, isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const validateForm = () => username.length > 0 && password.length > 0;

  if (isAuthenticated) {
    return <Redirect to={`/user/${user.username}`} />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Login ID</label>
          <input name="username" value={username} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name="password" value={password} onChange={handleChange} />
        </Form.Field>
        <Button type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};