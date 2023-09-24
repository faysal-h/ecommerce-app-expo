import { View, Text } from "react-native";
import SearchBarCustom from "../components/SearchBar";
import ProductList from "../components/ProductList";
import GoBack from "../components/GoBack";
import { useState } from "react";
const ProductListScreen = ({route}) => {
    useState
 return(
    <View>
        <View style={{flexGrow:1}}>
            <SearchBarCustom />
        </View>
        <View style={{flexDirection:'row',
                    backgroundColor:'#008E97',
                    alignItems:'center',
                    justifyContent:'center'}}>
            <View>
                <GoBack />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',flexGrow:1,marginRight:40}}>
                <Text style={{margin:10,fontSize:26,fontWeight:'bold', color:'black'}}>
                    {route?.params?.category}
                </Text>
            </View>
        </View>
        <View style={{padding:5,marginBottom:240}}>
            <ProductList route={route} />
        </View>
    </View>
 )   
}

export default ProductListScreen;