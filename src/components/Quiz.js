import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { TextButton } from '../views/TextButton'
import { white, green, red, orange } from '../utils/colors'


class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'Quiz'
  })
  constructor(props){
    super(props);
    console.log(props)
    this.state= {
         id: '',
         title: '',
         questions: [],
         actualQuestion:'',
         index: 1,
         value:'',
         corrects: 0,
         cardsLeft:0
      }
  }
  componentDidMount(){
    const {decks} = this.props
    const {id} = this.props.navigation.state.params
    for (var i=0;i<decks.length;i++){
      if(id === decks[i].id){
         this.setState({
           id: decks[i].id,
           title: decks[i].title,
           questions: decks[i].questions,
           actualQuestion: decks[i].questions[0],
           cardsLeft: decks[i].questions.length - 1
         })
      }
    }
  }
  evaluateAnswer = (answer) =>{
    const {actualQuestion,questions,index,corrects,id,title} = this.state
    let test = 0
    if((answer === 'Yes' && answer === actualQuestion.answer)
      || (answer === 'No' && actualQuestion.answer !== 'Yes')){
      if(index == questions.length){
        test = corrects + 1
      }else{
        this.setState({
          corrects: corrects + 1
        })
      }
    }else{
       test = corrects
    }
    if(index < questions.length){
     this.setState({
       index: index + 1 ,
       actualQuestion: questions[index],
       cardsLeft: questions.length - index - 1
     })
   }else{
     const { navigate } = this.props.navigation
     navigate('QuizResults',{id:id, corrects:test, length:questions.length, titleDeck: title})
   }
  }
  render() {
    const {id,title,questions,actualQuestion,index,cardsLeft} = this.state
      return (
        <View style={styles.container}>
          <Text>{`Cards left: ${cardsLeft}`}</Text>
          <TextButton
            styleBtn={styles.submitBtnAnswer}
            styleTxt={styles.submitBtnText}
            onPress={() => alert(`The answer is: ${actualQuestion.answer}`)}>
            Show answer
          </TextButton>
          <Text style={styles.titleText}>{`${actualQuestion.question}`}</Text>
          <Text style={styles.questionsLengthText}>{`${index} test`}</Text>
          <TextButton
            styleBtn={styles.submitBtnCorrect}
            styleTxt={styles.submitBtnText}
            onPress={()=> this.evaluateAnswer("Yes")}>
            Correct
          </TextButton>
          <TextButton
            styleBtn={styles.submitBtnIncorrect}
            styleTxt={styles.submitBtnText}
            onPress={()=> this.evaluateAnswer("No")}>
             Incorrect
          </TextButton>

        </View>
      )

  }
}

function mapStateToProps (state) {
  const {decks} = state
  return{
    decks
  }
}

export default connect(
  mapStateToProps
)(Quiz)

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
  submitBtnAnswer:{
    backgroundColor: orange,
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
