import { usePathname, useRouter } from "expo-router"
import { Plus } from "lucide-react-native"
import { useState } from "react"
import { TextInput, View } from "react-native"
import { Button } from "../../../../components/button"
import { Text } from "../../../../components/text"
import { GRAY, WHITE } from "../../../../styles/color"
import { BASE, M, XL, XXXS } from "../../../../styles/size"

export default function () {
    const router = useRouter()
    const path = usePathname()
    const [code, setCode] = useState<string>("")

    return (
        <View style={{ flex: 1, padding: BASE, alignItems: "stretch", justifyContent: "center" }}>
            <Button
                size="l"
                style={{ position: "absolute", borderRadius: Number.MAX_SAFE_INTEGER, top: BASE, right: BASE }}
                onPress={() => router.push(`${path}/host`)}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: XXXS
                    }}
                >
                    <Plus size={M} stroke={WHITE} />
                    <Text color={WHITE}>Host</Text>
                </View>
            </Button>
            <TextInput
                placeholder="Code"
                placeholderTextColor={GRAY[400]}
                cursorColor={GRAY[600]}
                maxLength={7}
                style={{
                    fontFamily: "Inter SemiBold",
                    fontSize: XL,
                    textAlign: "center"
                }}
                value={code}
                onChangeText={setCode}
            />
        </View>
    )
}
