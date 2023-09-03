import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import StackNavigator from "./navigation/StackNavigator";
import store from "./store";
import { UserContext } from "./UserContext";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#008E97" />
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 25 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <Provider store={store}>
          <UserContext>
            <StackNavigator />
            <ModalPortal />
          </UserContext>
        </Provider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
