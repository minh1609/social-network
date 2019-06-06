import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    action = () => {
        return (
            <React.Fragment>
                <button
                    onClick={() => {
                        this.props.deleteStream(this.props.match.params.id);
                    }}
                    className="ui primary button"
                >
                    Yes
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    };

    renderContent = () => {
        if (!this.props.stream) {
            return "";
        } else {
            return `Are you sure you want to delete ${this.props.stream.title}`;
        }
    };

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                action={this.action()}
                onDismiss={() => {
                    history.push("/");
                }}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(
    mapStateToProps,
    { fetchStream, deleteStream }
)(StreamDelete);
