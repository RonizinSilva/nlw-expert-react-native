import clsx from "clsx"
import {Text, Pressable, PressableProps} from "react-native"

type catergoryProps = PressableProps & {
    title: string
    isSelected?: boolean
}

const CategoryButton = ({title, isSelected, ...rest}: catergoryProps) =>{
    return(
        <Pressable className={clsx("bg-slate-800 px-4 justify-center rounded-md h-10", isSelected && "border-2 border-lime-300")} {...rest}>   
            <Text className="text-slate-100 font-subtitle text-sm">
                {title}
            </Text>
        </Pressable>
    )
}   
export default CategoryButton