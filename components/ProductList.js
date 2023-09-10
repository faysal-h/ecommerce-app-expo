import { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import ProductItem from "../components/ProductItem";
import API from "../axios/AxiosConfig";


const ProductList = ({ route }) => {
  const { category } = route?.params || {}; // Destructure category from route.params or set it to an empty object if route is undefined
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await API.get("/product/");

      if (category) {
        // Filter products based on the selected category
        const filteredProducts = response.data.filter(
          (item) => item.category === category
          );
          // console.log('FILtered PRODUCTS ',filteredProducts.length)
          setProducts(filteredProducts);
        } else {
        // Show all products if no category is selected
        setProducts(response.data);
      }
    } catch (error) {
      console.log("Error occurred during fetching products list", error);
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
  }, [category]); // Refetch data when the category changes

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        numColumns={2}
        renderItem={({ item }) => (
          <View key={item.id}>
            <ProductItem item={item} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};


export default ProductList;
