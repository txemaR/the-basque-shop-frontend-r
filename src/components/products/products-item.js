import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import CustomAlert from "../modals/custom-alert";

export default class ProductsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: '',
    };
  }

  openCustomAlert = (message) => {
    this.setState({
      showAlert: true,
      alertMessage: message,
    });
  };

  closeCustomAlert = () => {
    this.setState({
      showAlert: false,
      alertMessage: '',
    });
  };

  addToCart = () => {
    const { products_name, products_price } = this.props.item;

    axios
      .post('https://the-basque-shop-backend-r-production.up.railway.app/add-to-cart', {
        products_name,
        products_price,
      })
      .then((response) => {
        response.data.status === 'Product_added_to_cart'
        this.openCustomAlert('Product added! (You can modify the quantity in the cart)');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    const { products_id, products_name, products_description, products_blob_images, products_price } = this.props.item;
    const descriptionLines = products_description.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
    const imageUrl = `data:image/jpeg;base64,${products_blob_images}`;
    
    return(
      <div className="products-item-wrapper">
        <div className="product-img">
          <img src={imageUrl} alt="Imagen" loading="lazy" />
        </div>
        <div className="product-title">{products_name}</div>
        <div className="product-subtitle">{descriptionLines}</div>
        <div className="product-price-wrapper">
          Price: {products_price} €
        </div>
        <button className="product-add-button" onClick={this.addToCart}>
          Add to Cart
        </button>
        {this.state.showAlert && (
          <CustomAlert message={this.state.alertMessage} onClose={this.closeCustomAlert} />
        )}            
      </div>
    )
  }
}