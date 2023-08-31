import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Badge } from '@rneui/themed';

const CartBadge = () => {
    const cart = useSelector((state) => state.cart.cart);
    let itemCount = 0;
    cart[0] ? (itemCount = cart[0].quantity) : (itemCount = 0)

    console.log("Quantity in Cart:", itemCount);
  return (
    <>
        {itemCount > 0 && (
                <Badge 
                  value={itemCount}
                  status="success"
                  containerStyle={{ position: 'absolute', top: -6, right: -6 }}  
                />
        )
        }
    </>
  );
};


const styles = StyleSheet.create({});

export default CartBadge;
