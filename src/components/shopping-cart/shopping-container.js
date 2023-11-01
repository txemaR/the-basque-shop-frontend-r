import React, { Component } from 'react';
import axios from 'axios';
import PaymentModal from '../payment/payment-modal';

import { FaTrashCan, FaPlus, FaMinus } from "react-icons/fa6";

export default class ShoppingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      showModal: false,
      showCustomAlert: false
    };
    console.log("loggedInStatus in ShoppingContainer:", this.props.loggedInStatus);
  }

  toggleModal = () => {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      this.setState({ showModal: !this.state.showModal });
    } else {
      alert("To access payment you must log in");
    }
  };

  componentDidMount() {
    // Realizar una solicitud al servidor para obtener elementos del carrito
    axios.get('https://the-basque-shop-backend-r-production.up.railway.app/cart-items')
      .then((response) => {
        this.setState({ cartItems: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener elementos del carrito:', error);
      });
  }

  // Función para eliminar un elemento del carrito
  removeFromCart = (cartItemId) => {
    axios.delete(`https://the-basque-shop-backend-r-production.up.railway.app/cart-items/${cartItemId}`)
      .then(() => {
        const updatedCartItems = this.state.cartItems.filter(item => item.cart_id !== cartItemId);
        this.setState({ cartItems: updatedCartItems });
      })
      .catch((error) => {
        console.error('Error al eliminar el elemento del carrito:', error);
      });
  };

  // Función para aumentar la cantidad en el carrito
  increaseQuantity = (cartItemId) => {
    axios.put(`https://the-basque-shop-backend-r-production.up.railway.app/cart-items/increase-quantity/${cartItemId}`)
      .then(() => {
        const updatedCartItems = [...this.state.cartItems];
        const itemToUpdate = updatedCartItems.find(item => item.cart_id === cartItemId);
        itemToUpdate.cart_quantity += 1;
        this.setState({ cartItems: updatedCartItems });
      })
      .catch((error) => {
        console.error('Error al aumentar la cantidad del elemento del carrito:', error);
      });
  };

  // Función para disminuir la cantidad en el carrito
  decreaseQuantity = (cartItemId) => {
    axios.put(`https://the-basque-shop-backend-r-production.up.railway.app/cart-items/decrease-quantity/${cartItemId}`)
      .then(() => {
        // Actualizar el estado para reflejar el cambio
        const updatedCartItems = [...this.state.cartItems];
        const itemToUpdate = updatedCartItems.find(item => item.cart_id === cartItemId);
        if (itemToUpdate.cart_quantity > 1) {
          itemToUpdate.cart_quantity -= 1;
          this.setState({ cartItems: updatedCartItems });
        }
      })
      .catch((error) => {
        console.error('Error al disminuir la cantidad del elemento del carrito:', error);
      });
  };

  calculateTotalPrice() {
    return this.state.cartItems.reduce((total, item) => {
      return total + item.cart_product_price * item.cart_quantity;
    }, 0);
  }

  // Función para eliminar todos los elementos del carrito
  clearCartItems = () => {
   const { cartItems } = this.state;
   const cartItemIds = cartItems.map(item => item.cart_id);
   cartItemIds.forEach(cartItemId => {
     axios.delete(`https://the-basque-shop-backend-r-production.up.railway.app/cart-items/${cartItemId}`)
       .then(() => {
         const updatedCartItems = this.state.cartItems.filter(item => item.cart_id !== cartItemId);
         this.setState({ cartItems: updatedCartItems });
       })
       .catch((error) => {
         console.error('Error al eliminar el elemento del carrito:', error);
       });
   });
  };
  

  render() {
    const totalPrice = this.calculateTotalPrice();

    return (
      <div className="shopping-container">
        <h2>Shopping Cart</h2>
        <ul>
          {this.state.cartItems.map((item) => (
            <li key={item.cart_id}>
              <span>{item.cart_product_name} - {item.cart_product_price} €</span>
              <span>Quantity: {item.cart_quantity}</span>
              <span>Total Price: {(item.cart_product_price * item.cart_quantity).toFixed(2)} €</span>
              <button onClick={() => this.increaseQuantity(item.cart_id)}>
                <FaPlus />
              </button>
              <button onClick={() => this.decreaseQuantity(item.cart_id)}>
                <FaMinus />
              </button>
              <button onClick={() => this.removeFromCart(item.cart_id)}>
                <FaTrashCan />
              </button>

            </li>
          ))}
        </ul>
        <div className="total-price">
          <span>Total Shopping Cart Price:</span>
          <span className="total-price-value">{totalPrice.toFixed(2)} €</span>
          <button className="pay-button" onClick={this.toggleModal}>Payment</button>
        </div>

        {this.state.showModal && (
          <PaymentModal
            isOpen={this.state.showModal}
            onRequestClose={() => {
              this.setState({ showModal: false });
            }}
            clearCart={this.clearCartItems}
            totalPrice={totalPrice}
          />
        )}
        
      </div>
    );
  }
}
