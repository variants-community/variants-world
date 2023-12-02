// Used on client only

import { CommonViolationType, GameViolationType, type ValidationResponse } from 'utils/games-validation'
import { formatDuration } from 'utils/hepers'

const formatGameIndices = (indices: number[]) =>
  indices.length > 1 ? `Games ${indices.slice(0, -1).join(', ')} and ${indices.at(-1)} are` : `Game ${indices[0]} is`

const gamesViolationMessages: Record<GameViolationType, (listIs: string) => string> = {
  [GameViolationType.Identical]: listIs => `${listIs} identical`,
  [GameViolationType.NotFound]: listIs => `${listIs} not found`,
  [GameViolationType.Similarity]: listIs => `${listIs} not similar to the main version`,
  [GameViolationType.AuthorParticipates]: listIs => `${listIs} played without the author of submission`,
  [GameViolationType.NoBots]: listIs => `${listIs} played with bots`,
  [GameViolationType.NoResignations]: listIs => `${listIs} have early resignations`,
  [GameViolationType.NoAborts]: listIs => `${listIs} aborted`
}

const commonViolationMessages: Record<
  CommonViolationType,
  (value: string | number, limitation: string | number) => string
> = {
  [CommonViolationType.MaxSimilarGames]: (value, limitation) =>
    `At most ${limitation} testing games are allowed to have minor changes. (provided ${value})`,
  [CommonViolationType.MinimalPlayers]: (value, limitation) =>
    `There are only ${value} unique players (required ${limitation})`,
  [CommonViolationType.MinimalTimeSpan]: value =>
    `The testing games are played within a span of only ${formatDuration(+value)}`
}

export const createViolationMessages = (res: ValidationResponse, confirmingGameNrs: string[]) => {
  if (!confirmingGameNrs.some(Boolean)) return []

  const violations: string[] = res.commonViolations.map(v => commonViolationMessages[v.type](v.value, v.limitation))

  const identicalGames: Record<string, number[]> = {}

  const violationsMap: Record<GameViolationType, number[]> = {
    [GameViolationType.Identical]: [],
    [GameViolationType.NotFound]: [],
    [GameViolationType.Similarity]: [],
    [GameViolationType.AuthorParticipates]: [],
    [GameViolationType.NoBots]: [],
    [GameViolationType.NoResignations]: [],
    [GameViolationType.NoAborts]: []
  }

  for (const { type, gameIndex } of res.gameViolations) {
    if (type === GameViolationType.Identical) {
      const gameNr = confirmingGameNrs[gameIndex]
      if (!identicalGames[gameNr]) identicalGames[gameNr] = []
      identicalGames[gameNr].push(gameIndex + 2)
    } else {
      violationsMap[type].push(gameIndex + 2)
    }
  }

  for (const violationAsKey of Object.keys(violationsMap)) {
    const enumKey = parseInt(violationAsKey) as GameViolationType
    const value = violationsMap[enumKey]
    if (value.length) violations.push(gamesViolationMessages[enumKey](formatGameIndices(value)))
  }

  for (const identicalGameIndices of Object.values(identicalGames)) {
    violations.push(gamesViolationMessages[GameViolationType.Identical](formatGameIndices(identicalGameIndices)))
  }
  return violations
}
