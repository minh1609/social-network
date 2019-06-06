import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends Component {
    renderError(meta) {
        if (meta.touched && meta.error) {
            return (
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            );
        }
    }

    // Field pass input and meta object to component wrap inside it
    renderInput = formProps => {
        //spread object ..., every attribute of formProps.input become attribute of <input>
        return (
            <div className="field">
                <label>{formProps.label}</label>
                <input {...formProps.input} autoCorrect="off" />
                {/* meta hold the error information */}
                {this.renderError(formProps.meta)}
            </div>
        );
    };

    // formValue contain value from Field
    //{title:"  ", description: "  "}
    onSubmit = formValue => {
        this.props.createStream(formValue);
    };

    render() {
        return (
            // Field will pass label props to component props(it is renderInput is this case)
            //handle submit is a props created by redux form

            <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter Discription"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValue => {
    const error = {};
    if (!formValue.title) {
        error.title = "you must enter title";
    } else if (!formValue.description) {
        error.title = "you must enter dis";
    }

    return error;
};

const mapStatetoProps = () => {};

//connect redux form only
// export default reduxForm({
//     //form and name of form
//     form: "streamCreate",
//     validate
// })(StreamCreate);

//connect redux action and redux form

const formWrapped = reduxForm({
    form: "streamCreate",
    validate
})(StreamCreate);

export default connect(
    //first arguement: function
    mapStatetoProps,
    //second arg: object contain action creator
    { createStream }
)(formWrapped);
