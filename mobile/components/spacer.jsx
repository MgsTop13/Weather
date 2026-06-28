import { View } from "react-native";

export function SpacerComponent({width = "100%", height = 30}){
    return(
        <View style={{width, height}} />
    )
}