import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button, Grid } from "semantic-ui-react";
import { Backdrop } from "../";
import { getBackdrop } from "../../../landing/actions";
import { Backdrops as options } from "../../../landing/utils";
import { LoginForm } from "./Form";
import { Footer } from "../";
import "./styles.css";

const LoginPage = () => {
const { backdrop } = useSelector(state => state.landing);
const dispatch = useDispatch();

useEffect(() => { // instead of writing a class you can use a hook

/*
* followed the same backdrop logic from the landing page
*/
if (Object.keys(backdrop).length === 0) {
const game = options[Math.floor(Math.random() * options.length)];
dispatch(getBackdrop(game.gameId));

}
});
  return (
    <>
      {Object.keys(backdrop).length > 0 && (
    <Backdrop imageId={backdrop.imageId} />
    )}
        <Grid centered>
          <Container>
            <h1 style={{textAlign: "center" }}>Sign In</h1>
                <Grid.Row>
                <Grid.Column width={5}>
                    <LoginForm />
                </Grid.Column>
                </Grid.Row>
          </Container>
        </Grid>
      <Footer />
    </>
  );
};

export default LoginPage;