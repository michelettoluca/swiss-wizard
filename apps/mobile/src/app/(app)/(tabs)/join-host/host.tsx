import { useState } from "react"
import { View } from "react-native"
import { Input } from "../../../../components/input"
import { Select } from "../../../../components/select"
import { Text } from "../../../../components/text"
import { GRAY } from "../../../../styles/color"
import { BASE, XS } from "../../../../styles/size"

export default function () {
    const [form, setForm] = useState<{ name: string; select: number | null }>({
        name: "asd",
        select: null
    })

    function handleChange<T extends keyof typeof form>(key: T, value: (typeof form)[T]) {
        setForm((form) => ({
            ...form,
            [key]: value
        }))
    }

    return (
        <View style={{ flex: 1, backgroundColor: GRAY[100], padding: BASE, gap: XS }}>
            <Text>{JSON.stringify(form, null, 3)}</Text>
            <Input
                label="Name"
                placeholder="Name"
                value={form.name}
                onChange={(value) => handleChange("name", value)}
            />
            <Select
                label="Format"
                value={form.select}
                onChange={(v) => handleChange("select", v)}
                options={[
                    { label: "One", value: 1 },
                    { label: "Two", value: 2 }
                ]}
                placeholder="Format"
            />
        </View>
    )
}
