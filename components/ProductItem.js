import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AddToCart from "./AddToCart";

const ProductItem = ({ item }) => {


  const navigation = useNavigation();

  return (
    <Pressable 
      style={{ marginHorizontal: 25, marginVertical: 25 }}
      onPress={() =>
        navigation.navigate("Info", {
        item: item,}
        )}
    >
      <Image
        style={{ width: 150, height: 100, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      
      <Text numberOfLines={2} style={{textAlignVertical:'bottom', textAlign:'center', height:40, width: 150, marginTop: 5 }}>
        {item?.name}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Rs.{item?.price}</Text>
        {/* <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
        ⭐ {item?.rating?.rate} /5
        </Text> */}
      </View>
      <AddToCart item={item} />
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
