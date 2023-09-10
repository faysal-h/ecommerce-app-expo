import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import SearchBarCustom from "../components/SearchBar";
import API from "../axios/AxiosConfig";
import { useNavigation } from "@react-navigation/native";

const CategoryScreen = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const fetchData = async () => {
      try{
          const responseCategory = await API.get("/category/");
          setCategories(responseCategory.data);
          } catch (error){
              console.log("Error occured during fetching CATEGORIES", error)
          }
        };
    useEffect(() => {
      fetchData();
        }, []);
    const navigateToProductList = (selectedCategory) => {
      navigation.navigate('Products', { category: selectedCategory });
      };
    return(
        <View>
          <SearchBarCustom />

          {/* CATGORY AREA */}
          <Text style={styles.title}>Categories</Text>
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
            {categories.map((item) => (
                <Pressable
                key={item.name}
                style={[
                    styles.categoryButton,
                    category === item.name && styles.selectedCategoryButton,
                ]}
                onPress={() => {setCategory(item.name);
                  navigateToProductList(item.name);}
                }
                >
                <Image
                    source={{ uri: item?.image }}
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
          </View>

          {/* PRODUCT AREA */}
          {/* <View style={{flex:1, backgroundColor:'white',flexGrow:1,marginHorizontal:10}}>
            <ProductList />
          </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      padding: 10,
      backgroundColor: '#f1f4e9',
      // backgroundColor: 'lightgray',
    },
    title: {
      margin:20,
      flexDirection:'row',
      fontSize: 30,
      color:'green',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonContainer: {

      borderRadius:10,
      borderColor:'red',
      gap:50,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly', // Add space between items
    },
    categoryButton: {
      backgroundColor: '#eee',
      borderRadius: 5,
      margin:10,
      flexDirection: 'column', // Added to align icon and text horizontally
      alignItems: 'center' // Added to vertically center icon and text
    },
    selectedCategoryButton: {
      backgroundColor: '#fff',
      borderColor:'#008E97',
      alignContent:'flex-end'
    },
    icon: {
      width: 80,
      height: 80,
      margin:10

    },
    categoryButtonText: {
      fontSize: 20,
      width:110,
      // paddingTop:10,
      textAlignVertical:'bottom',
      // fontWeight: 'bold',
      // justifyContent:'center',
      // marginTop:5,
      textAlign:'center'
    },
    selectedCategoryButtonText: {
      color: '#008E97',
      fontWeight:'bold',
      textAlignVertical:'bottom',
    },
    selectedCategoryIcon: {
      width: 80,
      height: 80,
    },
  });

  export default CategoryScreen;