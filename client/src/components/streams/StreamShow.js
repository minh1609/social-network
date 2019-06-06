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

    render() {
        if (!this.props.stream) {
            return <div>Loading</div>;
        }

        return (
            <div>
                <video ref={this.videoRef} style={{ width: "100%" }} controls />
                <h1>{this.props.stream.title}</h1>
                <h5>{this.props.stream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.id]
});

const mapDispatchToProps = { fetchStream };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamShow);
