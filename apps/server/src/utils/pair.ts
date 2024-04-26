import { User } from "@prisma/client"

type Summary = {
    playerId: number
    matches: {
        wins: number
        draws: number
        losses: number
    }
    games: {
        wins: number
        draws: number
        losses: number
    }
    byes: number
    opponents: []
    score: number
}

type Standing = {
    ogw: number
    omw: number
    gw: number
} & Summary

export const BYE: Readonly<Standing> = {
    playerId: -1,
    matches: {
        wins: 0,
        draws: 0,
        losses: 0
    },
    games: {
        wins: 0,
        draws: 0,
        losses: 0
    },
    byes: 0,
    opponents: [],
    score: 0,
    ogw: 0,
    omw: 0,
    gw: 0
}

export function calculateSummaries(players: User[]): Record<User["id"], Summary> {
    const summaries: Record<User["id"], Summary> = {}

    for (const player of players) {
        const summary: Summary = {
            playerId: player.id,
            score: 0,
            matches: {
                wins: 0,
                losses: 0,
                draws: 0
            },
            games: {
                wins: 0,
                losses: 0,
                draws: 0
            },
            byes: 0,
            opponents: []
        }

        for (const match of player.matches) {
            let playerAScore: number
            let playerBScore: number
            let opponent: User

            if (match.playerA.id === player.id) {
                playerAScore = match.playerAScore
                playerBScore = match.playerBScore
                opponent = match.playerB
            } else {
                playerAScore = match.playerBScore
                playerBScore = match.playerAScore
                opponent = match.playerA
            }

            summary.games.wins += playerAScore
            summary.games.losses += playerBScore
            summary.games.draws += playerAScore === playerBScore ? 1 : 0

            summary.matches.wins += playerAScore > playerBScore ? 1 : 0
            summary.matches.losses += playerAScore < playerBScore ? 1 : 0
            summary.matches.draws += playerAScore == playerBScore ? 1 : 0

            if (match.playerB.id === uuid.NIL) {
                summary.byes += 1
            } else {
                summary.opponents.push(opponent)
            }
        }

        summaries[player.id] = summary
    }

    return summaries
}

const MIN_OGW = 1 / 3

export function calculateStandings(summaries: Record<Player["id"], Summary>): Standing[] {
    // const _players: Player[] = []
    // const _summaries = calculateSummaries(_players)
    const standings: Standing[] = []

    for (const summary of Object.values(summaries)) {
        const standing: Standing = {
            ...summary,
            omw: 0,
            ogw: 0,
            gw: 0
        }

        for (const opponent of summary.opponents) {
            const opponentSummary = summaries[opponent.id]

            const opponentTotalMatchesPlayed =
                opponentSummary.matches.wins + opponentSummary.matches.losses + opponentSummary.matches.draws

            const omw = opponentSummary.matches.wins / opponentTotalMatchesPlayed

            standing.omw += Math.min(omw, MIN_OGW)

            const opponentTotalGamesPlayed =
                opponentSummary.games.wins + opponentSummary.games.losses + opponentSummary.games.draws

            standing.ogw = opponentSummary.games.wins / opponentTotalGamesPlayed
        }

        const opponentCount = summary.opponents.length

        standing.omw /= opponentCount
        standing.ogw /= opponentCount

        const totalGamesPlayed = summary.games.wins + summary.games.losses + summary.games.draws

        standing.ogw = summary.games.wins / totalGamesPlayed
        standing.gw = opponentCount

        standings.push(standing)
    }

    return standings.sort((a, b) => b.score - a.score || b.omw - a.omw || b.gw - a.gw || b.ogw - a.ogw)
}

export function randomizeStandings(standings: Standing[]): Standing[] {
    standings = [...standings]

    let groupStart = 0

    for (let i = 0; i < standings.length; i++) {
        if (standings[groupStart].score !== standings[i].score || i === standings.length - 1) {
            const group = standings.slice(groupStart, i + 1)

            const randomized = randomize(group)
            standings.splice(groupStart, i - groupStart + 1, ...randomized) // ??? Don't remebmer this

            groupStart = i
        }
    }

    return standings
}

export function pair(standings: Standing[]) {
    const randomizedStandings = randomizeStandings(standings)

    if (randomizedStandings.length % 2 == 1) {
        randomizedStandings.push(BYE)
    }

    const matches: Match[] = []

    while (randomizedStandings.length) {
        const playerA = randomizedStandings.shift()!.player

        const playerB = findOpponent(playerA, randomizedStandings)

        // Remove matched player
        const playerBIndex = randomizedStandings.findIndex((s) => s.player.id === playerB.id)
        randomizedStandings.splice(playerBIndex, 1)

        matches.push({
            playerA,
            playerB,
            playerAScore: playerB.id === uuid.NIL ? 2 : 0,
            playerBScore: 0
        })
    }

    return matches
}

// This assumes the standings are already randomized and `player` is removed from the standings
export function findOpponent(player: Player, standings: Standing[]): Player {
    for (let i = 0; i < standings.length; i++) {
        const opponent = standings[i].player

        if (!playedOnce(player, opponent)) {
            return opponent
        }
    }

    // If played all opponents pick at random
    return pickRandom(standings).player
}

export function playedOnce(playerA: Player, playerB: Player): boolean {
    return playerA.matches.some((p) => p.playerA.id === playerB.id || p.playerB.id === playerB.id)
}
