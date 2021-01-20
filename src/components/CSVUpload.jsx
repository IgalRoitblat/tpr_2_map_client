import React, { Component } from "react";
import { CSVReader } from "react-papaparse";
import "./csv-upload.scss";

export default class CSVUpload extends Component {
    render() {
        return (
            <CSVReader
                ref={this.props.buttonRef}
                onFileLoad={this.props.handleOnFileLoad}
                onError={this.handleOnError}
                noClick
                noDrag
                config={{ header: true }}
                onRemoveFile={this.props.handleOnRemoveFile}
            >
                {({ file }) => (
                    <aside>
                        <button
                            className="upload-btn"
                            type="button"
                            onClick={this.props.handleOpenDialog}
                        >
                            Upload File
                        </button>
                        <div className="file-name-display">
                            {file && file.name}
                        </div>
                    </aside>
                )}
            </CSVReader>
        );
    }
}
