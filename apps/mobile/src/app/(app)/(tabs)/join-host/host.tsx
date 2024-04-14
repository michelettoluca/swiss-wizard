import { useState } from "react"
import { View } from "react-native"
import { Input } from "../../../../components/input"
import { Text } from "../../../../components/text"
import { GRAY } from "../../../../styles/color"
import { BASE } from "../../../../styles/size"

export default function () {
    const [form, setForm] = useState<Record<string, string>>({
        name: "asd"
    })

    function handleChange(key: string, value: string) {
        setForm((form) => ({
            ...form,
            [key]: value
        }))
    }
    return (
        <View style={{ flex: 1, backgroundColor: GRAY[100], padding: BASE }}>
            <Text>{JSON.stringify(form, null, 3)}</Text>
            <Input
                label="Name"
                placeholder="Name"
                value={form.name}
                onChange={(value) => handleChange("name", value)}
            />
        </View>
    )
}
