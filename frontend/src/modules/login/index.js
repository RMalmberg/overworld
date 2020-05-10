import React from "react";
import {Backdrops as options} from "../landing/utils";
import {Container} from "semantic-ui-react";
import {Backdrop, Footer, LogIn, Register} from "../app/components";
import {Features, Popular} from "../landing/components";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getBackdrop, getPopular} from "../landing/actions";

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
          <div className="landing">
            <section className="landing-header">
              <h1> </h1>
              <p>
                <LogIn loginText="sign in" />
              </p>
            </section>
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