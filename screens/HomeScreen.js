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
import SearchBarCustom from "../components/SearchBar";
import ProductList from "../components/ProductList";

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const imagesSlider = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
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

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  return (
    <View style={{flex:1}}>
        <SearchBarCustom />
        <View style={{flex:1, flexShrink:1, minHeight:200}}>
        
          {/* SLIDER BOX */}
          <SliderBox
            images={imagesSlider}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />

          {/* OFFERS BOX  */}
        {/* <ScrollView>
          <Text style={stylesOffer.heading}>
            Trending Deals of the week
          </Text>

          <View style={stylesOffer.container}>
            {deals.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate("Info", {
                    item: item,
                  })
                }
                style={stylesOffer.pressable}
              >
                <Image
                  style={stylesOffer.image}
                  source={{ uri: item?.images[0] }}
                />
              </Pressable>
            ))}
          </View>
          

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 5,
              marginTop: 15,
            }}
          />

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