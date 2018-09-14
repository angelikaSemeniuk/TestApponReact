import React from "react";

export default class TestApp extends React.Component {
    constructor(props) {
        super(props);
        this.url = 'https://content.guardianapis.com/search?api-key=64725228-5b31-4c1c-aba5-faa61edfb7be';
        this.state = {
            arrayOfArticles: [],
            error: null
        };
    }

    componentDidMount() {
        fetch(this.url)
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                this.setState({
                    arrayOfArticles: data.response.results
                });
            },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    }

    render () {
        if(this.state.error) {
            return <div>Error: {this.state.error.message}</div>
        } else {
            return (
                <div className="container">
                    <div className="header">
                        <h1>The Guardian News</h1>
                    </div>
                    <ul className="list">
                        {this.state.arrayOfArticles.map((item,index) => (
                            <li key={index}>
                                {item.webTitle}
                            </li>
                            ))}
                    </ul>
                </div>
            );
        }
    }
}