import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import API from "../axios/AxiosConfig";


const AddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await API.get(
        "/address/"
      );
      const addresses = response.data;
      // console.log("Addresses are ",(response.data))
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

        <Pressable
          onPress={() => navigation.navigate("New")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        {/* all the added adresses */}
        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable
            key={index}  
            style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                key={item?.id}
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.addressee}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                House No. {item?.house_no},
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Street No. {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.city}, {item?.province}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {item?.user}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Postal code : {item?.postal_code}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                onPress={() => navigation.navigate('New', {'addressData':item, 'operation':'UPDATE'})}
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                onPress={() => navigation.navigate('New', {'addressData':item, 'operation':'DELETE'})}
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>
                  {/* DEFAULT ADDRESS BUTTON */}
                {/* <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable> */}
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
