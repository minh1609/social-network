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
                <div>
                    <Link to={`/streams/edit/${stream._id}`}> Edit </Link>
                    <Link to={`/streams/delete/${stream._id}`}> Delete</Link>
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
            if (stream._id && stream) {
                return (
                    <div className="event" key={stream._id}>
                        <div class="label">
                            <img src={stream.avatar} alt="avatar" />
                        </div>
                        <div class="content">
                            <Link to={`/streams/${stream._id}`}>
                                <div class="summary">
                                    <span className="user">{stream.title}</span>{" "}
                                    <div class="date">
                                        {stream.date} by {stream.userName}
                                    </div>
                                </div>
                            </Link>
                            <div class="meta">
                                <span className="like">
                                    {stream.description}
                                    {this.renderAdmin(stream)}
                                </span>
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
                <div className="ui feed">{this.renderList()}</div>
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
