import React from 'react';
import ShoppingContainer from '../shopping-cart/shopping-container';

export default function(props) {
  return (
    <div>
      <ShoppingContainer loggedInStatus={props.loggedInStatus} />
    </div>
  );
}
