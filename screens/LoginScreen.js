import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState,useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from '@expo/vector-icons';
import PhoneInput
	from 'react-native-phone-input';

const LoginScreen = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("Token Authentication  Failed.", err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      phone: phone,
      password: password,
    };
    axios
      .post("http://localhost:8000/token/", user)
      .then((response) => {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        AsyncStorage.setItem("authToken", accessToken);
        AsyncStorage.setItem("refreshToken", refreshToken);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error Occured", "Invalid Phone Number");
        console.log(error);
      });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{margin:50}}>
        <FontAwesome5 name="user-circle" size={100} color="#29a3a3" />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerText}>Login</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={styles.inputContainer}>
              <MaterialIcons name="phone" size={24} color="gray" style={styles.inputIcon} />
              {/* PhoneInput */}
              <PhoneInput
                value={phone}
                onChangePhoneNumber={(number) => setPhone(number)}
                initialCountry="pk"
                textProps={{placeholder: 'Phone number'}}
                // onPressFlag={toggleCountryPicker}w
                style={{flex:1, margin:15}}
                textStyle={{fontSize:16}}
                />
            </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <AntDesign name="lock1" size={24} color="gray" style={styles.inputIcon} />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.inputText}
              placeholder="Enter your Password"
            />
          </View>
        </View>

        <View style={styles.keepLoggedIn}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: '#007FFF', fontWeight: '500' }}>Forgot Password</Text>
        </View>

        <View style={{ marginTop: 40 }} />

        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

          <Text style={{paddingTop:20, paddingBottom:10, textAlign: 'center', color: 'gray', fontSize: 16 }}>
            Don't have an account?
          </Text>

        <Pressable onPress={() => navigation.navigate('Register')} style={styles.signUpButton}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>
            Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f4f0',
    alignItems: 'center',
    marginTop: 0,
  },
  logo: {
    width: 150,
    height: 100,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#041E42',
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
  inputIcon: {
    marginLeft: 8,
  },
  inputText: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  keepLoggedIn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    width: 200,
    backgroundColor: '#00b33c',
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    width: 200,
    backgroundColor: '#00ace6',
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
  },
  signUpText: {
    marginTop: 15,
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});