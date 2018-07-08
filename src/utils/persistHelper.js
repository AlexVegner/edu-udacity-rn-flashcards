import { AsyncStorage } from 'react-native'


const DECK_STORAGE_KEY = 'MobileFlashCard:deck'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = results
    })
}

export function submitDeck({deck}){
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    deck
  }))
}
