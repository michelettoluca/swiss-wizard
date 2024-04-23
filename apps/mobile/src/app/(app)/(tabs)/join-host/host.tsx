import { useRouter } from "expo-router"
import { Loader2 } from "lucide-react-native"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Dimensions, Text, View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { Entities } from "server/src/prisma"
import { Button } from "../../../../components/button"
import { Header } from "../../../../components/header"
import { Input } from "../../../../components/input"
import { Select } from "../../../../components/select"
import { trpc } from "../../../../lib/trpc"
import { Palette } from "../../../../styles/palette"
import { BASE, M, XL, XS, XXS, XXXL } from "../../../../styles/size"
import { Inter, Typography } from "../../../../styles/typography"

const { height } = Dimensions.get("window")

const AnimatedLoader = Animated.createAnimatedComponent(Loader2)

type FormValue = Pick<Entities["Tournament"], "name" | "format" | "roundLimit" | "timeLimit">

export default function () {
    const router = useRouter()
    const { isLoading, mutateAsync } = trpc.tournament.create.useMutation()
    const rotate = useSharedValue(0)

    useEffect(() => {
        rotate.value = withRepeat(withTiming(360, { duration: 1250, easing: Easing.linear }), -1, false)
    }, [])

    const style = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: `${rotate.value}deg`
            }
        ]
    }))

    const { control, handleSubmit, formState, getValues, watch } = useForm<FormValue>()

    async function createTournament(form: FormValue) {
        const tournament = await mutateAsync(getValues())

        router.replace(`/(app)/home/torunament/${tournament.id}`)
    }

    return (
        <View
            style={{
                backgroundColor: Palette.gray[100],
                padding: BASE,
                height: height - XXXL,
                gap: XL
            }}
        >
            <Header title="Host" />
            <View
                style={{
                    flex: 1,
                    justifyContent: "space-between"
                }}
            >
                <View style={{ gap: XS }}>
                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: true
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input label="Name" placeholder="Name" value={value ?? ""} onChange={onChange} />
                        )}
                    />
                    <View style={{ flexDirection: "row", gap: XS }}>
                        <Controller
                            control={control}
                            name="roundLimit"
                            rules={{
                                min: 0
                            }}
                            render={({ field: { onChange, value, disabled } }) => (
                                <Input
                                    style={{ flexGrow: 1 }}
                                    label="Round limit"
                                    placeholder="Auto"
                                    keyboardType="decimal-pad"
                                    value={`${value ?? ""}`}
                                    onChange={(v) => onChange(v.length ? Number(v) : null)}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="timeLimit"
                            rules={{
                                min: 0
                            }}
                            render={({ field: { onChange, value, disabled } }) => (
                                <Input
                                    style={{ flexGrow: 1 }}
                                    label="Time limit"
                                    placeholder="55"
                                    keyboardType="decimal-pad"
                                    suffix="min"
                                    value={`${value ?? ""}`}
                                    onChange={(v) => onChange(v.length ? Number(v) : null)}
                                />
                            )}
                        />
                    </View>
                    <Controller
                        control={control}
                        name="format"
                        rules={{
                            required: true
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                label="Format"
                                value={value}
                                onChange={onChange}
                                options={[
                                    { label: "Pauper", value: "PAUPER" },
                                    { label: "Modern", value: "MODERN" },
                                    { label: "Standard", value: "STANDARD" },
                                    { label: "Draft", value: "DRAFT" },
                                    { label: "Sealed", value: "SEALED" },
                                    { label: "Commander", value: "COMMANDER" }
                                ]}
                                placeholder="Format"
                            />
                        )}
                    />
                </View>
                <Button
                    size="l"
                    disabled={!formState.isValid}
                    style={{ flexDirection: "row", justifyContent: "center", gap: XXS }}
                    onPress={handleSubmit(createTournament)}
                >
                    {isLoading && (
                        <AnimatedLoader size={20} stroke={Palette.white} style={[{ height: M, width: M }, style]} />
                    )}
                    <Text
                        style={[
                            Typography.body,
                            {
                                fontFamily: Inter.medium,
                                color: Palette.white,
                                textAlign: "center"
                            }
                        ]}
                    >
                        {isLoading ? "Creating..." : "Create"}
                    </Text>
                </Button>
            </View>
        </View>
    )
}
