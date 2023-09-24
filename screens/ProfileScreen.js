import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddressScreen from "./AddressScreen";
import API from "../axios/AxiosConfig";
import CustomButton from "../components/CustomButton";
import SearchProduct from "../components/SearchProduct";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
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
        console.log('Response for user is', response.data)
        const id = response.data.id;
        console.log("Name is ",response.data.id)
        setUserId(id)
        // console.log('Profile setting user id', id)
        setUserName(response.data.name);
        // console.log('Profile Done setting', userId)
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
        console.log('Orders are', response.data)
        const fetchedOrders = response.data;
        // console.log("TYPE OF ORDERS IS",(fetchedOrders))
        setOrders(fetchedOrders)
        setLoading(false);
        console.log('ORDERS in ARRAY', orders.length)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchOrders();
  }, []);
  // console.log("orders are", orders);
  return (
    <View>
      <SearchProduct />
        <View style={{
          flex:0,
          flexDirection: 'column',
          // justifyContent:'space-between',
          backgroundColor:'white'}}
        >
        <View style={{flex:0,marginLeft:10, flexGrow:1}}>
          <Text style={{fontSize:26, fontWeight:'bold'}}>Hi, {userName}</Text>
        </View>
        <View style={{flex:0,maxHeight:600}}>
          <AddressScreen />
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

        <CustomButton onPress={logout} buttonText={'Logout'} customStyle={styles.button}/>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent:'space-between',
    backgroundColor:'yellow',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  button: {
    flex: 0,
    flexGrow:0,
    padding: 20,
    marginHorizontal:10,
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