import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { Footer, Register, LogIn } from "../app/components/";
import { getPopularGames } from "./actions";
import { Popular_Games } from "./components/";
import "./styles.css";



export class Games extends React.Component {
  componentDidMount() {
    if (this.props.popular.length === 0) {
      this.props.getPopularGames();
    }
  }




  render() {
    const { isLoadingPopular, popular } = this.props;

    return (
      <React.Fragment>
        <Container className="padding-bottom">
          <div>
            <p>
              <Register /> Or <LogIn loginText="sign in" /> .
            </p>
          </div>
          <div className="games">
            <section className="games-header">
              <h1>Popular Games</h1>
            </section>
            <Popular_Games isLoadingPopular={isLoadingPopular} popularGames={popular} />
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

Games.propTypes = {
  isLoadingPopular: PropTypes.bool.isRequired,
  getPopular: PropTypes.func.isRequired,
  popularGames: PropTypes.array.isRequired
};


const mapStateToProps = state => ({
  isLoadingPopular: state.games.isLoadingPopular,
  popular: state.landing.popular
});



export default connect(mapStateToProps, { getPopularGames })(Games);
