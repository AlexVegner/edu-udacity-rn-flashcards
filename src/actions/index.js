export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'


export function receiveDecks (data){
  return{
    type: RECEIVE_DECKS,
    data
  }
}

export function addDeck (data){
  return{
    type: ADD_DECK,
    data
  }
}

export function addQuestion (data){
  return{
    type: ADD_QUESTION,
    data
  }
}
