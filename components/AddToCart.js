import { useState, useEffect, useMemo, useCallback } from "react";
import { Pressable, StyleSheet, View, Text} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";


const AddToCart = ({item}) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const itemInCart = useMemo(() => cart.find((cartItem) => cartItem.id === item.id), [cart, item.id]);
    const addItemToCart = useCallback(() => {
      dispatch(addToCart(item));
    }, [dispatch, item]);
    return(
        <View>
            <Pressable
                onPress={() => addItemToCart()}
                style={styles.addToCartButton}
            >
                {itemInCart ? (
                <Text>Quantity: {itemInCart?.quantity}</Text>
                ) : (
                <Text>Add to Cart</Text>
                 )
                }
                {/* {addedToCart ? (
                <View>
                    <Text>Added to Cart</Text>
                </View>
                ) : (
                <Text>Add to Cart</Text>
                )} */}
            </Pressable>

            <Pressable style={styles.buyNowButton}>
                <Text>Buy Now</Text>
            </Pressable>
        </View>
    );
  };

const styles = StyleSheet.create({
    addToCartButton: {
      backgroundColor: "#FFC72C",
      padding: 10,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
      marginVertical: 10,
    },
    buyNowButton: {
      backgroundColor: "#FFAC1C",
      padding: 10,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
      marginVertical: 10,
    },
  });

export default AddToCart;