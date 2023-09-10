import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import React ,{useState} from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import AddToCart from "../components/AddToCart";
import SearchBarCustom from "../components/SearchBar";
const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 105;
  const cart = useSelector((state) => state.cart.cart);
  return (
    <View>
      {/* SEARCH BAR */}
      <SearchBarCustom />
      <ScrollView
        // style={{ marginTop: 0, flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >{route.params.item.images?
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params.item.images?.map((item, index) => (
            <ImageBackground
              style={{ width, height, marginTop: 25, resizeMode: "contain" }}
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
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#C60C30",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
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
                    20% off
                  </Text>
                </View>

                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        :
        <ImageBackground
        style={{ width, height, marginTop: 25, resizeMode: "contain" }}
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
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#C60C30",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
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

          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color="black"
            />
          </View>
        </View>

        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "auto",
            marginLeft: 20,
            marginBottom: 20,
          }}
        >
          <AntDesign name="hearto" size={24} color="black" />
        </View>
      </ImageBackground>
        }
        {/* TITLE */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {route?.params?.item.title}
          </Text>

          {/* PRICE */}
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
            Rs.{route?.params?.item.price}
          </Text>
        </View>

        {/* BORDER */}
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        {/* COLOR */}
        {/* <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
          <Text>Color: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.color}
          </Text>
        </View> */}

        {/* SIZE */}
        {/* <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
          <Text>Size: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.item.size}
          </Text>
        </View> */}

        {/* BORDER */}
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        {/* PRICE */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
            Total : Rs.{route.params.item.price}
          </Text>

          <Text style={{ color: "red" }}>
            FREE delivery Tomorrow.
          </Text>

          {/* LOCATION */}
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
          </View>
        </View>

        <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
          IN Stock
        </Text>
      </ScrollView>
      <AddToCart item={route?.params?.item} />
    </View>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
