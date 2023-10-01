import { StyleSheet, Text, View, Pressable, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AddToCart from "./AddToCart";
import { PRIMARY_COLOR } from "../constants/constant";

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;
// item size
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;


const ProductItem = ({ item }) => {


  const navigation = useNavigation();
  

  return (
    <Pressable 
      style={styles.item}
      onPress={() =>
        navigation.navigate("Info", {
        item: item,}
        )}
    >
      <Image
        style={{marginTop:5, width: 125, height: 125, resizeMode: 'center',alignSelf:'center' }}
        source={{ uri: item?.image }}
      />
      
      <Text numberOfLines={2} style={{alignSelf:'center', textAlignVertical:'bottom', textAlign:'center', height:40, width: 150, marginTop: 5 }}>
        {item?.name}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <Text style={styles.itemPrice}>Rs.{item?.price}</Text>
        {/* <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
        ⭐ {item?.rating?.rate} /5
        </Text> */}
      </View>
      <AddToCart item={item} />
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  item: {
    // elevation:1,
    borderColor:PRIMARY_COLOR,
    borderWidth:1,
    borderRadius:3,
    // borderColor:'rsed',
    marginHorizontal:0,
    marginVertical:5,
  },
  itemImage: {
    width: (SCREEN_WIDTH),
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
    margin: PRODUCT_ITEM_OFFSET * 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: PRODUCT_ITEM_OFFSET * 2,
    borderWidth: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.15)',
    margin: PRODUCT_ITEM_OFFSET * 2,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  itemPriceClearance: {
    fontWeight: 'bold',
    color: 'red',
  },
});
