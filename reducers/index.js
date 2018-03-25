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
        [action.key]:{
          timestamp:action.timestamp,
          title:action.title,
          questions:[]
        }
      }
    case ADD_CARD :
      return {
        ...state,
        [action.id]:{
          ...state[action.id],
          questions:[
            ...state[action.id].questions,
            {
              timestamp:action.card.timestamp,
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