import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AddToCart from "../components/AddToCart";
import SearchProduct from "../components/SearchProduct";


const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 105;
  const cart = useSelector((state) => state.cart.cart);
  const price = parseInt(route.params.item?.price);
  const discount = parseInt(route.params.item?.discount);
  const originalPrice = (price * discount / 100) + price;
  return (
    <View style={{flex:1,justifyContent:'flex-start'}}>
      {/* SEARCH BAR */}
      <SearchProduct />

      <ScrollView style={{flexGrow:1}}
        // style={{ marginTop: 0, flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >{route.params.item.images?
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params.item.images?.map((item, index) => (
            <ImageBackground
              style={{ width, height, marginTop: 10, resizeMode: "contain" }}
              source={{ uri: item }}
              key={index}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                            <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    {route.params.item.discount}% off
                  </Text>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        :
        <ImageBackground
        style={{ width, height, marginTop: 5, resizeMode: "contain" }}
        source={{ uri: route.params.item.image }}
      >
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
        </View>

        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#C60C30",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "auto",
            marginLeft: 20,
            marginBottom: 20,
          }}
        >
                      <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              {route.params.item.discount}% off
            </Text>
        </View>
      </ImageBackground>
        }
        {/* TITLE */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "500", fontWeight:'bold',paddingVertical:10 }}>
            {route?.params?.item.name}
          </Text>

        {/* BORDER */}
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
        
        {/* DESCRIPTION */}
        <Text style={{ fontSize: 15, fontWeight: "500",paddingVertical:10 }}>
          {route?.params?.item.description}
        </Text>

        {/* BORDER */}
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

          {/* PRICE */}
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
            Rs.{price}
          </Text>

        {/* PRICE WITHOUT DISOUNT */}
          <Text style={{ fontSize: 14, fontWeight: "bold", color:'gray', textDecorationLine:'line-through' }}>
            {originalPrice == price ? "" : "Rs. "+originalPrice }
            
          </Text>

          <Text style={{ color: "red", marginTop:10}}>
            Delivery in Three days.
          </Text>

          {/* LOCATION
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="location" size={24} color="black" />

            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Deliver To LAHORE 54000
            </Text>
          </View> */}
        </View>

      </ScrollView>
      <View style={{flexGrow:0}}>
        <AddToCart item={route?.params?.item} />
      </View>
    </View>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
