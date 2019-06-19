import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
    componentDidMount() {
        //load oath2 from google server
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "321897280820-tjkaj148lcs7110nt057mrs86a5epms6.apps.googleusercontent.com",
                    //what type of data we want to access
                    scope: "email"
                })
                //auth: represent for user, all user infomation can be get from this object
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);

                    //username this.auth.currentUser.Ab.w3.ig
                    console.log(this.auth.currentUser.Ab.w3.Paa);
                });
        });
    }

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(
                this.auth.currentUser.get().getId(),

                //user name
                this.auth.currentUser.Ab.w3.ig,

                //avatar link
                this.auth.currentUser.Ab.w3.Paa
            );
        } else {
            this.props.signOut();
        }
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn === true) {
            return (
                <React.Fragment>
                    <button
                        onClick={this.onSignOutClick}
                        className="ui red google button"
                    >
                        <i className="google icon" />
                        Sign Out
                    </button>
                </React.Fragment>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign in with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    //action creator
    { signIn: signIn, signOut: signOut }
)(GoogleAuth);
