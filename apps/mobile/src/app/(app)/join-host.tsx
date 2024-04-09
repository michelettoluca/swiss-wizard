import { Plus } from "lucide-react-native"
import { useState } from "react"
import { TextInput, View } from "react-native"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import { GRAY, WHITE } from "../../styles/color"
import { BASE, XL } from "../../styles/size"

export default function () {
    const [code, setCode] = useState<string>("")

    return (
        <View style={{ flex: 1, padding: BASE, alignItems: "stretch", justifyContent: "center" }}>
            <Button style={{ position: "absolute", top: BASE, right: BASE }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Plus stroke={WHITE} />
                    <Text color={WHITE}>Add</Text>
                </View>
            </Button>
            <TextInput
                placeholder="CODE"
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
