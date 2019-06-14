import React, { Component } from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";

export class StreamShow extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.props.fetchStream(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (this.player || !this.props.stream) return;
    }

    //render instruction if user is authenticated

    render() {
        if (!this.props.stream) {
            return <div>Loading</div>;
        } else {
            const {
                title,
                description,
                userName,
                date,
                avatar
            } = this.props.stream;
            return (
                <div>
                    <h1>{title}</h1>
                    <span class="ui  image label">
                        <img src={avatar} alt="avatar" />
                        {userName}
                        <div class="detail">{date}</div>
                    </span>

                    <p style={{ marginTop: "10px" }}>{description}</p>
                </div>
            );
        }
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
