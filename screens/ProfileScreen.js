import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddressScreen from "./AddressScreen";
import API from "../axios/AxiosConfig";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get(
          "/user/"
          );
        console.log('Response for user is', response.data)
        const id = response.data.id;
        setUser(id)
        setUserId(id)
        // console.log('Profile setting user id', id)
        // setUser(id);
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
          `/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);
  console.log("orders", orders);
  return (
    <View style={styles.container}>
      <View style={{maxHeight:400}}>
        <AddressScreen />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Your orders</Text>
          </Pressable>

          <Pressable onPress={logout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>

        {/* <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Your Account</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Buy Again</Text>
          </Pressable>
        </View> */}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Text>Loading...</Text>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <Pressable style={styles.orderItem} key={order._id}>
                {order.products.slice(0, 1)?.map((product) => (
                  <View style={styles.orderImage} key={product._id}>
                    <Image source={{ uri: product.image }} />
                  </View>
                ))}
              </Pressable>
            ))
          ) : (
            <Text>No orders found</Text>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent:'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  button: {
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    flex: 1,
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