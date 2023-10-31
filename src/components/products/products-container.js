import React, { Component } from 'react';
import axios from 'axios';
import { FaMagnifyingGlass } from "react-icons/fa6";

import ProductsItem from './products-item';

export default class ProductsContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: 'Welcome to The Basque Shop',
      isLoading: false,
      data: [],
      searchTerm: ''
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  filterProducts = () => {
    const { data, searchTerm } = this.state;
  
    if (searchTerm.trim() === '') {
      return data;
    }
  
    return data.filter(item =>
      item.products_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  componentDidMount() {
    this.getProductsItems();
  }

  getProductsItems() {
    axios
      .get('https://the-basque-shop-backend-r-production.up.railway.app/products')
      .then(response => {
        this.setState({
          data: response.data,
          isLoading: true,
        });
        console.log(response.data);
        console.log('Productos cargados correctamente');
      })
      .catch(error => {
        console.log(error);
      });
  }

  productsItems() {
    const filteredProducts = this.filterProducts();
  
    if (!filteredProducts) {
      return null;
    }
  
    return filteredProducts.map(item => (
      <ProductsItem
        key={item.products_id}
        item={item}
        addToCart={this.props.addToCart}
      />
    ));
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
            <div>
              <div className='products-title-wrapper'>
                <div className='products-page-title'>
                  <h1>Welcome to Basque Landscape Photo Canvas Shop</h1>
                </div>
                <div className="product-search-bar">
                  <div className="product-search-icon">
                    <FaMagnifyingGlass />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={this.state.searchTerm}
                    onChange={this.handleSearchChange}
                  />
                </div>
              </div>

              <div className='products-items-wrapper'>
                {this.productsItems()}
              </div>
            </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
