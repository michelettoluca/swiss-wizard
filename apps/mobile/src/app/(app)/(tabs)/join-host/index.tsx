import { usePathname, useRouter } from "expo-router"
import { Plus } from "lucide-react-native"
import { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { Button } from "../../../../components/button"
import { Palette } from "../../../../styles/palette"
import { BASE, M, XL, XXXS } from "../../../../styles/size"
import { Typography } from "../../../../styles/typography"

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
                    <Plus size={M} stroke={Palette.white} />
                    <Text style={{ ...Typography.body, color: Palette.white }}>Host</Text>
                </View>
            </Button>
            <TextInput
                placeholder="Code"
                placeholderTextColor={Palette.gray[400]}
                cursorColor={Palette.gray[600]}
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
