import React from 'react'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator, DrawerNavigation } from 'react-navigation'
import DeckList from '../components/DeckList';
import DeckView from '../components/DeckView';
import NewDeck from '../components/NewDeck';
import NewQuestion from '../components/NewQuestion';
import Quiz from '../components/Quiz';
import QuizResults from '../components/QuizResults';
import { Entypo } from '@expo/vector-icons';

import { purple, white, black } from '../utils/colors'
import { StyleSheet } from 'react-native';

const tintColor = purple

export const Tabs = TabNavigator({
  DeckList:{
    screen: DeckList,
    navigationOptions:{
      tabBarLabel:'Deck',
      tabBarIcon: ({ tintColor }) => (<Entypo name='news' size={30} color={tintColor} />),
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel:'New Deck',
      tabBarIcon: ({ tintColor }) => (<Entypo name='new-message' size={30} color={tintColor} />),
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },

  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  QuizResults: {
    screen: QuizResults,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})
