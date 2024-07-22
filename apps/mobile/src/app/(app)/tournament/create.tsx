import { MoreVertical } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import { Pressable, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Header } from "../../../components/header"
import { Input } from "../../../components/input"
import { Paywall } from "../../../components/paywall"
import { Palette } from "../../../styles/palette"
import { Size } from "../../../styles/size"

export default function () {
    const insets = useSafeAreaInsets()
    const { control, register } = useForm({})

    return (
        <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
            <Header title="Create tournament" />
            <View style={{ padding: Size.BASE, gap: Size.XS }}>
                <Pressable
                    style={{
                        alignSelf: "flex-end",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Palette.white,
                        height: 40,
                        width: 40,
                        borderRadius: Size.XS
                    }}
                >
                    <MoreVertical stroke={Palette.gray[900]} size={20} />
                </Pressable>
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
        </ScrollView>
    )
}
