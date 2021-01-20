import React, { Component } from "react";
import "./form-input.scss";

class FormInput extends Component {
    render() {
        const { inputData } = this.props;
        return (
            <input
                name={inputData.name}
                type={inputData.type}
                placeholder={inputData.placeholder}
                value={inputData.value}
                key={inputData.key}
                onChange={this.props.changeHandler}
            ></input>
        );
    }
}
export default FormInput;
