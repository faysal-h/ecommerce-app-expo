import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState,useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserType } from "../UserContext";
import API from "../axios/AxiosConfig";
import { useNavigation } from "@react-navigation/native";
import { formToJSON } from "axios";

const NewAddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("0300");
  const [house_no, setHouse_no] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Lahore");
  const [district, setDistrict] = useState("Lahore");
  const [province, setProvince] = useState("Punjab");
  const [country, setCountry] = useState("Pakistan");
  const [postal_code, setPostal_code] = useState(54000);
  const {userId,setUserId} = useContext(UserType)
  console.log('User ID in New Addres Screen is '.userId)
  const handleAddAddress = () => {
      const address = {
          addressee:name,
          addressee_phone:mobileNo,
          city:city,
          country:country,
          district:district,
          house_no:house_no,
          postal_code:postal_code,
          province:province,
          street:street,
      };
      API.post("/address/",address).then((response) => {
          Alert.alert("Success","Addresses added successfully");
          setName("");
          setHouse_no("");
          setStreet("");
          setCity("");
          setDistrict("");
          setDistrict("");
          setCountry("");
          setPostal_code("");

          setTimeout(() => {
            navigation.goBack();
          },500)
      }).catch((error) => {
          Alert.alert("Error","Failed to add address")
          console.log("Address adding failed",error.response.data)
          // console.log("Address adding failed",response)
      })
  }
  return (
    <ScrollView>
      <View style={{ height: 0, backgroundColor: "#00CED1" }} />

      <View style={{ padding: 10, paddingVertical:50 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Add a new Address
        </Text>

            {/* NAME */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Full name (First and last name)
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your Name"
          />
        </View>
            {/* MOBILE */}
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile numebr
          </Text>

          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={"gray"}
            keyboardType='numeric'
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile No"
          />
          {/* </TextInput> */}
        </View>
            {/* HOUSE */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            House Number
          </Text>

          <TextInput
            value={house_no}
            onChangeText={(text) => setHouse_no(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="House Number"
          />
        </View>
            {/* STREET */}
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Street Number
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Street Number"
          />
        </View>
            {/* CITY */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>City</Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="City"
          />
        </View>
            {/* DISTRICT */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>District</Text>
          <TextInput
            value={district}
            onChangeText={(text) => setCity(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="District"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Zipcode</Text>

          <TextInput
            value={postal_code}
            onChangeText={(text) => setPostal_code(parseInt(text))}
            placeholderTextColor={"gray"}
            keyboardType='phone-pad'
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Postal Code"
          />
        </View>

        <Pressable
        onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({});
export default NewAddressScreen;
