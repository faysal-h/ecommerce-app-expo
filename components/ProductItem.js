import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import AddToCart from "./AddToCart";

const ProductItem = ({ item }) => {
  console.log(typeof(item))
  console.log(item)
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable 
      style={{ marginHorizontal: 25, marginVertical: 25 }}
      onPress={() =>
        navigation.navigate("Info", {
        item: item,}
        )}
    >
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Rs.{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
        ⭐ {item?.rating?.rate} /5
        </Text>
      </View>
      <AddToCart item={item} />
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
