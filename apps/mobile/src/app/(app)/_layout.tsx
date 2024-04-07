import { Link, Slot, Stack, usePathname, useRouter, useSegments } from "expo-router"
import { UserProvider } from "../../contexts/user"
import { Pressable, ScrollView, Text, View } from "react-native"
import { L, XL, XXL, XXXL } from "../../styles/size"
import { GRAY, WHITE } from "../../styles/color"
import { LayoutGrid, icons } from "lucide-react-native"
import { ReactNode } from "react"

export default function AppLayout() {
    return (
        <UserProvider>
            <ScrollView style={{ backgroundColor: GRAY[100] }}>
                <Slot />
            </ScrollView>
            <Navbar />
        </UserProvider>
    )
}

function Navbar() {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: XXXL,
                paddingHorizontal: L,
                backgroundColor: WHITE,
                borderTopColor: GRAY[100],
                borderTopWidth: 1,
                gap: 1
            }}
        >
            <NavItem href={""} icon={"LayoutGrid"} />
            <NavItem href={"/uno"} icon={"CirclePlus"} />
            <NavItem href={"/due"} icon={"UserRound"} />
        </View>
    )
}

type NavItemProps = {
    href: string
    icon: keyof typeof icons
}

function NavItem({ href, icon }: NavItemProps) {
    const pathname = usePathname()

    const router = useRouter()
    const isActive = pathname.startsWith(href)

    async function navigate() {
        await router.push(href)
    }

    const Icon = icons[icon]
    return (
        <Pressable onPress={navigate} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Icon height={24} width={24} stroke={isActive ? GRAY[900] : GRAY[400]} />
        </Pressable>
    )
}
