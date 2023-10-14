import { Pressable, View } from "react-native"
import tw from "twrnc"
import { Text, fw } from "./text"
import { Match } from "server/db/entity"
import { ObjectValues } from "../utils/typescript"
import { Box } from "./box"
import { ShieldAlert } from "lucide-react-native"

export const MATCH_OUTCOME = {
	VICTORY: "VICTORY",
	DEFEAT: "DEFEAT",
	DRAW: "DRAW",
} as const

export type MatchOutcome = ObjectValues<typeof MATCH_OUTCOME>

type MatchResultProps = {
	match: Match
}

function getMatchOutcome(match: Match, currentPlayer: string): MatchOutcome {
	const { playerA, playerAScore, playerBScore } = match
	const rel =
		currentPlayer === playerA
			? playerAScore - playerBScore
			: playerBScore - playerAScore

	if (rel > 0) {
		return MATCH_OUTCOME.VICTORY
	} else if (rel < 0) {
		return MATCH_OUTCOME.DEFEAT
	} else {
		return MATCH_OUTCOME.DRAW
	}
}

export function MatchResult({ match }: MatchResultProps) {
	const outcome = getMatchOutcome(match, match.playerA)

	return (
		<Box style={tw`flex flex-col gap-2 bg-slate-100`}>
			<Text>
				<Text style={tw`text-slate-500`}>You </Text>
				{outcome == MATCH_OUTCOME.VICTORY && (
					<Text style={[tw`text-green-500`, fw.semibold]}>won</Text>
				)}
				{outcome == MATCH_OUTCOME.DEFEAT && (
					<Text style={[tw`text-red-500`, fw.semibold]}>lost</Text>
				)}
				{outcome == MATCH_OUTCOME.DRAW && (
					<Text style={[tw`text-amber-500`, fw.semibold]}>drawn</Text>
				)}
				<Text style={tw`text-slate-500`}> your last match against</Text>
			</Text>
			<Text style={[tw`text-3xl text-slate-700 capitalize`, fw.bold]}>
				{match.playerB}
			</Text>
			<Text style={tw` text-slate-500`}>with a score of</Text>
			<Text style={[tw`text-3xl text-slate-700 capitalize`, fw.bold]}>
				{match.playerAScore} - {match.playerBScore}
			</Text>
			<View style={tw`mt-4`}>
				<Text style={tw` text-slate-500`}>Is the score incorrect?</Text>
				<Text style={[tw`text-slate-700`, fw.semibold]}>
					Report it to the organizer
				</Text>
			</View>
		</Box>
	)
}
