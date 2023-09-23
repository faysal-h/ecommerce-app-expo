import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import SearchBarCustom from "../components/SearchBar";
import { Button } from "@rneui/themed";
import API from "../axios/AxiosConfig";
import CustomButton from "../components/CustomButton";


const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const [deliveryCharges, setDeliveryCharges] = useState(0)
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const navigation = useNavigation();
  const addItemsToCart = async () => {
    for (const cartItem of cart) {
      const { id, name, quantity } = cartItem;
      console.log('Detail of product is ', name, id)
      try {
        // Send a request to the "cart" API to add the item
        const response = await API.post("/cart/", {
          product_id : id,
          quantity
          })
        if(response.status == 201){
            return true} else {return false}
      }catch(error){
        Alert.alert("Proudct sold out. Remove from cart", name)
      return false
      }
    }

  }
  const createCart = async () => {
    try {
      // Clear the cart
      const responseClearCart = await API.delete("/clear-cart/");
      console.log('Clear Cart Success ', responseClearCart.status);
  
      if (responseClearCart.status === 200) {
        // Clearing the cart succeeded, now add items to the cart
        const itemsAddedToCart = await addItemsToCart();
  
        if (itemsAddedToCart) {
          // Fetch the user's address
          const response = await API.get("/address/");
  
          if (response.status === 200) {
            navigation.navigate("Confirm");
          } else {
            console.log("Error fetching ADDRESS in Order Confirmation", response);
          }
        } else {
          console.log('Adding items to the cart failed.');
        }
      } else {
        console.log('Clearing the cart failed.');
      }
    } catch (error) {
      console.error("Error in createCart:", error);
    }
  };
  return (
    <View style={{ flex: 1, marginHorizontal: 0, flexDirection: 'column' }}>
      <SearchBarCustom />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5, marginHorizontal: 5, backgroundColor: 'white', flexGrow: 1 }}
      >
        {cart?.map((item, index) => (
          <View style={styles.container} key={index}>
            <Pressable style={styles.itemRow}>
              <View style={{marginHorizontal:5}}>
                <Image
                  style={styles.itemImage}
                  source={{ uri: item?.image }}
                />
              </View>

              <View style={styles.itemDetails}>
                <Text numberOfLines={3} style={styles.itemTitle}>
                  {item?.name}
                </Text>
                <Text style={styles.itemPrice}>Rs. {parseInt(item?.price)}</Text>
                <Text style={styles.itemDiscountText}>
                  {item?.discount ? "Rs. " +((item?.price * parseInt(item?.discount, 10) / 100) + parseInt(item?.price, 10)) : ""}
                </Text>
                {/* <Image
                style={styles.stockImage}
                source={{
                  uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                }}
              /> */}
                {/* <Text style={styles.stockText}>In Stock</Text> */}
              </View>

              {/* QUANTITY CONTROL */}
              <Pressable style={styles.quantityContainer}>
                <View style={styles.quantityButton}>
                  {item?.quantity > 1 ? (
                    <Button
                      color={'#008E97'}
                      onPress={() => decreaseQuantity(item)}
                    >
                      <AntDesign name="minus" size={24} color="black" />
                    </Button>
                  ) 
                  : (
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={styles.quantityButton}
                    >
                      <AntDesign name="delete" size={16} color="black" />
                    </Pressable>
                  )
                  }


                  <View style={styles.quantityText}>
                    <Text>{item?.quantity}</Text>
                  </View>

                  {/* <View style={styles.quantityButton}> */}
                  <Button
                    color={'#008E97'}
                    onPress={() => increaseQuantity(item)}
                  >
                    <Feather name="plus" size={24} color="black" />
                  </Button>
                  {/* </View> */}
                </View>

                <CustomButton
                  onPress={() => deleteItem(item)}
                  customStyle={styles.deleteButton}
                  buttonText={'Delete from Cart'}
                />

              </Pressable>
            </Pressable>

            {/* <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 15,
            }}
          >
          </Pressable> */}

            {/* BORDER */}
            <View style={styles.divider} />

          </View>
        ))}
      </ScrollView>


      <View style={styles.subTotal}>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total?.toFixed(2)}</Text>
        </View>
        <CustomButton
          onPress={() => createCart()}
          customStyle={{paddingHorizontal:40, borderRadius:3, backgroundColor:'#008E97',paddingVertical:15}}
          buttonText={cart.length?`Buy ${cart.length} items`:"Cart is Empty"}
        />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  buttonConfirm: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 0,
  },
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderBottomColor: '#F0F0F0',
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  itemRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  itemDetails: {
    justifyContent:'center',
    marginLeft:0,
    marginTop: 0,
  },
  itemTitle: {
    // backgroundColor:'yellow',
    width: 100,
    marginLeft:0,
    // marginTop: 20,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 0,
  },
  itemDiscountText: {
    fontSize: 14,
    // fontWeight: 'bold',
    color:'gray',
    textDecorationLine: 'line-through'
  },
  stockImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  stockText: {
    color: 'green',
  },
  quantityContainer: {
    marginHorizontal:0,
    paddingVertical:10,
    marginTop: 15,
    marginRight:10,
    marginBottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    backgroundColor: '#008E97',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 3,

  },
  quantityText: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  deleteButton: {
    backgroundColor: 'darkred',
    // paddingHorizontal: 8,
    // paddingVertical: 10,
    borderRadius: 3,
    borderColor: '#C0C0C0',
    borderWidth: 0.9,
  },
  divider: {
    height: 1,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 16,
  },
  subTotal: {
    padding: 10,
    flexDirection: "row",
    alignItems: 'center', 
    justifyContent: 'space-between'
  }
});