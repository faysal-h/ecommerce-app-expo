import { View, Text } from "react-native";
import SearchBarCustom from "../components/SearchBar";
import ProductList from "../components/ProductList";
import GoBack from "../components/GoBack";
import { useState } from "react";
const ProductListScreen = ({route}) => {
    useState
 return(
    <View>
        <View style={{flexDirection:'row',
                    backgroundColor:'#008E97',
                    alignItems:'center',
                    justifyContent:'center'}}>
            <View style={{paddingLeft:15,flexGrow:0}}>
                <GoBack />
            </View>
            <View style={{flexGrow:1}}>
                <SearchBarCustom />
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center',borderWidth:5,borderColor:'#008E97'}}>
            <Text style={{margin:10,fontSize:26,fontWeight:'400', color:'#665200', textAlignVertical:'bottom'}}>
                {route?.params?.category}
            </Text>
        </View>
        <View style={{padding:5,marginBottom:240}}>
            <ProductList route={route} />
        </View>
    </View>
 )   
}

export default ProductListScreen;