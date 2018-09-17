import React from "react";

export default class PaginationComponent extends React.Component  {

    handlePreviosPage(currentPage, event) {
        const page = currentPage - 1;
        const url = "http://content.guardianapis.com/search?page=" + page + "&api-key=64725228-5b31-4c1c-aba5-faa61edfb7be"
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    this.props.updateArrayOfArticles(data.response.results);
                    this.props.updateCurrentPage(data.response.currentPage);
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )

    }

    handleNextPage (currentPage, event) {
        const page = currentPage + 1;
        const url = "http://content.guardianapis.com/search?page=" + page + "&api-key=64725228-5b31-4c1c-aba5-faa61edfb7be"
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    this.props.updateArrayOfArticles(data.response.results);
                    this.props.updateCurrentPage(data.response.currentPage);
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    }

    render () {
        let previousPageButton = <button className="previousPage" disabled>Previous Page</button>;
        if(this.props.currentPage !== 1) {
            previousPageButton =  <button className="previousPage" onClick={this.handlePreviosPage.bind(this, this.props.currentPage)}>Previous Page</button>;
        }
        return (
            <div className="pagination">
                {previousPageButton}
                <span className="currentPage" dangerouslySetInnerHTML={{__html: this.props.currentPage}}></span>
                <p className="numberOfPages" dangerouslySetInnerHTML={{__html: ' of ' + this.props.totalPages}}></p>
                <button className="nextPage" onClick={this.handleNextPage.bind(this, this.props.currentPage)}>Next Page</button>
            </div>
        );
    }
}