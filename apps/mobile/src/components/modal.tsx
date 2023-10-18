import { useReducer, useEffect } from "react"
import { ObjectValues } from "../utils/typescript"
import {
	Modal as NativeModal,
	useAnimatedValue,
	Animated,
	Pressable,
} from "react-native"
import tw from "twrnc"
import { View } from "react-native"

export const MODAL_ACTION = {
	OPEN: "OPEN",
	CLOSE: "CLOSE",
	TOGGLE: "TOGGLE",
} as const

export type ModalReducerAction = ObjectValues<typeof MODAL_ACTION>

export function modalReducer(
	isVisible: boolean,
	action: ModalReducerAction
): boolean {
	switch (action) {
		case MODAL_ACTION.OPEN:
			return true
		case MODAL_ACTION.CLOSE:
			return false
		case MODAL_ACTION.TOGGLE:
			return !isVisible
	}
}

export function useModal(initialState: boolean = false) {
	const [isVisible, dispatch] = useReducer(modalReducer, initialState)

	return {
		isVisible,
		dispatch,
	}
}

type ModalProps = {} & ReturnType<typeof useModal> &
	React.ComponentProps<typeof NativeModal>

export function Modal({ isVisible, dispatch, children, ...props }: ModalProps) {
	const opacity = useAnimatedValue(0)

	useEffect(() => {
		if (isVisible) {
			Animated.timing(opacity, {
				toValue: 0.25,
				duration: 300,
				useNativeDriver: true,
			}).start()
		} else {
			Animated.timing(opacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start()
		}
	}, [isVisible])

	return (
		<>
			{isVisible && (
				<Animated.View style={[tw`absolute -inset-40 bg-black`, { opacity }]} />
			)}
			<NativeModal
				visible={isVisible}
				onRequestClose={() => dispatch(MODAL_ACTION.CLOSE)}
				{...props}>
				<View style={tw`absolute inset-0 w-full`}>
					<Pressable
						style={tw`h-full`}
						onPress={() => dispatch(MODAL_ACTION.CLOSE)}
					/>
					<View style={tw`absolute bottom-0 w-full p-6 bg-white`}>
						{children}
					</View>
				</View>
			</NativeModal>
		</>
	)
}
