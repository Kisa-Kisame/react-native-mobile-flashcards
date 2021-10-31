import {
	ADD_CARD,
	ADD_DECK,
	RECEIVE_DECKS,
	DELETE_DECK,
} from '../actions/index'

export default function entries(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks,
			}
		case ADD_DECK:
			const { id } = action.deck
			return {
				...state,
				[id]: action.deck,
			}
		case DELETE_DECK:
			return {
				...action.decks,
			}
		case ADD_CARD:
			const { deckId, card } = action
			return {
				...state,
				[deckId]: {
					...state[deckId],
					cards: {
						...state[deckId].cards,
						[card.id]: card,
					},
				},
			}
		default:
			return state
	}
}
