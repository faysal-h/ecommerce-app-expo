import { useState } from "react";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";

const AddressButton = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress,setSelectedAdress] = useState("");
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  
  console.log("address", addresses);

    return(
        <View>

        <Pressable
        onPress={() => setModalVisible(!modalVisible)}
            style={{
                flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
            >
            <Ionicons name="location-outline" size={24} color="black" />
            
            <Pressable>
            {selectedAddress ? (
                <Text>
                Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
                ) : (
                    <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add an Address
                  </Text>
                  )}
              </Pressable>
              
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Pressable>
        </View>
    
          );
        };


export default AddressButton;