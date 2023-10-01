import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import API from "../axios/AxiosConfig";
import { PRIMARY_COLOR } from "../constants/constant";


const OrdersList = ({ route }) => {
  const { category } = route?.params || {}; // Destructure category from route.params or set it to an empty object if route is undefined
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
        const response = await API.get("/order/");
        // Show all products if no category is selected
        setOrders(response.data);
        console.log('Past orders are', orders)
    } catch (error) {
      console.log("Error occurred during fetching Past Orders ", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.log("Error occurred during refreshing products list", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Refetch data 

  return (
    <View style={{ marginHorizontal: 10,}}>
      {orders.length === 0 ? (
        <Text>No Orders</Text>
      ) : (
        <View>
          <Text style={{fontWeight:'bold',fontSize:20}}>Your Past Orders</Text>
          {orders.map((item) => (
            <View key={item.id} style={{ borderWidth: 0.2,borderColor:'#D0D0D0', padding: 5,marginVertical:5, minHeight: 100 }}>
              <Text>Order Date: {(new Date(item?.created_at).toLocaleString('en-GB'))}</Text>
              <Text>Address: {item?.address}</Text>
              <Text>Delivery Fee: {item?.delivery_fee}</Text>
              <Text>Payment Method: {item?.payment_method}</Text>
              <Text style={{ fontWeight: 'bold' }}>Order Amount: {item?.order_amount}</Text>
              <Text style={{ fontWeight: 'bold', color: PRIMARY_COLOR }}>Status: {item?.order_status}</Text>
            </View>
          ))}
        </View>
      )}

    </View>
  );
};


export default OrdersList;
