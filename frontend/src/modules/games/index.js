import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Backdrop, Footer, Register, LogIn, GameSearch } from "../app/components/";
import { getPopularGames, getBackdrop } from "./actions";
import { Features } from "./components/";
import { Popular_Games } from "./components/";
import { Backdrops as options } from "./utils";
import "./styles.css";





export class Games extends React.Component {
  componentDidMount() {
    const game = options[Math.floor(Math.random() * options.length)];
    if (Object.keys(this.props.backdrop).length === 0) {
      this.props.getBackdrop(game.gameId);
    }

    if (this.props.popular.length === 0) {
      this.props.getPopularGames();
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
          <div className="games">
            <section className="games-header">
              <h1>Games</h1>
              <p>
              <GameSearch />
              </p>
            </section>
            <Popular_Games isLoading={isLoadingPopular} popular={popular} />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

Games.propTypes = {
  isLoadingPopular: PropTypes.bool.isRequired,
  getBackdrop: PropTypes.func.isRequired,
  getPopular: PropTypes.func.isRequired,
  backdrop: PropTypes.object.isRequired,
  popularGames: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  backdrop: state.landing.backdrop,
  isLoadingPopular: state.landing.isLoadingPopular,
  popular: state.landing.popular
});



export default connect(mapStateToProps, { getPopularGames, getBackdrop })(Games);
