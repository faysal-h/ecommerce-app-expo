import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

import { Badge } from '@rneui/themed';

const CartBadge = () => {
  const cart = useSelector((state) => state.cart.cart) || [];

  // Calculate the sum of the 'quantity' attribute for all items in the cart.
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    // cart.length ? (itemCount = cart.length) : (itemCount = 0)
  return itemCount > 0 ? (
      <Badge 
        value={itemCount}
        status="success"
        containerStyle={{ position: 'absolute', top: -6, right: -6 }}  
      />
    ) : null;
  };

const styles = StyleSheet.create({});

export default CartBadge;
