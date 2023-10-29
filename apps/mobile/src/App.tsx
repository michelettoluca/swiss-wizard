import { useFonts } from "expo-font"
import { SafeAreaView, StatusBar } from "react-native"
import tw from "twrnc"
import { ModalProvider } from "./components/modal"
import { SignIn } from "./screens/sign-in"
import { Tournament } from "./screens/tournament"
import { FONTS } from "./constants/fonts"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

export type RootStackParamList = {
	"sign-in": undefined
	tournament: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
	let [fontsLoaded, fontError] = useFonts(FONTS)

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<SafeAreaView
			style={[tw`flex-1 bg-white`, { paddingTop: StatusBar.currentHeight }]}>
			<ModalProvider>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName="sign-in"
						screenOptions={{
							headerShown: false,
							animation: "none",
							animationDuration: 100,
							contentStyle: tw`bg-white`,
						}}>
						<Stack.Screen name="sign-in" component={SignIn} />
						<Stack.Screen name="tournament" component={Tournament} />
					</Stack.Navigator>
				</NavigationContainer>
			</ModalProvider>
		</SafeAreaView>
	)
}
