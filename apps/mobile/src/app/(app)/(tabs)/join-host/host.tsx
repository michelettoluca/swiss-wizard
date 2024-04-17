import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { Button } from "../../../../components/button"
import { Input } from "../../../../components/input"
import { Select } from "../../../../components/select"
import { Text } from "../../../../components/text"
import { GRAY } from "../../../../styles/color"
import { BASE, XS } from "../../../../styles/size"

export default function () {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<{
        firstName: string
        lastName: string
        timeLimit: number
        numeroACaso: number
    }>({
        defaultValues: {
            firstName: "",
            lastName: ""
        }
    })

    return (
        <View style={{ flex: 1, backgroundColor: GRAY[100], padding: BASE, gap: XS }}>
            <Text>{JSON.stringify(getValues(), null, 3)}</Text>
            <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Name" placeholder="Name" value={value} onChange={onChange} />
                )}
            />
            <Controller
                control={control}
                name="timeLimit"
                rules={{
                    min: 3
                }}
                render={({ field: { onChange, value, disabled } }) => (
                    <Input
                        label="Time limit"
                        placeholder="55"
                        keyboardType="decimal-pad"
                        suffix="min"
                        value={`${value ?? ""}`}
                        onChange={(v) => onChange(v?.length ? Number(v) : null)}
                    />
                )}
            />
            <Controller
                control={control}
                name="numeroACaso"
                render={({ field: { onChange, value } }) => (
                    <Select
                        label="Format"
                        value={value}
                        onChange={onChange}
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
                )}
            />
            <Button onPress={handleSubmit(console.log)}>
                <Text>Submit</Text>
            </Button>
        </View>
    )
}
