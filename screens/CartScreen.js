import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
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
              <View>
                <Image
                  style={styles.itemImage}
                  source={{ uri: item?.image }}
                />
              </View>

              <View style={styles.itemDetails}>
                <Text numberOfLines={3} style={styles.itemTitle}>
                  {item?.title}
                </Text>
                <Text style={styles.itemPrice}>{item?.price.toFixed(2)}</Text>
                {/* <Image
                style={styles.stockImage}
                source={{
                  uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                }}
              /> */}
                <Text style={styles.stockText}>In Stock</Text>
              </View>

              {/* QUANTITY CONTROL */}
              <Pressable style={styles.quantityContainer}>
                <View style={styles.quantityButton}>
                  {item?.quantity > 1 ? (
                    <Button
                      color={'#D8D8D8'}
                      onPress={() => decreaseQuantity(item)}
                    >
                      <AntDesign name="minus" size={16} color="black" />
                    </Button>
                  ) : (
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={styles.quantityButton}
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </Pressable>
                  )}


                  <View style={styles.quantityText}>
                    <Text>{item?.quantity}</Text>
                  </View>

                  {/* <View style={styles.quantityButton}> */}
                  <Button
                    color={'#D8D8D8'}
                    onPress={() => increaseQuantity(item)}
                  >
                    <Feather name="plus" size={16} color="black" />
                  </Button>
                  {/* </View> */}
                </View>

                <Button
                  onPress={() => deleteItem(item)}
                  // style={styles.deleteButton}
                  title={'Delete'}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal: </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total.toFixed(2)}</Text>
        </View>
        <Button
          title={`Check Out`}
          onPress={() => cart.length ? navigation.navigate("Confirm"):console.log("Cart is Empty")}
          color={'#FFC72C'}
        >
          <Text style={{ fontSize: 18 }}>{cart.length?`Buy (${cart.length}) items`:"Cart is Empty"}</Text>
        </Button>
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
    width: 150,
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
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
    marginTop: 25,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    backgroundColor: '#D8D8D8',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderRadius: 3,

  },
  quantityText: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  deleteButton: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6,
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