import React from "react";
import {Backdrops as options} from "../landing/utils";
import {Container} from "semantic-ui-react";
import {Backdrop, Footer, LogIn, Register} from "../app/components";
import {Features, Popular} from "../landing/components";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getBackdrop, getPopular} from "../landing/actions";

export class Landing extends React.Component {
  componentDidMount() {
    const game = options[Math.floor(Math.random() * options.length)];
    if (Object.keys(this.props.backdrop).length === 0) {
      this.props.getBackdrop(game.gameId);
    }
  }

  render() {
    const { isLoadingPopular, backdrop } = this.props;
    return (
      <React.Fragment>
        <Container className="padding-bottom">
          {Object.keys(backdrop).length > 0 && (
            <Backdrop imageId={backdrop.imageId} />
          )}
          <div className="landing">
            <section className="landing-header">
              <LogIn loginText="sign in" />
            </section>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  backdrop: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backdrop: state.landing.backdrop
});

export default connect(mapStateToProps, { getPopular, getBackdrop })(Landing);