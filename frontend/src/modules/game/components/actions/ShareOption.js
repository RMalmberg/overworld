import React from "react";
import {Grid, GridColumn, Icon, Popup} from "semantic-ui-react";
import moment from "moment";
import {TwitterShareButton, FacebookShareButton, RedditShareButton} from "react-share";
import "font-awesome/css/font-awesome.min.css";

class ShareOption extends React.Component {

    render() {
        return(
            <React.Fragment>
                <Grid className="share-buttons">
                    <Grid.Row columns={3} verticalAlign="middle">
                        <Grid.Column>
                            <FacebookShareButton url={window.location.href}
                            title={`Check out ${this.props.game.name} (${moment(
                                  this.props.game.first_release_date * 1000
                                ).format("YYYY")}) on @JoinOverworld!:`}
                            >
                                <Popup
                                  trigger={<Icon link size="big" name="facebook f" />}
                                  content={"Facebook"}
                                  position="top center"
                                  size="tiny"
                                  inverted
                                />
                            </FacebookShareButton>
                        </Grid.Column>
                        <Grid.Column>
                            <TwitterShareButton
                                title={`${this.props.game.name} (${moment(
                                  this.props.game.first_release_date * 1000
                                ).format("YYYY")}) on @JoinOverworld:`}
                                url={window.location.href}
                                >
                                <Popup
                                  trigger={<Icon link size="big" name="twitter" />}
                                  content={"Twitter"}
                                  position="top center"
                                  size="tiny"
                                  inverted
                                />
                              </TwitterShareButton>
                        </Grid.Column>
                        <Grid.Column>
                            <RedditShareButton url={window.location.href}
                                title={`Check out ${this.props.game.name} (${moment(
                                  this.props.game.first_release_date * 1000
                                ).format("YYYY")}) on @JoinOverworld!:`}
                                >
                                <Popup
                                  trigger={<Icon link size="big" name="reddit alien" />}
                                  content={"Reddit"}
                                  position="top center"
                                  size="tiny"
                                  inverted
                                />
                            </RedditShareButton>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}

export default ShareOption;
