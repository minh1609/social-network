import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./transition.css";
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
    renderCreateButton = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ margin: "10px auto" }}>
                    <Link to="/streams/new" className="ui button primary">
                        Click me if you want
                    </Link>
                </div>
            );
        }
    };

    renderDescription(description = "", id = 0) {
        if (description.length > 50) {
            return (
                <div className="ui message">
                    {description.substring(0, 50)}{" "}
                    <Link to={`/streams/${id}`}> ... Read more</Link>
                </div>
            );
        } else {
            return <div className="ui message">{description}</div>;
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            if (stream._id && stream) {
                return (
                    <CSSTransition
                        key={stream._id}
                        classNames="item"
                        timeout={1000}
                    >
                        <div className="event">
                            <div class="label">
                                <img src={stream.avatar} alt="avatar" />
                            </div>
                            <div class="content">
                                <Link to={`/streams/${stream._id}`}>
                                    <div class="summary">
                                        <span className="user">
                                            {stream.title}
                                        </span>{" "}
                                        <div class="date">
                                            {stream.date} by {stream.userName}
                                        </div>
                                    </div>
                                </Link>
                                <div class="meta">
                                    <span className="like">
                                        {this.renderDescription(
                                            stream.description,
                                            stream._id
                                        )}
                                        {this.renderAdmin(stream)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                );
            }
        });
    }

    render() {
        return (
            <div>
                <h3>Hi, {this.props.userName}, want to share something </h3>
                {this.renderCreateButton()}
                <TransitionGroup className="todo-list">
                    <div className="ui feed">{this.renderList()}</div>
                </TransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //convert  object to array
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        userName: state.auth.userName
    };
};

export default connect(
    mapStateToProps,
    { fetchStreams }
)(StreamList);
