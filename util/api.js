import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY'

function generateUID() {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	)
}

export function formatDeck({ title }) {
	return {
		id: 'deck-' + generateUID(),
		title,
		cards: {},
	}
}

export function formatCard({ question, answer }) {
	return {
		id: generateUID(),
		question,
		answer,
	}
}

function formatStorageResults(decks) {
	return decks === null ? {} : JSON.parse(decks)
}

export function fetchDecksData() {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatStorageResults)
}

export function createDeckData(deck) {
	return AsyncStorage.mergeItem(
		DECKS_STORAGE_KEY,
		JSON.stringify({ [deck.id]: deck })
	)
}

export function deleteDeckData(deckId) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
		const data = JSON.parse(results)
		data[deckId] = undefined
		delete data[deckId]
		AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
	})
}

export function addCardData(deckId, card) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
		const data = JSON.parse(results)
		const deck = data[deckId]
		deck.cards[card.id] = card
		AsyncStorage.mergeItem(
			DECKS_STORAGE_KEY,
			JSON.stringify({ [deckId]: deck })
		)
	})
}
