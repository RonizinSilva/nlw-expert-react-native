
import { useState, useRef } from "react"
import CategoryButton from "@/components/category-button"
import Header from "@/components/header"
import { View, Text, FlatList, SectionList  } from "react-native"
import {CATEGORIES, MENU} from "@/utils/data/products"
import Product from "@/components/product"
import { Link } from "expo-router"
import { useCartStore } from "@/stores/cart-store"

const Home = ()=>{
    const [category, setCategory] = useState(CATEGORIES[0])
    const sectonListRef = useRef<SectionList>(null)
    const cartStore = useCartStore()
    const cartQuantityItems = cartStore.products.reduce((total, product)=> total + product.quantity, 0)

    function handleCategorySelect(selectCategory:string){
        setCategory(selectCategory)
        const sectionIndex = CATEGORIES.findIndex((category)=> category === selectCategory)
        if(sectonListRef.current){
            sectonListRef.current.scrollToLocation({
                animated: true, 
                sectionIndex : sectionIndex, //poderia omitir, por ser o mesmo nome, mas por boa pratica vou manter
                itemIndex: 0,
            })
        }

    }

return (
        <View className="flex-1 pt-8" >
            <Header title="Faça seu pedido" cartQuantityItem={cartQuantityItems}/>
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

            <SectionList
                ref={sectonListRef}
                sections={MENU}
                keyExtractor={(item)=> item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({item})=> 
                    (
                        <Link href={`/product/${item.id}`} asChild>
                            <Product data={item}/>
                        </Link>
                    )}
                renderSectionHeader={({section: {title}})=>(
                    <Text className="text-xl text-white font-heading mt-8 mb-3">
                        {title}
                    </Text>
                )}
                className="flex-1 p-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100  }}
            />
           
        </View>
        )
}
export default Home