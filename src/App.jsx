import React, { Component } from "react";
import CSVUpload from "./components/CSVUpload";
import DataForm from "./components/DataForm";
import "./app.scss";

export default class App extends Component {
    buttonRef = React.createRef();
    inputs = [
        {
            name: "appKey",
            type: "text",
            placeholder: "Please insert appKey here...",
            value: "",
        },
        {
            name: "secretKey",
            type: "text",
            placeholder: "Please insert secretKey here...",
            value: "",
        },
        {
            name: "email",
            type: "email",
            placeholder: "Please enter your email...",
            value: "",
        },
    ];
    state = {
        inputs: this.inputs,
        csvData: [],
        isSubmitted: false,
        isClientError: false,
        isServerError: false,
        isLoading: false,
        serverErrorMsg: "",
        clientErrorMsg: "",
        successMsg: "Success! Look out for a confirmation email!",
    };

    handleOnFileLoad = (data) => {
        this.setState({
            csvData: data.map((entry) => entry.data),
        });
    };

    handleOpenDialog = (e) => {
        if (this.buttonRef.current) {
            this.buttonRef.current.open(e);
        }
    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    inputChange = (event) => {
        const inputs = [...this.state.inputs];
        inputs.find((input) => input.name === event.target.name).value =
            event.target.value;
        this.setState({ inputs: inputs });
    };

    isFormValid() {
        let numberOfFilledInputs = this.state.inputs.filter(
            (input) => input.value !== ""
        );
        if (
            this.state.inputs.length === numberOfFilledInputs.length &&
            this.state.csvData.length !== 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    onFormSubmit = (event) => {
        this.setState({
            isSubmitted: false,
            isServerError: false,
            isClientError: false,
        });
        if (this.isFormValid()) {
            this.setState({ isLoading: true });
            fetch("https://ps-tpr2map.herokuapp.com/create-orders", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state),
            })
                .then((res) => res.json())
                .then((res) => {
                    res.status === 200
                        ? this.setState({ isSubmitted: true, isLoading: false })
                        : this.setState({
                              serverErrorMsg: res.message,
                              isServerError: true,
                              isLoading: false,
                          });
                });
        } else {
            this.setState({
                isClientError: true,
                clientErrorMsg: "One or more of the fields are missing...",
            });
        }
    };

    render() {
        const {
            successMsg,
            serverErrorMsg,
            clientErrorMsg,
            inputs,
            isSubmitted,
            isServerError,
            isClientError,
            isLoading,
        } = this.state;
        return (
            <div className="app">
                <div className="logo-contianer">
                    <img
                        className="yotpo-logo"
                        src={process.env.PUBLIC_URL + "/yotpo-logo.png"}
                        alt="yotpo-logo"
                    />
                </div>
                <DataForm onInputChange={this.inputChange} inputs={inputs} />
                <CSVUpload
                    handleOnFileLoad={this.handleOnFileLoad}
                    handleOpenDialog={this.handleOpenDialog}
                    handleOnError={this.handleOnError}
                    buttonRef={this.buttonRef}
                />
                <div className="controls-container">
                    <button
                        className="submit-btn"
                        onClick={this.onFormSubmit}
                        disabled={this.isLoading}
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
                {isSubmitted ? (
                    <p className="success-msg">{successMsg}</p>
                ) : null}
                {isServerError ? (
                    <p className="error-msg">{serverErrorMsg}</p>
                ) : null}
                {isClientError ? (
                    <p className="error-msg">{clientErrorMsg}</p>
                ) : null}
                {isLoading ? (
                    <div className="loader-container">
                        <img
                            src={process.env.PUBLIC_URL + " /loader.gif"}
                        ></img>
                    </div>
                ) : null}
            </div>
        );
    }
}
