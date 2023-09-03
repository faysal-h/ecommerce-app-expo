import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

import { Badge } from '@rneui/themed';

const CartBadge = () => {
    const cart = useSelector((state) => state.cart.cart);
    console.log("Cart in badge is ", cart.length)
    let itemCount = 0;
    cart.length ? (itemCount = cart.length) : (itemCount = 0)
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
