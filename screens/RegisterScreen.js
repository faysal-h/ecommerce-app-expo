import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import PhoneInput
	from 'react-native-phone-input';
import { API_URL } from "../constants/constant";
import CustomButton from "../components/CustomButton";


const RegisterScreen = () => {
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  

  const handleRegister = () => {
    if (phone.length === 13 || phone.length === 14){
      const user = {
        phone: phone,
        name: userName,
        password: password,
      };

      // send a POST  request to the backend API to register the user
      axios
        .post(`${API_URL}/register/`, user)
        .then((response) => {
          Alert.alert(
            "Registration successful",
            "You have been registered Successfully"
          );
          setUserName("");
          setPhone("");
          setPassword("");
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert(
            "Registration Error",
            "An error occurred while registering"
          );
          console.log("registration failed", error);
        });
      }
      else if(password.length <= 7){
        Alert.alert('Invalid Password','Password length should be greater than 6') 
      }
      else{
        Alert.alert('Invalid Phone Number','Enter a Valid phone number.')
      }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f1f4f0", alignItems: "center",marginTop:0  }}
    >
      <View>
        <Image
          style={{ width: 150, height: 50 }}
          source={{
            // uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}         
        behavior={(Platform.OS === 'android') ? 'height' : null}
          enabled
          keyboardVerticalOffset={Platform.select({ ios: 80, android: 50 }
          )}>
        <View style={styles.container}>
          <FontAwesome5 name="user-circle" size={100} color="#ff9900" />
          <Text style={styles.title}>Register Account</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <Ionicons name="ios-person" size={24} color="gray" style={styles.icon} />
            <TextInput
              value={userName}
              onChangeText={(text) => setUserName(text)}
              style={styles.textInput}
              placeholder="Enter your Name"
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons name="phone" size={24} color="gray" style={styles.icon} />
            {/* PhoneInput */}
            <PhoneInput
              value={phone}
              onChangePhoneNumber={(number) => setPhone(number)}
              initialCountry="pk"
              // allowZeroAfterCountryCode = 'true'
              textProps={{placeholder: 'Phone number'}}
              // onPressFlag={toggleCountryPicker}w
              style={{flex:1, margin:15}}
              textStyle={{fontSize:16}}
              textInputProps={{ maxLength: 10 }}
              
              />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock1" size={24} color="gray" style={styles.icon} />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.textInput}
              placeholder="enter your Password"
            />
          </View>
        </View>

        <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: '#007FFF', fontWeight: '500' }}>Forgot Password</Text>
        </View>

        <View style={{ marginTop: 40 }} />
        <CustomButton
          customStyle={styles.button}
          buttonText={'Register'}
          onPress={handleRegister}
          />
        <Text style={{paddingTop:20, paddingBottom:10, textAlign: 'center', color: 'gray', fontSize: 16 }}>
          Already have an account?
        </Text>
        <CustomButton
          customStyle={styles.loginButton}
          buttonText={'Sign In'}
          onPress={() => navigation.goBack()}
          />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 12,
    // borderWidth:4,
    // borderColor:'lightgray',
    padding:10,
    // borderRadius:5,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  icon: {
    marginLeft: 8,
  },
  textInput: {
    color: 'black',
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  button: {
    width: 200,
    backgroundColor: '#FEBE10',
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
  loginButton: {
    width: 200,
    backgroundColor: '#00b33c',
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
  },
});
