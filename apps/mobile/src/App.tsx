import { Tournament } from "./screens/tournament"
import { useFonts } from "expo-font"
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from "@expo-google-fonts/inter"
import { SafeAreaView, StatusBar } from "react-native"
import tw from "twrnc"
import { ModalProvider } from "./components/modal"

export default function App() {
	let [fontsLoaded, fontError] = useFonts({
		"Inter Regular": Inter_400Regular,
		"Inter Medium": Inter_500Medium,
		"Inter SemiBold": Inter_600SemiBold,
		"Inter Bold": Inter_700Bold,
	})

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
			<ModalProvider>
				<Tournament />
			</ModalProvider>
		</SafeAreaView>
	)
}
