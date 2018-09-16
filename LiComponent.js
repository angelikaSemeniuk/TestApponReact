import React from "react";

export default class LiComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accordionBodyShown: false,
            articleInfo: "",
            webUrl: null
        };
        this.updateArticleInfo = this.updateArticleInfo.bind(this);
    }

    updateArticleInfo (articleInfo) {
        this.setState({
            articleInfo: articleInfo
        });
    }

    openAccordionBody (item, event) {
        const currentElement = event.currentTarget;
        console.error("currentElement", currentElement);
        const url = item.apiUrl + "?show-blocks=body&api-key=64725228-5b31-4c1c-aba5-faa61edfb7be";
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    this.setState({articleInfo: data.response.content.blocks.body[0].elements[0].textTypeData.html});
                    this.setState({webUrl: data.response.content.webUrl});
                    this.showAccordionInfo(currentElement);
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    }

    showAccordionInfo (currentElement) {
        const activeLi = currentElement.getAttribute("aria-label");
        const activeHeader = currentElement.querySelector(".accordion-header");

        if(activeLi === "false") {
            activeHeader.style.background = "lightskyblue";
            activeHeader.style.border = "1px solid black";
            this.setState({accordionBodyShown: true});
        } else {
            activeHeader.style.background = "none";
            activeHeader.style.border = "none";
            this.setState({accordionBodyShown: false});
        }
    }


    render () {
            return (
                <div>
                    <li key={this.props.item.toString()} aria-label={this.state.accordionBodyShown} onClick={this.openAccordionBody.bind(this, this.props.item)}>
                        <div className="accordion-header">{this.props.item.webTitle}</div>
                        {this.state.accordionBodyShown &&
                            <div className="panel">
                                <p dangerouslySetInnerHTML={{__html: this.state.articleInfo}}></p>
                                <a href={this.state.webUrl}>Read full information</a>
                            </div>
                        }
                    </li>
                </div>
            );
    }
}