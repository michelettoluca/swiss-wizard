import { useEffect, useRef } from "react"
import { BackHandler } from "react-native"

export function useBackPress(callback: () => void) {
	const cb = useRef(callback)

	useEffect(() => {
		cb.current = callback

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				cb.current()
				return true
			}
		)

		return () => backHandler.remove()
	}, [])
}
