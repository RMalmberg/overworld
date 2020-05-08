import React, { useState } from "react";
import { login } from "../../actions";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "semantic-ui-react";

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
        <Button type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>

    </>
  );
};