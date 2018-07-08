import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { white, black, gray, purple } from '../utils/colors'
import { connect } from 'react-redux';
import { TextButton } from '../views/TextButton'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title: navigation.state.params.title
    }
  }
  constructor(props){
    super(props);
    this.state= {
         id: '',
         title: '',
         questions: [],
         value:''
      }
  }
  componentWillMount(){
    const {decks} = this.props
    const {id} = this.props.navigation.state.params
    for (var i=0;i<decks.length;i++){
      if(id === decks[i].id){
         this.setState({
           id: decks[i].id,
           title: decks[i].title,
           questions: decks[i].questions
         })
      }
    }
  }
  render() {
    const { id,title,questions } = this.state
    const { navigate } = this.props.navigation
      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>{`${title}`}</Text>
          <Text style={styles.questionsLengthText}>{`${questions.length} cards`}</Text>
          <TextButton
            styleBtn={styles.submitBtnAdd}
            styleTxt={styles.submitBtnTextAdd}
            onPress={() => navigate('NewQuestion', {id: id})}>
            Add Question
          </TextButton>
          <TextButton
            styleBtn={styles.submitBtnQuiz}
            styleTxt={styles.submitBtnTextQuiz}
            onPress={() => navigate('Quiz', {id: id,titleDeck: title})}>
             Start Quiz
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
)(DeckView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center',
  },
  submitBtnAdd: {
    backgroundColor: white,
    padding: 10,
    paddingRight:40,
    paddingLeft:40,
    marginTop:20,
    height: 45,
    borderRadius: 3,
    borderColor: purple,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnQuiz: {
     backgroundColor: purple,
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
  submitBtnTextAdd: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 80,
    color: black
  },
  submitBtnTextQuiz: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 80,
    color: white,
  },
  titleText: {
    marginTop:100,
    alignItems: 'center',
    fontSize: 30,
    marginBottom:20,
  },
  questionsLengthText:{
    alignItems: 'center',
    fontSize: 15,
    color:gray,
    marginBottom:100
  },
})
