import { useEffect, useRef } from "react"
import { BackHandler } from "react-native"

export function useBackPress(
	callback: Parameters<typeof BackHandler.addEventListener>[1]
) {
	const cb = useRef(callback)
	cb.current = callback

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
			cb.current()
		)

		return () => backHandler.remove()
	}, [])
}
