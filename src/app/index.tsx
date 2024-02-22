
import { useState } from "react"
import CategoryButton from "@/components/category-button"
import Header from "@/components/header"
import { View, FlatList  } from "react-native"
import {CATEGORIES} from "@/utils/data/products"

const Home = ()=>{
    const [category, setCategory] = useState(CATEGORIES[0])

    function handleCategorySelect(selectCategory:string){
        setCategory(selectCategory)
    }

return (
        <View className="flex-1 pt-8" >
            <Header title="Faça seu pedido" cartQuantityItem={1}/>
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item)=> item}
                renderItem={({item})=>
                <CategoryButton 
                    title={item}
                    isSelected={item === category}
                    onPress={()=>handleCategorySelect(item)}
                    />}
                horizontal
                className="max-h-10 mt-5"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
            />
           
        </View>
        )
}
export default Home