import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import CustomAlert from '../modals/custom-alert';

const customStyles = {
  content: {
    width: '450px',
    margin: 'auto',
    marginTop: '30px',
  },
  overlay: {
    backgroundColor: "rgba(1, 1, 1, 0.75)"
  }
};

export default class PaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      address: '',
      city: '',
      country: '',
      showAlert: false,
      alertMessage: '',
      errors: {}
    };
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };

  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  };

  handleCardNumberChange = (e) => {
    const cardNumber = e.target.value.replace(/\D/g, '').slice(0, 16);
    this.setState({ cardNumber });
  };

  handleExpirationDateChange = (e) => {
    const input = e.target.value;
    let formattedInput = input.replace(/\D/g, '');
  
    if (formattedInput.length > 2) {
      formattedInput = formattedInput.slice(0, 2) + '/' + formattedInput.slice(2);
    }
  
    if (formattedInput.length === 5) {
      const month = parseInt(formattedInput.slice(0, 2), 10);
      const year = parseInt(formattedInput.slice(3, 5), 10);
      if (month < 1 || month > 12) {
        formattedInput = '';
      } else if (year < 23 || year > 99) {
        formattedInput = formattedInput.slice(0, 3);
      }
    }
  
    this.setState({ expirationDate: formattedInput });
  };
  
  handleCvvChange = (e) => {
    const cvv = e.target.value.replace(/\D/g, '').slice(0, 3);
    this.setState({ cvv });
  };

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };

  handleCityChange = (e) => {
    this.setState({ city: e.target.value });
  };

  handleCountryChange = (e) => {
    this.setState({ country: e.target.value });
  };

  generateRandomOrderNumber() {
    const orderNumber = Math.floor(Math.random() * 90000) + 10000;
    return orderNumber;
  }

  handlePayNowClick = () => {
    const {
      firstName,
      lastName,
      cardNumber,
      expirationDate,
      cvv,
      address,
      city,
      country,
    } = this.state;

    const errors = {};
    if (!firstName || !lastName || !cardNumber || !expirationDate || !cvv || !address || !city || !country) {
        alert ('You must fill out all fields before proceeding to payment.');
    } else if (cardNumber.length !== 16) {
        alert ('The card number must have 16 digits.');
    } else if (expirationDate.length !== 5) {
      alert ('The date is incorrect.');
    } else if (cvv.length !== 3) {
      alert ('CVV number must have 3 digits.');
    } else {
      // Procesar el pago si no hay campos vacíos
      const orderNumber = this.generateRandomOrderNumber();
      const message = `Order completed with order number ${orderNumber}.`;

      this.setState({ showAlert: true, alertMessage: message });
    }
  };
  
  handleCloseAlert = () => {
    this.setState({ showAlert: false, alertMessage: '' });
    this.props.clearCart();
    this.props.onRequestClose();
  };

  handleCloseModal = () => {
    axios.delete('https://the-basque-shop-backend-r-production.up.railway.app/cart-items')
      .then(() => {
        this.props.clearCart();
        this.props.onRequestClose();
      })
      .catch((error) => {
        console.error('Error al eliminar elementos del carrito:', error);
      });
  };

  render() {
    const { isOpen, onRequestClose, totalPrice } = this.props;
    const {
      firstName,
      lastName,
      cardNumber,
      expirationDate,
      cvv,
      address,
      city,
      country
    } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.handleCloseModal}
        style={customStyles}
        contentLabel="Payment Modal"
        className="payment-modal"
      >
        <h3 className="modal-heading">Payment Details</h3>
        <div className='name-address'>
          <div className="field-group">
            <div className="field">
              <label htmlFor="first-name" className="modal-label">
                First Name:
              </label>
              <input
                type="text"
                placeholder="Your first name"
                id="first-name"
                value={firstName}
                onChange={this.handleFirstNameChange}
                className="modal-input"
              />
            </div>

            <div className="field">
              <label htmlFor="last-name" className="modal-label">
                Last Name:
              </label>
              <input
                type="text"
                placeholder="Your last name"
                id="last-name"
                value={lastName}
                onChange={this.handleLastNameChange}
                className="modal-input"
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="address" className="modal-label">
                Address:
              </label>
              <input
                type="text"
                placeholder="Your address"
                id="address"
                value={address}
                onChange={this.handleAddressChange}
                className="modal-input"
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="city" className="modal-label">
                City:
              </label>
              <input
                type="text"
                placeholder="Your city"
                id="city"
                value={city}
                onChange={this.handleCityChange}
                className="modal-input"
              />
            </div>

            <div className="field">
              <label htmlFor="country" className="modal-label">
                Country:
              </label>
              <input
                type="text"
                placeholder="Your country"
                id="country"
                value={country}
                onChange={this.handleCountryChange}
                className="modal-input"
              />
            </div>
          </div>
        </div>

        <div className='card-data'>
          <div className="field-group">
            <div className="field">
              <label htmlFor="card-number" className="modal-label">
                Card Number:
              </label>
              <input
                type="text"
                placeholder="0000000000000000"
                id="card-number"
                value={cardNumber}
                onChange={this.handleCardNumberChange}
                className="modal-input"
                maxLength="16"
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="expiration-date" className="modal-label">
                Expiration Date (mm/yy):
              </label>
              <input
                type="text"
                placeholder="mm/yy"
                id="expiration-date"
                value={expirationDate}
                onChange={this.handleExpirationDateChange}
                className="modal-input"
                maxLength="5"
              />
            </div>

            <div className="field">
              <label htmlFor="cvv" className="modal-label">
                CVV:
              </label>
              <input
                type="text"
                placeholder="000"
                id="cvv"
                value={cvv}
                onChange={this.handleCvvChange}
                className="modal-input"
                maxLength="3"
              />
            </div>
          </div>
        </div>

        <div className="total-amount">
          <p className="modal-paragraph">Total Amount: {totalPrice.toFixed(2)} €</p>
        </div>
        <button className="pay-now-button" onClick={this.handlePayNowClick}>Pay Now</button>
        <button className="close-modal-button" onClick={onRequestClose}>Cancel</button>
        {this.state.showAlert && (
        <CustomAlert message={this.state.alertMessage} onClose={this.handleCloseAlert} />
        )}      
      </Modal>
    );
  }
}