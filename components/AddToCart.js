import { useMemo, useCallback } from "react";
import { Pressable, StyleSheet, View, Text} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";


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
              <View style={styles.addToCartButton}>
                  <Pressable onPress={() => decreaseQuantity()} style={styles.subButton}>
                    <Text style={{ fontSize: 16}}>-</Text>
                  </Pressable>


                  <Text style={styles.subQuantity}>{itemInCart?.quantity}</Text>

                  <Pressable onPress={() => increaseQuantity()} style={styles.subButton}>
                    <Text style={{ fontSize: 16 }}>+</Text>
                  </Pressable>
              </View>
            ) : (
            
            <Pressable
              onPress={() => addItemToCart()}
              style={styles.buyNowButton}
              >
              <Text>Add to Cart</Text>
            </Pressable>  
            )}
          

            <Pressable 
              style={styles.buyNowButton}
              onPress={() => handleBuyNow()}
            >
                <Text>Buy Now</Text>
            </Pressable>
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
    subButton:{flex:2,
      // backgroundColor:'red',
      alignItems:'center'},
    subQuantity:{flex:1,
      fontSize: 16, 
      marginHorizontal:10,
      // backgroundColor:'green',
      textAlign:'center'},
    buyNowButton: {
      backgroundColor: "#FFAC1C",
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 5,
      marginVertical: 5,
      paddingVertical: 10,
    },
  });


export default AddToCart;