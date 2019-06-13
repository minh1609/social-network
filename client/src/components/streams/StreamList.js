import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStreams } from "../../actions";

class StreamList extends Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    //render edit, delete button if user is authenticated
    renderAdmin = stream => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link
                        to={`/streams/edit/${stream._id}`}
                        className="ui button primary"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream._id}`}
                        className="ui button negative"
                    >
                        Delete
                    </Link>
                </div>
            );
        }
    };

    //render create new stream button if user is authenticated
    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create
                    </Link>
                </div>
            );
        }
    };

    renderList() {
        return this.props.streams.map(stream => {
            if (stream._id) {
                return (
                    <div className="item" key={stream._id}>
                        {this.renderAdmin(stream)}
                        <i className="large middle aligned icon camera" />
                        <div className="content">
                            <Link
                                to={`/streams/${stream._id}`}
                                style={{ marginRight: "10px" }}
                            >
                                {stream.title}
                            </Link>
                            <div className="ui tag label">
                                created by {stream.userName}
                            </div>
                            <div className="description">
                                {stream.description}
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //convert  object to array
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(
    mapStateToProps,
    { fetchStreams }
)(StreamList);
