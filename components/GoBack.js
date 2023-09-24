import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

const GoBack = () => {
    const navigation = useNavigation();
    return(
        <Pressable style={{flex:1, justifyContent:'center', padding:10}}
            // style={{padding:20}}
            onPress={() => navigation.goBack()}        
            >
            <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
    );
};

export default GoBack;