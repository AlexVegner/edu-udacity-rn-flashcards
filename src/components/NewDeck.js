import React,{Component} from 'react'
import { View,Text,StyleSheet,TextInput } from 'react-native'
import { white, black, purple } from '../utils/colors'
import {UUID} from '../utils/helpers'
import { TextButton }  from '../views/TextButton'
import { submitDeck } from '../utils/persistHelper'
import { connect } from 'react-redux'
import { addDeck } from '../actions/index'

class NewDeck extends Component {
  constructor(props){
    super(props);
    this.state= {
          title:'',
      }
  }

  addDeck = () =>{
    const { title } = this.state
    const { dispatch } = this.props
    const { goBack } = this.props.navigation

    if(!!title){
      const deck =
         {
          id:UUID(),
          title:title,
          questions:[]
        }
      dispatch(addDeck({deck}))
      submitDeck({deck})

      this.setState({title:''})
      alert(`Deck ${title} has been added`)
      goBack()
    }else{
      alert(`Title can't be empty`)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={(title) => this.setState({title})}
          placeholder='Deck Title'
          >
        </TextInput>
        <TextButton
          styleBtn={styles.submitBtn}
          styleTxt={styles.submitBtnText}
          onPress={this.addDeck}>
          Submit
        </TextButton>
      </View>
    )
  }
}
function mapStateToProps(state){
  const {decks} = state
  return {
    decks
  }
}
export default connect(
  mapStateToProps
)(NewDeck)

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
