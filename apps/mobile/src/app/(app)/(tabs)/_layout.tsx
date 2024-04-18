import { Tabs } from "expo-router"
import { LayoutGrid, PlusCircle, UserRound } from "lucide-react-native"
import React from "react"
import { Palette } from "../../../styles/palette"
import { L, XXXL } from "../../../styles/size"

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Palette.blue[500],
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    shadowRadius: 0,
                    height: XXXL,
                    paddingHorizontal: L
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    href: "home",
                    tabBarIcon: ({ color }) => <LayoutGrid stroke={color} />,
                    headerShown: false,
                    tabBarShowLabel: false
                }}
            />
            <Tabs.Screen
                name="join-host"
                options={{
                    href: "join-host",
                    tabBarIcon: ({ color }) => <PlusCircle stroke={color} />,
                    headerShown: false,
                    tabBarShowLabel: false
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    href: "profile",
                    tabBarIcon: ({ color }) => <UserRound stroke={color} />,
                    headerShown: false,
                    tabBarShowLabel: false
                }}
            />
        </Tabs>
    )
}
