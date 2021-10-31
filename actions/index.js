export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck,
	}
}

export function deleteDeck(decks) {
	return {
		type: DELETE_DECK,
		decks,
	}
}

export function addCard(deckId, card) {
	return {
		type: ADD_CARD,
		deckId,
		card,
	}
}

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks,
	}
}
