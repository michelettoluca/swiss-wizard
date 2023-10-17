import { View, Pressable, ScrollView } from "react-native"
import tw from "twrnc"
import { ChevronRight, Crown, ShieldAlert } from "lucide-react-native"
import React from "react"
import { StandingsTable } from "../components/standings-table"
import { STANDINGS } from "../utils/mock"
import { Section } from "../components/section"
import { Text, fw } from "../components/text"
import { MatchResult } from "../components/match-result"
import { ObjectValues } from "../utils/typescript"
import { Box } from "../components/box"
import { useState } from "react"

type TournamentProps = {}

export function Tournament({}: TournamentProps) {
	const [matchStatus, setMatchStatus] = useState<MatchStatus>(
		MATCH_STATUS.IN_PROGRESS
	)

	return (
		<ScrollView>
			<View style={tw`flex py-16 gap-8`}>
				<View style={tw`px-6`}>
					<Text style={[tw`text-2xl text-slate-900`, fw.bold]}>
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
					<Box style={tw`flex flex-col gap-2 bg-slate-200`}>
						<Text style={tw`text-slate-600`}>
							<Text style={fw.medium}>Round 1</Text> has begun, your opponent is
						</Text>
						<Text style={[tw`text-3xl text-slate-700 capitalize`, fw.bold]}>
							{STANDINGS[0].name}
						</Text>
						<Text style={tw`text-slate-600`}>playing at table</Text>
						<Text style={[tw`text-3xl text-slate-700 capitalize`, fw.bold]}>
							12
						</Text>
						<Pressable
							style={tw`py-3 px-6 bg-slate-700 self-end rounded-full`}
							onPress={() => setMatchStatus("ENDED")}>
							<Text style={[tw`text-white`, fw.semibold]}>Submit result</Text>
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
					icon={<Crown size={20} style={tw`text-slate-600`} />}
					title="Standings">
					<StandingsTable standings={STANDINGS} />
					<View
						style={tw`flex flex-row gap-2 mt-8 items-center justify-end px-6`}>
						<Text style={[tw`text-slate-700`, fw.semibold]}>
							View full standings
						</Text>
						<ChevronRight size={20} style={tw`text-slate-700`} />
					</View>
				</Section>
			</View>
		</ScrollView>
	)
}

export const MATCH_STATUS = {
	IN_PROGRESS: "IN_PROGRESS",
	ENDED: "ENDED",
} as const

export type MatchStatus = ObjectValues<typeof MATCH_STATUS>

export function ActionRequired() {
	return (
		<Box style={tw`flex flex-col gap-4 bg-indigo-500`}>
			<View style={tw`flex flex-row items-center gap-2`}>
				<ShieldAlert style={tw`text-white`} size={18} />
				<Text style={[tw`text-white`, fw.semibold]}>Action required</Text>
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
				<Text style={[tw`text-indigo-500`, fw.semibold]}>Take action</Text>
			</Pressable>
		</Box>
	)
}
