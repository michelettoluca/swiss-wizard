import { View, ScrollView } from "react-native"
import { Dimensions } from "react-native"
import { Text } from "./text"
import { Standing } from "server/db/entity"
import tw from "twrnc"
import { MoreHorizontal } from "lucide-react-native"

const { width: SCREEN_WIDTH } = Dimensions.get("screen")

function calcRelativeWitdth(percentage: number) {
	return percentage * (SCREEN_WIDTH / 100)
}
type StandingsTableProps = {
	standings: Standing[]
}

export function StandingsTable({ standings }: StandingsTableProps) {
	const SPLIT_AT = 8
	const top8 = standings.slice(0, SPLIT_AT)
	const rest = standings.slice(SPLIT_AT)

	const aa = standings.length > 8 ? [...top8, null, ...rest] : top8

	return (
		<Body>
			<Row>
				<Cell relativeWidth={20} style={tw`pl-6`}>
					<Text style={tw`text-zinc-400`}>#</Text>
				</Cell>
				<Cell relativeWidth={55}>
					<Text style={tw`text-zinc-400`}>Name</Text>
				</Cell>
				<Cell relativeWidth={25} style={tw`pr-6`}>
					<Text style={tw`text-zinc-400 text-right`}>Points</Text>
				</Cell>
				<Cell relativeWidth={25}>
					<Text style={tw`text-zinc-400 text-center`}>OMW%</Text>
				</Cell>
				<Cell relativeWidth={25}>
					<Text style={tw`text-zinc-400 text-center`}>GW%</Text>
				</Cell>
				<Cell relativeWidth={25}>
					<Text style={tw`text-zinc-400 text-center`}>OGW%</Text>
				</Cell>
			</Row>

			{aa.map((standing, i) =>
				standing ? (
					<Row key={standing.id}>
						<Cell relativeWidth={20} style={tw`pl-6`}>
							<Text>{i + 1}</Text>
						</Cell>
						<Cell relativeWidth={55}>
							<Text style={tw`text-base`}>{standing.name}</Text>
						</Cell>
						<Cell relativeWidth={25} style={tw`pr-6`}>
							<Text style={tw`text-right`}>{standing.points}</Text>
						</Cell>
						<Cell relativeWidth={25}>
							<Text style={tw`text-center`}>{standing.omw.toFixed(2)}</Text>
						</Cell>
						<Cell relativeWidth={25}>
							<Text style={tw`text-center`}>{standing.gw.toFixed(2)}</Text>
						</Cell>
						<Cell relativeWidth={25}>
							<Text style={tw`text-center`}>{standing.ogw.toFixed(2)}</Text>
						</Cell>
					</Row>
				) : (
					<Row key={"null"}>
						<Cell relativeWidth={100} style={tw`pl-6`}>
							{/* Magia strana, non ho ben capito perchè senza wrapparlo dimezza l'altezza */}
							<Text style={tw`pt-[2px]`}>
								<MoreHorizontal style={tw`text-zinc-400`} size={20} />
							</Text>
						</Cell>
					</Row>
				)
			)}
		</Body>
	)
}

type BodyProps = {} & React.PropsWithChildren

function Body({ children }: BodyProps) {
	return (
		<ScrollView horizontal={true} style={[tw`mt-4`, { width: SCREEN_WIDTH }]}>
			<View style={tw`flex flex-col`}>{children}</View>
		</ScrollView>
	)
}

type RowProps = {} & React.PropsWithChildren

function Row({ children }: RowProps) {
	return (
		<View
			style={tw`flex flex-row items-baseline border-b border-b-zinc-100 py-3`}>
			{children}
		</View>
	)
}

type CellProps = {
	relativeWidth: number
} & React.PropsWithChildren &
	React.ComponentProps<typeof View>

function Cell({ relativeWidth, children, style, ...props }: CellProps) {
	return (
		<View
			style={[{ width: calcRelativeWitdth(relativeWidth) }, style]}
			{...props}>
			{children}
		</View>
	)
}
