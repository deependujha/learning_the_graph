import {
  GameEnded as GameEndedEvent,
  GameStarted as GameStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlayerJoined as PlayerJoinedEvent
} from "../generated/RandomWinnerGame/RandomWinnerGame"
import {
  Game
} from "../generated/schema"

export function handleGameEnded(event: GameEndedEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Game.load(event.params.gameId.toString());
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    return;
  }
  // Entity fields can be set based on event parameters
  entity.winner = event.params.winner;
  entity.requestId = event.params.requestId;
  // Entities can be written to the store with `.save()`
  entity.save();
}

export function handleGameStarted(event: GameStartedEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Game.load(event.params.gameId.toString());
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Game(event.params.gameId.toString());
    entity.players = [];
  }
  // Entity fields can be set based on event parameters
  entity.maxPlayers = event.params.maxPlayers;
  entity.entryFee = event.params.entryFee;
  // Entities can be written to the store with `.save()`
  entity.save();
  
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  
}

export function handlePlayerJoined(event: PlayerJoinedEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Game.load(event.params.gameId.toString());
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    return;
  }
  // Entity fields can be set based on event parameters
  let newPlayers = entity.players;
  newPlayers.push(event.params.player);
  entity.players = newPlayers;
  // Entities can be written to the store with `.save()`
  entity.save();
}
