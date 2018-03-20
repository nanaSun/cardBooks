import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.title]:action.deck
      }
    case ADD_CARD :
      return {
        ...state,
        [action.card.id]:{
          ...state[action.card.id],
          questions:[
            ...state[action.card.id].questions,
            {
              key:action.card.key,
              question: action.card.question,
              answer: action.card.answer
            }
          ]
        }
      }
    default :
      return state
  }
}

export default decks