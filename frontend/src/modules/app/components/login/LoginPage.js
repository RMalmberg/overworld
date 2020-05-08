import React, {useEffect} from "react";
import {Grid, Container} from "semantic-ui-react";
import { LoginForm } from "./Form";
import { Backdrop, Footer } from "../";
import { getBackdrop } from "../../../landing/actions";
import "./styles.css";
import {useDispatch, useSelector} from "react-redux";
import Link from "react-router-dom/modules/Link";

const LoginPage = () => {
  const options = { position: ["isLeft"] };
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
        <Grid>
          <Container>
            <h1 style={{textAlign: "center" }}>Sign In</h1>
            <LoginForm />
          </Container>
        </Grid>
        {Object.keys(backdrop).length > 0 && (
        <section className="backdrop-name">
          Backdrop from{" "}
          <Link
            to={{
              pathname: `/games/${backdrop.slug}`,
              state: backdrop.gameId
            }}
          >
            {backdrop.name}
          </Link>
        </section>
      )}
        <Footer />
    </>
  );
};

export default LoginPage;