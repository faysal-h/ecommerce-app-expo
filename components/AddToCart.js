import { useMemo, useCallback } from "react";
import { Pressable, StyleSheet, View, Text} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import CustomButton from "./CustomButton";


const AddToCart = ({item}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const itemInCart = useMemo(() => cart.find((cartItem) => cartItem.id === item.id), [cart, item.id]);
    const addItemToCart = useCallback(() => {
      dispatch(addToCart(item));
    }, [dispatch, item]);

    const increaseQuantity = () => {
      dispatch(incrementQuantity(itemInCart));
    };
    const decreaseQuantity = () => {
      dispatch(decrementQuantity(itemInCart));
    };
    const handleBuyNow = () => {
      if (itemInCart) {
        // If the item is already in the cart, navigate to the Cart screen.
        navigation.navigate('Cart');
      } else {
        // If the item is not in the cart, add it to the cart and then navigate to the Cart screen.
        addItemToCart();
        navigation.navigate('Cart');
      }
    };
    return(
        <View>

            {itemInCart ? (
              <Pressable style={styles.addToCartButton}>
                  <Pressable onPress={() => decreaseQuantity()} style={styles.subButton}>
                    <AntDesign name="minus" size={24} color="black" />
                  </Pressable>


                  <Text style={styles.subQuantity}>{itemInCart?.quantity}</Text>

                  <Pressable onPress={() => increaseQuantity()} style={styles.subButton}>
                    <Feather name="plus" size={24} color="black" />
                  </Pressable>
              </Pressable>
            ) : (
              
            <CustomButton onPress={() => addItemToCart()} buttonText={'Add to Cart'} customStyle={styles.buyNowButton}/>
            )}
            <CustomButton onPress={() => handleBuyNow()} buttonText={'Buy Now'} customStyle={styles.buyNowButton}/>
        </View>
    );
  };

const styles = StyleSheet.create({
    addToCartButton: {
      flexDirection:'row',
      backgroundColor: "#FFC72C",
      // padding: 5,
      borderRadius: 3,
      justifyContent: 'space-between',
      // alignItems: "center",
      marginHorizontal: 5,
      marginVertical: 5,
      paddingVertical:10,
    },
    subButton:{flex:1,
      // backgroundColor:'red',
      alignItems:'center'},
    subQuantity:{flex:1,
      fontSize: 16, 
      marginHorizontal:10,
      // backgroundColor:'green',
      textAlign:'center'},
    buyNowButton: {
      // flexGrow:1,
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 5,
      marginVertical: 5,
      paddingVertical: 10,
    },
  });


export default AddToCart;