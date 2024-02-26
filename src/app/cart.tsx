import { Button } from "@/components/button"
import Header from "@/components/header"
import Input from "@/components/input"
import Product from "@/components/product"
import { ProductCardProps, useCartStore } from "@/stores/cart-store"
import FormatCurrency from "@/utils/functions/format-currency"
import { Text, View, ScrollView, Alert, Linking } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Feather } from "@expo/vector-icons"
import LinkButton from "@/components/link-button"
import { useState } from "react"
import { useNavigation } from "expo-router"

const PHONE_NUMBER = "5519999912499"

const Cart = ()=>{
    const cartStore = useCartStore()
    const total = FormatCurrency(cartStore.products.reduce((total, product)=> total + product.price * product.quantity, 0))
    const [address, setAddress] = useState("")
    const navigation = useNavigation()
    function handleProductRemove(product: ProductCardProps){
        Alert.alert("Remover", `Deseja remover o item ${product.title} do carrinho?`, [
            {
                text: "Cancelar",
            } ,
            {
                text: "Remover",
                onPress: ()=> cartStore.remove(product.id)
 
            }
        ])
    }

    function handleOrder(){
        if(address.trim().length === 0){
            return Alert.alert("Pedido", "Informe os dados de entrega")
        }
        const products = cartStore.products
        .map((product)=> `\n ${product.quantity} ${product.title}`)
        .join("")

        const message = 
        `
        🍔 NOVO PEDIDO 🍟
        \n Entregar em: ${address}

        ${products}
        \n Total: ${total}
        
        `
        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
        cartStore.clear()
        navigation.goBack()
        
    }
    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho"/>
            <KeyboardAwareScrollView>
            <ScrollView>
            <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? 
            (  
                <View className="border-b border-slate-700">
                {
                    cartStore.products.map((product)=>(
                        <Product key={product.id} data={product} onPress={()=>handleProductRemove(product)}/>
                    ))
                }
            </View>
            ):(   
                <Text className="font-body text-slate-400 text-center my-8">
                    Seu carrinho está vazio
                </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4"> 
                <Text className="text-white text-xl font-subtitle" >Total: </Text>
                <Text className="text-lime-400 text-2xl font-heading">
                   {total}
                </Text>
            </View>
            <Input
                placeholder="Informe o endereço de entrega com: Rua, Bairro, CEP, Numero e Complemento..."
                onChangeText={setAddress} 
                blurOnSubmit={true}
                onSubmitEditing={handleOrder}
                returnKeyType="next"
            />
            </View>
            </ScrollView>
            </KeyboardAwareScrollView>
            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text> 
                    <Button.Icon><Feather name="arrow-right-circle" size={20}/></Button.Icon>
                </Button>
                <LinkButton title="Voltar ao cardapio" href="/"/>
            </View>
        </View>
    )
}

export default Cart