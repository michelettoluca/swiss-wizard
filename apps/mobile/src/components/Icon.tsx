import { icons, LucideIcon as LucideIconProps } from "lucide-react-native"
import { ComponentProps } from "react"

type IconProps = {
    name: keyof typeof icons
} & ComponentProps<LucideIconProps>

export function Icon({ name, ...props }: IconProps) {
    const LucideIcon = icons[name]

    return <LucideIcon {...props} />
}
