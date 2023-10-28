export const FONTS = {
	"Geist Thin": require("../../assets/fonts/Geist-Thin.otf"),
	"Geist Light": require("../../assets/fonts/Geist-Light.otf"),
	"Geist UltraLight": require("../../assets/fonts/Geist-UltraLight.otf"),
	"Geist Regular": require("../../assets/fonts/Geist-Regular.otf"),
	"Geist Medium": require("../../assets/fonts/Geist-Medium.otf"),
	"Geist SemiBold": require("../../assets/fonts/Geist-SemiBold.otf"),
	"Geist Bold": require("../../assets/fonts/Geist-Bold.otf"),
	"Geist Black": require("../../assets/fonts/Geist-Black.otf"),
	"Geist UltraBlack": require("../../assets/fonts/Geist-UltraBlack.otf"),
} as const

export type FontFamily = keyof typeof FONTS

const FONT_FAMILIES = Object.keys(FONTS) as Array<FontFamily>

export const font = FONT_FAMILIES.reduce((acc, curr) => {
	return {
		...acc,
		[curr]: { fontFamily: curr },
	}
}, {}) as Record<FontFamily, { fontFamily: FontFamily }>
