export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDeck (decks) {
  	return {
		type: RECEIVE_DECKS,
		decks
	}
}

export function addDeck (key,title,timestamp) {
	return {
		type: ADD_DECK,
		key,
		title,
		timestamp
	}
}

export function addCard (id,card) {
	return {
		type: ADD_CARD,
		id,
		card,
	}
}