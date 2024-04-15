import { useState } from "react"
import { View } from "react-native"
import { Input } from "../../../../components/input"
import { Select } from "../../../../components/select"
import { Text } from "../../../../components/text"
import { GRAY } from "../../../../styles/color"
import { BASE, XS } from "../../../../styles/size"

export default function () {
    const [form, setForm] = useState<{ name: string; timelimit: number | null; select: number | null }>({
        name: "",
        timelimit: null,
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
            <Input
                label="Time limit"
                placeholder="55"
                suffix="min"
                value={`${form.timelimit ?? ""}`}
                onChange={(value) => handleChange("timelimit", value ? Number(value) : null)}
                keyboardType="decimal-pad"
            />
            <Select
                label="Format"
                value={form.select}
                onChange={(v) => handleChange("select", v)}
                options={[
                    { label: "One", value: 1 },
                    { label: "Two", value: 2 },
                    { label: "Three", value: 3 },
                    { label: "Four", value: 4 },
                    { label: "Five", value: 5 },
                    { label: "Six", value: 6 },
                    { label: "Seven", value: 7 },
                    { label: "Eight", value: 8 },
                    { label: "Nine", value: 9 },
                    { label: "Ten", value: 10 },
                    { label: "Eleven", value: 11 },
                    { label: "Twelve", value: 12 }
                ]}
                placeholder="Format"
            />
        </View>
    )
}
