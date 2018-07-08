import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { TextButton } from '../views/TextButton'
import { white, green, red } from '../utils/colors'
import { NavigationActions } from 'react-navigation'


class QuizResults extends Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'Quiz Results'
  })
  constructor(props){
    super(props);
    this.state= {
         porcentaje: '',
      }
  }
  componentDidMount(){
    const {corrects,length} = this.props.navigation.state.params
    let porcentaje = (corrects / length) * 100
    this.setState({porcentaje})
  }
  render() {
    const { porcentaje }  = this.state
    const {id} = this.props.navigation.state.params
    const { navigate, back} = this.props.navigation
      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>{`You have answered correct ${porcentaje} % of the questions`}</Text>
          <TextButton
            styleBtn={styles.submitBtnCorrect}
            styleTxt={styles.submitBtnText}
             onPress={() => navigate('Quiz',{id:id})}>
            Restart Quiz
          </TextButton>
          <TextButton
            styleBtn={styles.submitBtnIncorrect}
            styleTxt={styles.submitBtnText}
            onPress={() => {
              navigate('DeckView',{id:id})
            }}>
             Back to deck
          </TextButton>
        </View>
      )

  }
}
export default QuizResults

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center',
  },
  submitBtnCorrect: {
    backgroundColor: green,
    padding: 10,
    paddingRight:40,
    paddingLeft:40,
    marginTop:20,
    height: 45,
    borderRadius: 3,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnIncorrect: {
     backgroundColor: red,
     padding: 10,
     paddingRight:40,
     paddingLeft:40,
     marginTop:20,
     height: 45,
     borderRadius: 3,
     borderWidth:1,
     justifyContent: 'center',
     alignItems: 'center',
   },
  submitBtnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 80,
    color: white
  },
  titleText: {
    marginTop:100,
    alignItems: 'center',
    fontSize: 30,
    marginBottom:20,
  }
})
