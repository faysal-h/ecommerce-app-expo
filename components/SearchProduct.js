// ProductList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { SearchBar } from '@rneui/themed';
import API from '../axios/AxiosConfig';
import { PRIMARY_COLOR } from '../constants/constant';
import { useNavigation } from '@react-navigation/native';


const SearchProduct = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await API.get("/product/");
      setProducts(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error occurred during fetching products list", error);
      setError("Error occurred during fetching products list");
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text === '') {
      setFilteredData(products);
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        // Handle the press action here, e.g., navigate to a product detail screen
        console.log(`Pressed on ${item?.name}`);
        navigation.navigate("Info", {item: item,});
      }}
      style={styles.itemContainer}
    >
      <Image
        source={{ uri: item.image }} // Replace with your image URL property
        style={styles.itemImage}
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    </Pressable>
  );

  useEffect(() => {
    fetchData();
  }, []);

    return (
      <View style={styles.container}>
        <SearchBar
            lightTheme
            containerStyle={{backgroundColor: PRIMARY_COLOR, borderWidth: 0, borderRadius: 3}}
            inputContainerStyle={{backgroundColor: 'white'}}
            placeholder="Search for products..."
            onChangeText={handleSearch}
            value={search}
        />
        {search !== '' && (
          loading ? (
            <ActivityIndicator size="large" style={styles.loader} />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.flatList}
              ListEmptyComponent={
                <Text style={styles.emptyList}>No matching products found</Text>
              }
            />
          )
        )}

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: 'white',
    },
    flatList: {
      flex:0,
      backgroundColor: 'white',
      margin: 0,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    itemImage: {
      width: 60,
      height: 60,
      marginRight: 10,
      resizeMode: 'stretch',
    },
    itemTextContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    emptySearchText: {
      textAlign: 'center',
      marginTop: 20,
      fontStyle: 'italic',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'red',
    },
    emptyList: {
      textAlign: 'center',
      marginTop: 20,
      fontStyle: 'italic',
    },
    clearButtonContainer: {
      marginVertical: 10,
      alignItems: 'center',
    },
    clearButtonStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
  });
  
  export default SearchProduct;