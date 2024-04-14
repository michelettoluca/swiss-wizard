import { useAuth } from "@clerk/clerk-expo"
import { Redirect, Stack } from "expo-router"
import { View } from "react-native"
import { Text } from "../../components/text"
import { UserProvider } from "../../contexts/user"

export default function () {
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    if (!isSignedIn) {
        return <Redirect href={"/"} />
    }

    return (
        <UserProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </UserProvider>
    )
}

// function Navbar() {
//     return (
//         <View
//             style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 height: XXXL,
//                 paddingHorizontal: L,
//                 backgroundColor: WHITE,
//                 borderTopColor: GRAY[100],
//                 borderTopWidth: 1,
//                 gap: 1
//             }}
//         >
//             <NavbarItem href={"/home"} icon={"LayoutGrid"} />
//             <NavbarItem href={"/join-host"} icon={"CirclePlus"} />
//             <NavbarItem href={"/profile"} icon={"UserRound"} />
//         </View>
//     )
// }

// type NavbarItemProps = {
//     href: string
//     icon: keyof typeof icons
// }

// function NavbarItem({ href, icon }: NavbarItemProps) {
//     const pathname = usePathname()

//     const router = useRouter()
//     const isActive = pathname.startsWith(href)

//     function navigate() {
//         router.replace(href)
//     }

//     const Icon = icons[icon] // This is not raccomended but I cannot be fucked right now

//     return (
//         <Pressable onPress={navigate} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//             <Icon height={24} width={24} stroke={isActive ? GRAY[900] : GRAY[400]} />
//         </Pressable>
//     )
// }
