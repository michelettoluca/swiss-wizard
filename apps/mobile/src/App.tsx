import { StatusBar } from "expo-status-bar"
import { Tournament } from "./screens/tournament"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from "@expo-google-fonts/inter"

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
		<SafeAreaView>
			<StatusBar style="auto" />
			<Tournament />
		</SafeAreaView>
	)
}
