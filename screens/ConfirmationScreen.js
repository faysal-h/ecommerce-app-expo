import { StyleSheet, Text, View, ScrollView, Pressable,Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import { Button } from "@rneui/themed";

import API from "../axios/AxiosConfig";
import CustomButton from "../components/CustomButton";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    // { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [addresses, setAddresses] = useState(["H.No.160"]);
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const finalTotal = total < 5000 ? total + 500 : total;
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await API.get(
        `/address/`
      );
      const addresses = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("Error fetching ADDRESS in Order Confirmation", error);
    }
  };

  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAdress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        address: selectedAddress.id,
        customer : userId,
        delivery_fee : 500,
        payment_method: selectedOption,
      };
      console.log("ORDER", orderData)
      const response = await API.post(
        "/order/",
        orderData
      );
      if (response.status === 201) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("errror", error);
    }
  };
  const pay = async () => {
    try {
      const options = {
        description: "Adding To Wallet",
        currency: "PKR",
        name: "Amazon",
        key: "rzp_test_E3GWYimxN7YMk8",
        amount: finalTotal * 100,
        prefill: {
          email: "void@razorpay.com",
          phone: "+9191919191",
          name: "RazorPay Software",
        },
        theme: { color: "#F37254" },
      };

      const data = await RazorpayCheckout.open(options);

      console.log(data)

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: finalTotal,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await API.post(
        "/orders/",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{ marginTop: 10 }}>
    <View style={styles.stepContainer}>
      <View style={styles.stepItem}>
        {steps?.map((step, index) => (
          <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
            {index > 0 && (
              <View
                style={[
                  { flex: 1, height: 2, backgroundColor: "green" },
                  index <= currentStep && { backgroundColor: "green" },
                ]}
              />
            )}
            <View
              style={[
                styles.stepDot,
                index < currentStep && { backgroundColor: "green" },
              ]}
            >
              {index < currentStep ? (
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  &#10003;
                </Text>
              ) : (
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  {index + 1}
                </Text>
              )}
            </View>
            <Text style={{ textAlign: "center", marginTop: 8 }}>
              {step.title}
            </Text>
          </View>
        ))}
      </View>
    </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
                    {/* BACK BUTTON */}
          <View style={{flexDirection:'column'}}>
            <Button 
              onPress={() => navigation.goBack()}
              title={'Return to cart'}
              color={"darkorange"}
              >
            </Button>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedAdress(item)}
                style={[
                  styles.addressItem,
                  selectedAddress && selectedAddress.id === item?.id
                    ? { borderColor: "#008397", borderWidth: 2 }
                    : null,
                      ]}
                >
                {/* {selectedAddress && selectedAddress.id === item?.id ? (
                  <FontAwesome5 name="dot-circle" size={40} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAdress(item)}
                    name="circle"
                    size={40}
                    color="gray"
                  />
                )} */}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.addressee}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    House No. {item?.house_no}, Street No. {item?.street}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.city}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.province}, {item?.country}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    phone No : {item?.addressee_phone}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Postal code : {item?.postal_code}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                      marginTop: 10,
                      marginBottom: 7,
                    }}
                  >
                    <Pressable
                    onPress={() => navigation.navigate('New', {'addressData':item, 'operation':'UPDATE'})}
                      style={styles.addressAction}
                    >
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => navigation.navigate('New', {'addressData':item, 'operation':'DELETE'})}
                      style={styles.addressAction}
                    >
                      <Text>Remove</Text>
                    </Pressable>

                  </View>

                  <View>
                    {selectedAddress && selectedAddress.id === item?.id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={styles.addressButton}
                      >
                        <Text style={{ textAlign: "center", color: "white" }}>
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>


        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your payment Method
          </Text>

          <Pressable
            style={styles.paymentOption}
            onPress={() => setSelectedOption("cash")}
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={30} color="#008397" />
            ) : (
              <Entypo
                name="circle"
                size={30}
                color="gray"
              />
            )}

            <Text>Cash on Delivery</Text>
          </Pressable>

          <Pressable
            style={styles.paymentOption}
            onPress={() => {
              setSelectedOption("card");
              Alert.alert("Jazz Cash/Easy Paisa", "Pay Online", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel is pressed"),
                },
                {
                  text: "OK",
                  onPress: () => pay(),
                },
              ]);
            }}
          >
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={30} color="#008397" />
            ) : (
              <Entypo name="circle" size={30} color="gray" />
            )}

            <Text>UPI / Credit or debit card</Text>
          </Pressable>
          <CustomButton
            onPress={() => selectedOption == "" ? Alert.alert("Error", "Select a payment method"): setCurrentStep(2)}
            customStyle={styles.continueButton}
          
            buttonText={'Continue'}
          />
        </View>
      )}

      {currentStep === 2 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>
{/* 
          <View
            style={styles.deliveryOption}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View> */}

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Shipping to {selectedAddress?.name}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Items
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>Rs.{total}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Delivery
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>Rs. {total <5000 ? 500 : 0}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Order Total
              </Text>

              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >
                Rs.{finalTotal}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Pay on delivery (Cash)
            </Text>
          </View>

          <CustomButton
            onPress={handlePlaceOrder}
            customStyle={styles.continueButton}
          
            buttonText={'Place Order'}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'green',
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotActive: {
    backgroundColor: 'green',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  deliveryAddress: {
    marginHorizontal: 20,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressItem: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 17,
    marginVertical: 7,
    borderRadius: 6,
  },
  addressDot: {
    backgroundColor: '#008397',
  },
  addressDotInactive: {
    color: 'gray',
  },
  addressName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  addressLocation: {
    fontSize: 15,
    color: '#181818',
  },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7,
  },
  addressAction: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: '#D0D0D0',
  },
  addressButton: {
    backgroundColor: '#008397',
    padding: 20,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  deliveryOptions: {
    marginHorizontal: 20,
  },
  deliveryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    gap: 7,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
  },
  deliveryOptionText: {
    flex: 1,
  },
  continueButton: {
    // backgroundColor: '#FFC72C',
    paddingVertical: 20,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paymentMethod: {
    marginHorizontal: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentOption: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },
  paymentOptionText: {
    flex: 1,
  },
  orderNow: {
    marginHorizontal: 20,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
  },
  orderSave: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderTotalAmount: {
    color: '#C60C30',
    fontSize: 17,
    fontWeight: 'bold',
  },
  payWith: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
  },
  paymentText: {
    fontSize: 16,
    color: 'gray',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 7,
  },
  placeOrderButton: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
