import { createContext, useContext, useState, Fragment } from "react"
import { StyleSheet, Pressable, View } from "react-native"
import Animated, {
	Easing,
	FadeIn,
	FadeInDown,
	FadeOut,
	FadeOutDown,
} from "react-native-reanimated"
import tw from "twrnc"
import { useBackPress } from "../hooks/use-back-press"

type ModalContext = {
	open: (component: React.ReactNode) => void
	close: () => void
	isOpen: boolean
}

const ModalContext = createContext<ModalContext | null>(null)

export function useModal() {
	const modal = useContext(ModalContext)

	if (!modal) {
		throw new Error("You must use ModalContext inside a ModalProvider")
	}

	return modal
}

type ModalProviderProps = {} & React.PropsWithChildren

export function ModalProvider({ children }: ModalProviderProps) {
	const [component, setComponent] = useState<React.ReactNode>(null)

	function open(component: React.ReactNode) {
		setComponent(component)
	}

	function close() {
		setComponent(null)
	}

	const isOpen = !!component

	useBackPress(() => close())

	return (
		<ModalContext.Provider
			value={{
				open,
				close,
				isOpen,
			}}>
			{children}
			{isOpen && (
				<Animated.View style={[StyleSheet.absoluteFillObject, tw`flex`]}>
					<Animated.View
						entering={FadeIn.duration(100).easing(Easing.linear)}
						exiting={FadeOut.duration(100).easing(Easing.linear)}
						style={[
							tw`absolute inset-0`,
							{
								backgroundColor: "rgba(0, 0, 0, 0.5)",
							},
						]}>
						<Pressable style={tw`flex-1`} onPress={() => close()} />
					</Animated.View>
					<Animated.View
						style={tw`mt-auto bg-white rounded-t-3xl overflow-hidden`}
						entering={FadeInDown.duration(100).easing(Easing.linear)}
						exiting={FadeOutDown.duration(100).easing(Easing.linear)}>
						<View
							style={tw`w-16 h-1 rounded-full bg-slate-200 mx-auto mt-4 mb-2`}
						/>
						{component}
					</Animated.View>
				</Animated.View>
			)}
		</ModalContext.Provider>
	)
}
