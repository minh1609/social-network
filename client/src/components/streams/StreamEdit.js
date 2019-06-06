import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValue => {
        this.props.editStream(this.props.match.params.id, formValue);
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading</div>;
        }
        return (
            <React.Fragment>
                <h3>Edit {this.props.stream.title}</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    //pass value to form
                    initialValues={{
                        title: this.props.stream.title,
                        description: this.props.stream.description
                    }}
                />
            </React.Fragment>
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
    { fetchStream, editStream }
)(StreamEdit);
