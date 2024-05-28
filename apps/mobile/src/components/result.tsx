import { Text, View } from "react-native"
import { Palette } from "../styles/palette"
import { BASE, M, XS, XXS, XXXS } from "../styles/size"
import { Typography } from "../styles/typography"
import { Badge, BadgeTheme } from "./badge"

type PlayerResultProps = {
    opponent: {
        firstName: string
        lastName: string
    }
    wins: number
    losses: number
    omw: number
    gw: number
    ogw: number
}

export function PlayerResult({ opponent, wins, losses, omw, gw, ogw }: PlayerResultProps) {
    let badgeTheme: BadgeTheme
    let badgeContent: string

    if (wins > losses) {
        badgeTheme = "emerald"
        badgeContent = "W"
    } else if (wins < losses) {
        badgeTheme = "red"
        badgeContent = "L"
    } else {
        badgeTheme = "amber"
        badgeContent = "D"
    }

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: BASE,
                paddingRight: M,
                backgroundColor: Palette.white,
                borderRadius: XS
            }}
        >
            <View
                style={{
                    gap: XXXS
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: XXS
                    }}
                >
                    <Badge theme={badgeTheme}>{badgeContent}</Badge>
                    <Text style={Typography.body}>
                        {opponent.firstName} {opponent.lastName}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: XXS
                    }}
                >
                    <Badge theme="gray">OMW {omw.toFixed(2)}</Badge>
                    <Badge theme="gray">GW {gw.toFixed(2)}</Badge>
                    <Badge theme="gray">OGW {ogw.toFixed(2)}</Badge>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text style={[Typography.body, { fontSize: BASE }]}>{wins}</Text>
                <Text style={[Typography.body, { color: Palette.gray[400] }]}> - </Text>
                <Text style={[Typography.body, { fontSize: BASE }]}>{losses}</Text>
            </View>
        </View>
    )
}
