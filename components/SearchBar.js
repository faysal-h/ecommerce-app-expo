import { StyleSheet, View, Pressable, TextInput } from "react-native";
import CartBadge from "./CartBadge";
import { AntDesign } from "@expo/vector-icons";

const SearchBarCustom = () => {
    return (
        <View style={styles.view}>
        {/* Search Bar on Top */}
        <Pressable style={styles.pressable}>
          <AntDesign
            style={styles.icon}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Store" style={{flexGrow:1}} />
        </Pressable>
        {/* Cart Icon on Top Bar */}
        <Pressable>
          <CartBadge />
        </Pressable>
      </View>

    )
}


const styles = StyleSheet.create({
    view: {
      backgroundColor: "#008E97",
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    pressable: {
      flexDirection: "row",
      justifyContent:'space-between',
      alignItems: "center",
      marginHorizontal: 7,
      gap: 10,
      backgroundColor: "white",
      borderRadius: 3,
      height: 38,
      flex: 1,
    },
    icon: {
      paddingLeft: 10,
    },
  });

  export default SearchBarCustom;