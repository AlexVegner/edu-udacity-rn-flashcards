import {RECEIVE_DECKS,ADD_DECK,ADD_QUESTION} from '../actions/index'
import { initialState } from '../utils/dummyData'

function decks (state = initialState, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return{
        ...state
      }
    case ADD_DECK:
      return{
        ...state,
       decks: state.decks.concat(action.data.deck)
      }
    case ADD_QUESTION:
      let newList = state.decks.map((deck) => {
          if (deck.id === action.data.id) {
            deck.questions.push(action.data.question)
            return deck
          }else {
            return deck
          }
       });
      return {
        decks: newList
      }
    default:
      return state
  }
}

export default decks
