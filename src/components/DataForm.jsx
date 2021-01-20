import React, { Component } from "react";
import "./data-form.scss";
import FormInput from "./FormInput";

class DataForm extends Component {
    render() {
        const inputs = this.props.inputs.map((input, index) => (
            <FormInput
                inputData={input}
                key={input.name}
                changeHandler={this.props.onInputChange}
            />
        ));
        return <div className="dataForm">{inputs}</div>;
    }
}
export default DataForm;
