// styles.js
import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { incementQuantity, decrementQuantity, removeFromCart } from "../redux/CartReducer";
import { useDispatch } from 'react-redux';


function QuantityControl({ item }) {
    const dispatch = useDispatch();
    const increaseQuantity = (item) => {
        dispatch(incementQuantity(item));
      };
    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item));
      };
    const deleteItem = (item) => {
        dispatch(removeFromCart(item));
      };

    return (
    <View style={styles.container}>
      {item?.quantity > 1 ? (
        <Pressable onPress={() => decreaseQuantity(item)} style={styles.button}>
          {/* <AntDesign name="minus" size={24} color="black" /> */}
          <Text style={{size:20}}>-</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => deleteItem(item)} style={styles.button}>
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      )}

      <Pressable style={styles.whiteButton}>
        <Text style={styles.text}>{item?.quantity}</Text>
      </Pressable>

      <Pressable onPress={() => increaseQuantity(item)} style={styles.button}>
        <Text>+</Text>
        {/* <Feather name="plus" size={24} color="black" /> */}
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        alignContent:'space-around',
        // paddingHorizontal: 5,
        // paddingVertical: 5,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#D8D8D8",
        padding: 5,
        borderRadius: 5,
        borderBottomLeftRadius: 6,
    },
    whiteButton: {
        backgroundColor: "white",
        paddingHorizontal: 6,
        paddingVertical: 6,
  },
  deleteButton: {
      backgroundColor: "white",
      paddingHorizontal: 8,
      paddingVertical: 10,
      borderRadius: 5,
      borderColor: "#C0C0C0",
      borderWidth: 0.6,
    },
    text: {
        color: "black",
        fontSize: 14,
    },
});

export default QuantityControl;