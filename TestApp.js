import React from "react";
import LiComponent from "./LiComponent";
import PaginationComponent from "./PaginationComponent";

export default class TestApp extends React.Component {
    constructor(props) {
        super(props);
        this.url = 'https://content.guardianapis.com/search?api-key=64725228-5b31-4c1c-aba5-faa61edfb7be';
        this.state = {
            arrayOfArticles: [],
            currentPage: null,
            error: null
        };
        this.totalPages = 0;
        this.updateArrayOfArticles = this.updateArrayOfArticles.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
    }

    componentDidMount() {
        fetch(this.url)
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    this.totalPages = data.response.total;
                    this.updateArrayOfArticles(data.response.results);
                    this.updateCurrentPage(data.response.currentPage);
            },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    }

    updateArrayOfArticles(arrayOfArticles) {
        this.setState({arrayOfArticles: arrayOfArticles});
    }

    updateCurrentPage(currentPage) {
        this.setState({currentPage: currentPage});
    }

    handleRefreshClick () {
        this.componentDidMount();
    }

    render () {
        if(this.state.error) {
            return <div>Error: {this.state.error.message}</div>
        } else {
            return (
                <div>
                    <div className="header">
                        <h1>The Guardian News</h1>
                        <button onClick={this.handleRefreshClick.bind(this)}>Refresh</button>
                    </div>
                    <div>
                        <ul className="list">
                            { this.state.arrayOfArticles.map((item) => (
                                <LiComponent
                                    item={item}
                                    arrayOfArticles={this.state.arrayOfArticles}
                                />
                            ))}
                        </ul>
                    </div>
                        <PaginationComponent
                            arrayOfArticles={this.state.arrayOfArticles}
                            currentPage={this.state.currentPage}
                            totalPages={this.totalPages}
                            updateArrayOfArticles={this.updateArrayOfArticles}
                            updateCurrentPage={this.updateCurrentPage}
                        />
                </div>
            );
        }
    }
}