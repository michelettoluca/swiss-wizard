import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import { Input } from "../../../components/input"
import { Size } from "../../../styles/size"
import { Page } from "../../../components/page"
import { Palette } from "../../../styles/palette"

export default function () {
    const { control } = useForm({})

    return (
        <Page backgroundColor={Palette.gray["100"]} title={"Create tournament"}>
            <View style={{ padding: Size.BASE, gap: Size.XS }}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, value } }) => (
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
                        render={({ field: { onChange, value } }) => (
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
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Round limit"
                                placeholder="4"
                                onChange={onChange}
                                value={value}
                                style={{ flex: 1 }}
                            />
                        )}
                        name="roundLimit"
                    />
                </View>
                <View>
                    <Text> OOO </Text>
                </View>
            </View>
        </Page>
    )
}
