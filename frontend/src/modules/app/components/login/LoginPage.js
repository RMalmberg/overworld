import React from "react";
import {Grid, Container} from "semantic-ui-react";
import { LoginForm } from "./Form";
import "./styles.css";

const LoginPage = () => {
  const options = { position: ["isLeft"] };
  return (
    <>
        <Grid>
          <Container>
            <h1 style={{textAlign: "center" }}>Sign In</h1>
            <LoginForm />
          </Container>
        </Grid>
    </>
  );
};

export default LoginPage;