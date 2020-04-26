import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Backdrop, Footer, Register, LogIn } from "../app/components/";
import { getPopular, getBackdrop } from "../landing/actions";
import { Features, Popular } from "../landing/components/";
import { Backdrops as options } from "../landing/utils";
import "../landing/styles.css";

export class Landing extends React.Component {
  componentDidMount() {
    const game = options[Math.floor(Math.random() * options.length)];
    if (Object.keys(this.props.backdrop).length === 0) {
      this.props.getBackdrop(game.gameId);
    }

    if (this.props.popular.length === 0) {
      this.props.getPopular();
    }
  }

  render() {
    const { isLoadingPopular, popular, backdrop } = this.props;
    return (
      <React.Fragment>
        <Container className="padding-bottom">
          <p>
                <Register />
                Or <LogIn loginText="sign in" /> .
              </p>
          {Object.keys(backdrop).length > 0 && (
            <Backdrop imageId={backdrop.imageId} />
          )}
          <div className="landing">
            <section className="landing-header">
              <h1>Games</h1>
            </section>
            <Popular isLoading={isLoadingPopular} popular={popular} />
            <Features />
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
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  isLoadingPopular: PropTypes.bool.isRequired,
  getBackdrop: PropTypes.func.isRequired,
  getPopular: PropTypes.func.isRequired,
  backdrop: PropTypes.object.isRequired,
  popular: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  backdrop: state.landing.backdrop,
  isLoadingPopular: state.landing.isLoadingPopular,
  popular: state.landing.popular
});

export default connect(mapStateToProps, { getPopular, getBackdrop })(Landing);
