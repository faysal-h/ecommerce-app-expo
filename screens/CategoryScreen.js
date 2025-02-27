import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, FlatList } from "react-native";
import API from "../axios/AxiosConfig";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_COLOR } from "../constants/constant";
import SearchProduct from "../components/SearchProduct";
import { ScrollView } from "react-native";

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
        <View style={{flexGrow:1}}>
          <SearchProduct />
          {/* HEADER */}
          <View style={styles.header}>

            <Text style={styles.title}>Categories</Text>
          </View>
          {/* CATGORY AREA */}
          <ScrollView style={{flex:1, flexGrow:1, marginTop:35}}>
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
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow:1,
      padding: 10,
      // justifyContent:'center',
      // backgroundColor: '#f1f4e9',
      // backgroundColor: 'pink',
    },
    header:{flex:0, 
      flexShrink:1,
      minHeight:5,
      backgroundColor:PRIMARY_COLOR,
      alignItems:'center'},
    title: {
      margin:10,
      verticalAlign:'middle',
      flexDirection:'row',
      fontSize: 26,
      color:'white',
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
      backgroundColor: 'white',
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