import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
    // formValue contain value from Field
    //{title:"  ", description: "  "}
    onSubmit = formValue => {
        this.props.createStream(formValue);
    };

    render() {
        return (
            // Field will pass label props to component props(it is renderInput is this case)
            //handle submit is a props created by redux form
            <React.Fragment>
                <h3>Create Stream</h3>

                <StreamForm onSubmit={this.onSubmit} />
            </React.Fragment>
        );
    }
}

//connect redux action and redux form

export default connect(
    //first arguement: function
    null,
    //second arg: object contain action creator
    { createStream }
)(StreamCreate);
