import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Pressable, StatusBar } from "react-native";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import SearchBarCustom from "../components/SearchBar";


const ProductsScreen = () => {
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([])

    const [items, setItems] = useState([
        { label: "Men's clothing", value: "men's clothing" },
        { label: "Jewelery", value: "jewelery" },
        { label: "Electronics", value: "electronics" },
        { label: "Women's clothing", value: "women's clothing" },
      ]);
    const categories = [
        {
          name: "men's clothing",
          icon: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Replace with the actual URI of the icon image
        },
        {
          name: "jewelery",
          icon:  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Replace with the actual URI of the icon image
        },
        {
          name: "Electronics",
          icon: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Replace with the actual URI of the icon image
        },
        {
          name: "Women's clothing",
          icon: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Replace with the actual URI of the icon image
        },
        {
          name: "clothing",
          icon: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Replace with the actual URI of the icon image
        },
        // Add more categories with their respective icon URIs as needed
      ];
      
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data);
            } catch (error){
                console.log("Error occured during fetching products list", error)
            }
        };
        fetchData();

    }, []);

    
    return(
        <>
        {/* <StatusBar
            animated={true}
            backgroundColor="seagreen"
            // barStyle={statusBarStyle}
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
            /> */}
        <SearchBarCustom />
        <ScrollView>
        {/* CATGORY AREA */}
            <View style={styles.container}>
                <Text style={styles.title}>Filter Products by Category</Text>
                <View style={styles.buttonContainer}>
                {categories.map((item) => (
                    <Pressable
                    key={item.name}
                    style={[
                        styles.categoryButton,
                        category === item.name && styles.selectedCategoryButton,
                    ]}
                    onPress={() => setCategory(item.name)}
                    >
                    <Image
                        source={{ uri: item?.icon }}
                        onError={() => {
                        // Handle loading errors by rendering a standard icon
                        console.log('Category Icon loading failed');
                        }}
                        style={[styles.icon, category === item.name && styles.selectedCategoryIcon]}
                    />
                    <Text
                        style={[
                        styles.categoryButtonText,
                        category === item.name && styles.selectedCategoryButtonText,
                        ]}
                    >
                        {item.name}
                    </Text>
                    </Pressable>
                  ))}
            </View>
            <Pressable
              style={styles.clearButton}
              onPress={() => setCategory(null)}
            >
              <Text style={styles.clearButtonText}>Clear Filter</Text>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products?.filter((item) => item.category === category)
              .map((item, index) => (
                <View>
                <ProductItem key={item.id} item={item}/>
                </View>
              ))}
          </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#f1f1f1f',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      backgroundColor:'#c9C7C9'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between', // Add space between items
    },
    categoryButton: {
      backgroundColor: '#eee',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 5,
      marginVertical:5,
      flexDirection: 'column', // Added to align icon and text horizontally
      alignItems: 'center', // Added to vertically center icon and text
      // justifyContent:'space-between',
    },
    selectedCategoryButton: {
      backgroundColor: '#fff',
      borderColor:'seagreen',
    },
    icon: {
      width: 40,
      height: 40,
      // marginRight: 8,
      // alignItems:'center',
      // alignSelf:'center',
    },
    categoryButtonText: {
      fontSize: 16,
      width:80,
      // fontWeight: 'bold',
      justifyContent:'center',
      // marginTop:5,
      textAlign:'center'
    },
    selectedCategoryButtonText: {
      color: 'seagreen',
      fontWeight:'bold'
    },
    selectedCategoryIcon: {
      width: 50,
      height: 50,
      // marginRight: 8,
      // borderStyle:'solid',
      // borderWidth:'15',
      borderColor:'seagreen',
    },
    clearButton: {
      backgroundColor: '#FFC72C',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    clearButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  export default ProductsScreen;