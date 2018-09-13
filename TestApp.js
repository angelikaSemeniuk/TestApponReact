import React from "react";
import RequestComponent from "./RequestComponent";
import ListComponent from "./ListComponent";

export default class TestApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {arrayOfTitels: []}
        this.updateArrayOfTitels =  this.updateArrayOfTitels.bind(this);
    }

    updateArrayOfTitels (arrayOfTitels) {
        this.setState ({arrayOfTitels: arrayOfTitels});
    }

    render () {
        return (
            <div>
                <div className="header">
                    <h1>The Guardian News</h1>
                </div>
                <RequestComponent
                    arrayOfTitels={this.state.arrayOfTitels}
                    updateArrayOfTitels={this.updateArrayOfTitels}
                />
                <ListComponent arrayOfTitels={this.state.arrayOfTitels}/>
            </div>
        );
    }
}