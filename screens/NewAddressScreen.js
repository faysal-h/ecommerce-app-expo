import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import API from "../axios/AxiosConfig";
import { Button } from "@rneui/themed";
import CustomButton from "../components/CustomButton";

const NewAddressScreen = ({route}) => {
  const navigation = useNavigation();
  // const route = useRoute();
  const { params } = route;
  const operation = route.params?.operation;
  console.log('Route params are ', params?.addressData?.postal_code)
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("0300");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Lahore");
  const [district, setDistrict] = useState("Lahore");
  const [province, setProvince] = useState("Punjab");
  const [country, setCountry] = useState("Pakistan");
  const [postalCode, setPostalCode] = useState(54000);
  const clearFormFields = () => {
    setName('');
    setMobileNo('0300');
    setHouseNo('');
    setStreet('');
    setCity('Lahore');
    setDistrict('');
    setProvince('Punjab');
    setCountry('Pakistan');
    setPostalCode('54000');
  };

  useEffect(() => {
    // Check the route.params.operation and update the form accordingly
    const operation = route.params?.operation;

    if (operation === 'UPDATE' || operation === 'DELETE') {
      // Fetch the address data for UPDATE or DELETE operations here
      // Update the form fields accordingly
      const addressData = route.params?.addressData;
      if (addressData) {
        setName(addressData.addressee);
        setMobileNo(addressData.addressee_phone);
        setHouseNo(addressData.house_no);
        setStreet(addressData.street);
        setCity(addressData.city);
        setDistrict(addressData.district);
        setProvince(addressData.province);
        setCountry(addressData.country);
        setPostalCode(addressData.postal_code);
      }
    }
  }, [route.params?.operation, route.params?.addressData]);
  const handleAddAddress = () => {
      const address = {
          addressee:name,
          addressee_phone:mobileNo,
          city:city,
          country:country,
          district:district,
          house_no:houseNo,
          postal_code:postalCode,
          province:province,
          street:street,
      };
      API.post("/address/",address).then((response) => {
          Alert.alert("Success","Addresses added successfully");
          clearFormFields();
          setTimeout(() => {
            navigation.goBack();
          },500)
      }).catch((error) => {
          Alert.alert("Error","Failed to add address")
          console.log("Address adding failed",error.response.data)
          // console.log("Address adding failed",response)
      })
  }
  const handleUpdateAddress = () => {
    const addressData = {
      addressee: name,
      addressee_phone: mobileNo,
      city: city,
      country: country,
      district: district,
      house_no: houseNo,
      postal_code: postalCode,
      province: province,
      street: street,
    };

    const addressId = route.params?.addressData.id; // Replace with the actual address ID

    API.put(`/address/${addressId}/`, addressData)
      .then((response) => {
        Alert.alert('Success', 'Address updated successfully');
        clearFormFields();
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to update address');
        console.error('Address updating failed', error.response.data);
      });
  };
  const handleDeleteAddress = () => {
    const addressId = route.params?.addressData.id; // Replace with the actual address ID

    API.delete(`/address/${addressId}/`)
      .then((response) => {
        Alert.alert('Success', 'Address deleted successfully');
        clearFormFields();
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to delete address');
        console.error('Address deleting failed', error.response.data);
      });
  };
  return (
    <View>
      <Text style={styles.title}>{operation? operation:  "New"} Address</Text>
      <ScrollView>
        <View style={styles.header} />

        <View style={styles.container}>

          <View style={styles.formField}>
            <Text style={styles.label}>Full name (First and last name)</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={'gray'}
              style={styles.input}
              placeholder="Enter your Name"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Mobile number</Text>
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholderTextColor={'gray'}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Mobile No"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>House Number</Text>
            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
              placeholderTextColor={'gray'}
              style={styles.input}
              placeholder="House Number"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Street Number</Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={'gray'}
              style={styles.input}
              placeholder="Street Number"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>City</Text>
            <TextInput
              value={city}
              onChangeText={(text) => setCity(text)}
              placeholderTextColor={'gray'}
              style={styles.input}
              placeholder="City"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>District</Text>
            <TextInput
              value={district}
              onChangeText={(text) => setDistrict(text)}
              placeholderTextColor={'gray'}
              style={styles.input}
              placeholder="District"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Zipcode</Text>
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor={'gray'}
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="Postal Code"
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.addButton}>
        <CustomButton
        
          onPress={
            operation === 'UPDATE'
              ? handleUpdateAddress
              : operation === 'DELETE'
              ? handleDeleteAddress
              : handleAddAddress
          }
          buttonText={operation === 'DELETE' ? 'Delete Address' : operation === 'UPDATE' ? 'Update Address' : 'Add Address'}
            
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    height: 0,
    backgroundColor: '#00CED1',
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft:10,
    marginTop:10,
  },
  formField: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    padding: 8,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  addButton: {
    padding: 19,
    borderRadius: 6,
    marginTop: 0,
  },
  addButtonLabel: {
    fontWeight: 'bold',
    margin:10
  },
});
export default NewAddressScreen;
