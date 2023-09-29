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
  const navigation = useNavigation();
  

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  return (
    <View style={{flex:1}}>
        {/* <SearchBarCustom /> */}
        <SearchProduct />
        <View style={{flex:1, flexShrink:1, minHeight:200}}>
        
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

        {/* <ScrollView>
        </ScrollView> */}
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 5,
            }}
          />
        </View>
        <View style={{flex:0, flexGrow:1, padding:5, marginTop:5,marginBottom:240}}>
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