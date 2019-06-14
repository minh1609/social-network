import React, { Component } from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";
import flv from "flv.js";

export class StreamShow extends Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    async componentDidMount() {
        await this.props.fetchStream(this.props.match.params.id);
        this.createPlayer();
    }

    componentDidUpdate() {
        if (this.player || !this.props.stream) return;
        this.createPlayer();
    }

    componentWillUnmount() {
        this.flvPlayer.destroy();
    }

    createPlayer() {
        this.flvPlayer = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        });
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();
    }

    //render instruction if user is authenticated
    renderIntruction() {
        //if user is the owner of this stream, render instruction for user
        if (this.props.auth.userId === this.props.stream.userId)
            return (
                <div className="ui message">
                    <div className="header">How to stream to your channel</div>
                    <ul className="list">
                        <li>
                            Download OBS studio at{" "}
                            <a href="https://obsproject.com/">this link</a>
                        </li>
                        <li>Install and open it on your machine </li>
                        <li>
                            Go to File/Setting
                            <br />
                            Change Server to rtmp://localhost/live <br />
                            Stream key to {this.props.stream._id}
                            <br />
                            Close Setting window
                        </li>
                        <li>
                            Click Star Stream on bottom-right to start streaming{" "}
                        </li>
                    </ul>
                </div>
            );
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading</div>;
        }

        return (
            <React.Fragment>
                <div>
                    <video
                        ref={this.videoRef}
                        style={{ width: "100%" }}
                        controls
                    />
                    <h1>{this.props.stream.title}</h1>
                    <h5>{this.props.stream.description}</h5>
                </div>
                {this.renderIntruction()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.id],
    auth: state.auth
});

const mapDispatchToProps = { fetchStream };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamShow);
