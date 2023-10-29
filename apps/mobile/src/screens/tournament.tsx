import { View, Pressable, ScrollView } from "react-native"
import tw from "twrnc"
import { ChevronRight, Crown, ShieldAlert } from "lucide-react-native"
import React, { useState } from "react"
import { StandingsTable } from "../components/standings-table"
import { STANDINGS } from "../utils/mock"
import { Section } from "../components/section"
import { MatchResult } from "../components/match-result"
import { ObjectValues } from "../utils/typescript"
import { Box } from "../components/box"
import { useModal } from "../components/modal"
import { font } from "../constants/fonts"
import { Text } from "../components/text"

type TournamentProps = {}

export function Tournament({}: TournamentProps) {
	const [matchStatus, setMatchStatus] = useState<MatchStatus>(
		MATCH_STATUS.IN_PROGRESS
	)

	const modal = useModal()

	return (
		<View style={tw`flex flex-1`}>
			<ScrollView>
				<View style={tw`flex gap-8`}>
					<View style={tw`px-6 bg-white`}>
						<Text style={[tw`text-2xl text-zinc-900`, font["Geist Bold"]]}>
							LPM - Tappa #1
						</Text>
						<Text style={tw`mt-2`}>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s.
						</Text>
					</View>
					<ActionRequired />
					{matchStatus === MATCH_STATUS.IN_PROGRESS ? (
						<Box style={tw`flex flex-col gap-2`}>
							<Text style={tw`text-zinc-600`}>
								<Text style={font["Geist Medium"]}>Round 1</Text> has begun,
								your opponent is
							</Text>
							<Text
								style={[
									tw`text-3xl text-zinc-700 capitalize`,
									font["Geist Bold"],
								]}>
								{STANDINGS[0].name}
							</Text>
							<Text style={tw`text-zinc-600`}>playing at table</Text>
							<Text
								style={[
									tw`text-3xl text-zinc-700 capitalize`,
									font["Geist Bold"],
								]}>
								12
							</Text>
							<Pressable
								style={tw`py-3 px-6 bg-zinc-700 self-end rounded-full`}
								onPress={() =>
									modal.open(
										<MatchResult
											match={{
												playerA: "Io",
												playerAScore: 2,
												playerB: STANDINGS[0].name,
												playerBScore: 1,
											}}
										/>
									)
								}>
								<Text style={[tw`text-white`, font["Geist SemiBold"]]}>
									Submit result
								</Text>
							</Pressable>
						</Box>
					) : (
						<MatchResult
							match={{
								playerA: "Io",
								playerAScore: 2,
								playerB: STANDINGS[0].name,
								playerBScore: 1,
							}}
						/>
					)}
					<Section
						icon={<Crown size={20} style={tw`text-zinc-600`} />}
						title="Standings">
						<StandingsTable standings={STANDINGS} />
						<View
							style={tw`flex flex-row gap-2 mt-8 items-center justify-end px-6`}>
							<Text style={[tw`text-zinc-700`, font["Geist SemiBold"]]}>
								View full standings
							</Text>
							<ChevronRight size={20} style={tw`text-zinc-700`} />
						</View>
					</Section>
				</View>
			</ScrollView>
		</View>
	)
}

export const MATCH_STATUS = {
	IN_PROGRESS: "IN_PROGRESS",
	ENDED: "ENDED",
} as const

export type MatchStatus = ObjectValues<typeof MATCH_STATUS>

export function ActionRequired() {
	return (
		<Box style={tw`flex flex-col gap-4 bg-red-500`}>
			<View style={tw`flex flex-row items-center gap-2`}>
				<ShieldAlert style={tw`text-white`} size={18} />
				<Text style={[tw`text-white`, font["Geist SemiBold"]]}>
					Action required
				</Text>
			</View>
			<View>
				<Text style={tw`text-white`}>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</Text>
				{["· 3 incorrect results reported", "· 2 missing results"].map(
					(text) => (
						<Text key={text} style={tw`text-white`}>
							{text}
						</Text>
					)
				)}
			</View>
			<Pressable
				style={tw`py-3 px-6 bg-white self-end rounded-full`}
				onPress={() => console.log("admin: take action")}>
				<Text style={[tw`text-red-500`, font["Geist SemiBold"]]}>
					Take action
				</Text>
			</Pressable>
		</Box>
	)
}
