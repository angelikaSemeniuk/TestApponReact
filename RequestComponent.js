import React from "react";
import axios from "axios";

export default class RequestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.loadNews = this.loadNews.bind(this);
        this.getItems = this.getItems.bind(this);
    }
    loadNews () {
        axios.get('https://content.guardianapis.com/search?api-key=64725228-5b31-4c1c-aba5-faa61edfb7be')
            .then (response => {
                this.getItems(response)
            })
    }

    getItems(response) {
        response.data.response.results.map((item) => {
            this.props.arrayOfTitels.push({titel: item.webTitle});
        });
        this.props.updateArrayOfTitels(this.props.arrayOfTitels);
        console.log("arrayOfTitels", this.props.arrayOfTitels);
    }

    render () {
        return (
            <div className="header">
                <button onClick={this.loadNews}>Reload</button>
            </div>
        );
    }
}