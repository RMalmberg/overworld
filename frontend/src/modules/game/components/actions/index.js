import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { LogIn } from "../../../app/components";
import LogModal from "../log-modal";
import Buttons from "./Buttons";
import Ratings from "./Rating";
import ShareOption from "./ShareOption";
import "./styles.css";

class Actions extends React.Component {
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    return (
      <Menu floated="right" icon="labeled" className="actions" vertical fluid>
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <Menu.Item>
              <Buttons game={this.props.game} />
            </Menu.Item>
            <Menu.Item className="rate">
              Rate
              <Ratings game={this.props.game} />
            </Menu.Item>
            <LogModal game={this.props.game} />
            <Menu.Item content="Add to a list" link />
          </React.Fragment>
        ) : (
          <LogIn loginText="Sign in to log, rate or review..." />
        )}
        <Menu.Item>
          {!this.state.isHovering &&
          <div
          onMouseEnter={this.handleMouseHover}>
            Share on socials
          </div>
          }
          {this.state.isHovering &&
          <div
          onMouseLeave={this.handleMouseHover}>
            <ShareOption game={this.props.game}/>
          </div>
        }
        </Menu.Item>
      </Menu>
    );
  }
}

Actions.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  game: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Actions);
