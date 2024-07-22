export enum CommonViolationType {
  MaxSimilarGames,
  MinimalPlayers,
  MinimalTimeSpan
}

export enum GameViolationType {
  NotFound,
  Similarity,
  Identical,
  AuthorParticipates,
  NoBots,
  NoResignations,
  NoAborts,
  NoListed
}

export enum ValidationStatus {
  Unknown,
  Success,
  Warning,
  Failure
}

export interface ValidationResponse {
  mainGameStatus: ValidationStatus
  confirmingGameNrsStatus: ValidationStatus[]
  gameViolations: GameViolations[]
  commonViolations: CommonViolations[]
  details: {
    timestamp: number
    players: number
    similarGames: number
    finalGames: number
  }
}

export type CommonViolations = {
  type: CommonViolationType
  value: string | number
  limitation: string | number
}

export type GameViolations = {
  type: GameViolationType
  gameIndex: number
}
