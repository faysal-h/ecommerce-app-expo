import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import SearchProduct from "../components/SearchProduct";
import { IMAGESLIDER } from "../constants/constant";

const HomeScreen = () => {

  return (
    <View style={{flexGrow:1,justifyContent:'space-between'}}>
        {/* <SearchBarCustom /> */}
        <SearchProduct />
        <View style={{flex:0, flexGrow:0}}>
        
          {/* SLIDER BOX */}
          <SliderBox
            images={IMAGESLIDER}
            // autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
            // autoplayInterval={500}
          />

        {/* BORDER */}
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 5,
            }}
          />
        </View>
        <View style={{flex:1, flexGrow:1,}}>
          <ProductList />
        </View>
    </View>
  );
};

export default HomeScreen;

const stylesOffer = StyleSheet.create({
  heading: { 
    padding: 10, 
    fontSize: 18, 
    fontWeight: "bold" },
  container: {
    flexDirection: "row",
    justifyContent:'space-evenly',
    alignItems: 'center',
    flexWrap: "wrap",
  },
  pressable: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

const styles = StyleSheet.create({})