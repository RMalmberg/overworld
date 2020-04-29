import React, { useEffect } from "react"; // hooks
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Backdrop, Footer } from "../";
import { getBackdrop } from "../../../landing/actions";
import { Backdrops as options } from "../../../landing/utils";
import "./styles.css";
import { Container, Form, Button } from "semantic-ui-react";
import { RegistrationForm } from "./Form";
import PropTypes from "prop-types";
// import { Button, Form } from "semantic-ui-react";

const SignUpPage = () => {

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

/*
* also followed the same backdrop logic from the landing page
*/
return (
    <>
    <h1> Join Overworld! </h1>
    <Container>
    <RegistrationForm/>
    </Container>
      {Object.keys(backdrop).length > 0 && (
        <Backdrop imageId={backdrop.imageId} />
      )}
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

export default SignUpPage;