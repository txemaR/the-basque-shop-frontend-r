import React from 'react';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <p>{message}</p>
      <button className="modal-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default CustomAlert;