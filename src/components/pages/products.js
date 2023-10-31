import React, { Component } from "react";
import ProductsContainer from '../products/products-container';

export default class Products extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <ProductsContainer />
            </div>
        );
    }
}