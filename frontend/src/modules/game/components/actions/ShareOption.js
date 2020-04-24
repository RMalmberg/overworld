import React from "react";
import TwitterShareButton from "react-share";
import { Grid, Icon, Popup, Form } from "semantic-ui-react";
import "font-awesome/css/font-awesome.min.css";
class ShareOption extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Grid className="share-buttons">
                    <Grid.Row columns={3} verticalAlign="middle">
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
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}

export default ShareOption;
