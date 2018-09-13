import React from "react";

export default class ListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.error("this.props.arrayOfTitels-inList", this.props.arrayOfTitels);
        const listItems = this.props.arrayOfTitels.map((item, index) => {
            return (
                <li key={index}>
                    {item.titel}
               </li>
            )
        });
        console.error("ListItems", listItems);
        return (
            <div className="container">
                <ul className="list">{listItems}</ul>
            </div>
        );
    }

}