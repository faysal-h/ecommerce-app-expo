import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddressScreen from "./AddressScreen";
import API from "../axios/AxiosConfig";
import CustomButton from "../components/CustomButton";
import SearchProduct from "../components/SearchProduct";

const ProfileScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [userName, setUserName] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get(
          "/user/"
          );
        const id = response.data.id;
        setUserName(response.data.name);
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Authentication token cleared. Logging Out.");
    navigation.replace("Login");
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get(
          '/order/'
        );
        // console.log('Orders are', response.data)
        const fetchedOrders = response.data;
        setOrders(fetchedOrders)
        setLoading(false);
        console.log('ORDERS in ARRAY', orders.length)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <View style={{justifyContent:'space-between', flexGrow:1,}}>
      <SearchProduct />
      <View style={styles.container}
      >
        <View style={styles.header}>
          <Text style={{fontSize:26, fontWeight:'bold', marginLeft:10}}>Hi, {userName}</Text>
        </View>
        <ScrollView style={styles.address}>
          <AddressScreen />
        </ScrollView>
        <CustomButton onPress={logout} buttonText={'Logout'} customStyle={styles.button}/>
      </View>
        {/* ORDERS */}
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Text>Loading...</Text>
            ) : orders?.length > 0 ? (
              orders.map((order) => (
                <Pressable style={styles.orderItem} key={order.id}>
                {order.cart_items.slice(0, 1)?.map((product) => (
                  <View style={styles.orderImage} key={product.id}>
                  <Image source={{ uri: product.image }} />
                  </View>
                  ))}
                  </Pressable>
                  ))
                  ) : (
                    <Text>No orders found</Text>
                    )}
                  </ScrollView> */}


    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex:0,
    flexDirection: 'column',
    flexGrow:1,
    justifyContent:'space-between',
    backgroundColor:'white'
  },
  header: {
    flex:0,
    flexGrow:0,
    backgroundColor:'white',
  },
  address:{
    flex:1,
    flexGrow:1,
    marginVertical:10,
    // maxHeight:500
  },
  button: {
    flex: 0,
    flexGrow:0,
    flexShrink:0,
    padding: 20,
    marginHorizontal:40,
    marginBottom:10,
    backgroundColor: 'darkred',
    borderRadius: 3,
  },
  buttonText: {
    textAlign: 'center',
  },
  orderItem: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderImage: {
    marginVertical: 10,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});