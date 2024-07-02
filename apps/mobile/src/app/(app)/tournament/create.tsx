import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Input } from "../../../components/input"
import { Paywall } from "../../../components/paywall"
import { Select } from "../../../components/select"
import { Palette } from "../../../styles/palette"
import { Size } from "../../../styles/size"

export default function () {
    const insets = useSafeAreaInsets()
    const { control, register } = useForm({})

    return (
        <View
            style={{
                backgroundColor: Palette.gray[100],
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingBottom: insets.bottom,
                paddingRight: insets.right
            }}
        >
            <View style={{ padding: Size.BASE, gap: Size.XS }}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input label="Name" placeholder="Name" onChange={onChange} value={value} />
                    )}
                    name="name"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                            label="Format"
                            placeholder="Format"
                            onChange={onChange}
                            value={value}
                            options={[
                                { label: "Pauper", value: "Pauper" },
                                { label: "Modern", value: "Modern" },
                                { label: "Standard", value: "Standard" },
                                { label: "Legacy", value: "Legacy" }
                            ]}
                        />
                    )}
                    name="format"
                />
                <View style={{ flexDirection: "row", gap: Size.BASE }}>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Round time"
                                placeholder="55"
                                suffix="min"
                                onChange={onChange}
                                value={value}
                                style={{ flex: 1 }}
                            />
                        )}
                        name="roundTime"
                    />
                    <Paywall style={{ flex: 1, borderRadius: Size.S }}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input label="Round limit" placeholder="4" onChange={onChange} value={value} />
                            )}
                            name="roundLimit"
                        />
                    </Paywall>
                </View>
            </View>
        </View>
    )
}
