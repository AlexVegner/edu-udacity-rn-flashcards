import React, { Component } from 'react'
import { View, Text,TextInput,StyleSheet } from 'react-native'
import { white, black, purple } from '../utils/colors'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as index from '../actions/index.js';
import { TextButton } from '../views/TextButton'

class NewQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title: 'Add Question'
    }
  }
  constructor(props){
    super(props);
    this.state= {
         question:'',
         answer:''
      }
  }
  addQuestion = () =>{
    const { question,answer } = this.state
    const { navigate } = this.props.navigation
    const {id} = this.props.navigation.state.params
    const { goBack } = this.props.navigation

    if(!!question && !!answer){
      const data ={
        question:
          {
            question:question,
            answer:answer
          },
        id:this.props.navigation.state.params.id
      }
      this.props.addQuestion(data)
      alert(`Question ${question} has been added`)
      goBack()
    }else{
      alert(`You need to enter a question and an answer`)
    }
  }
  render() {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={this.state.question}
            onChangeText={(question) => this.setState({question})}
            placeholder='Enter Question'
            >
          </TextInput>
          <TextInput
            style={styles.input}
            value={this.state.answer}
            onChangeText={(answer) => this.setState({answer})}
            placeholder='Enter Answer'
            >
          </TextInput>
          <TextButton
            styleBtn={styles.submitBtn}
            styleTxt={styles.submitBtnText}
            onPress={this.addQuestion}>
            Add Question
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
function mapDispatchToProps (dispatch){
  const {addQuestion} = bindActionCreators(index, dispatch)
  return{
    addQuestion
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuestion)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 20,
    marginTop:20,
    height: 45,
    borderRadius: 10,
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
  input: {
   width:300,
   height:44,
   padding:8,
   borderWidth:1,
   borderColor:'#757575',
   margin:20,
   marginTop:40,
  },
  text:{
    width:300,
    textAlign: 'center',
    fontSize: 40,
    color: black,
  }
})
