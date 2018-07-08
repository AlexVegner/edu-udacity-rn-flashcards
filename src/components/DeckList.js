import React,{ Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { white, gray } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux';
import * as index from '../actions/index.js';
import Hr from 'react-native-hr'
import { receiveDecks } from '../actions/index'
import { getDecks } from '../utils/persistHelper'


class DeckList extends Component {
  constructor(props){
    super(props);
    this.state= {
          title:'',
      }
  }
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(receiveDecks())
    getDecks()

    clearLocalNotification()
    .then(setLocalNotification())
  }
  keyExtractor = (item, index) => item.id;
  render() {
    const { navigate } = this.props.navigation
    if(this.props.decks !== undefined && this.props.decks.length > 0){
      return(
        <FlatList
          data={this.props.decks}
          keyExtractor={this.keyExtractor}
          renderItem={({item}) =>
            <TouchableOpacity
                onPress={() => navigate(
                  'DeckView',
                  {id: item.id,title: item.title}
                )}
              >
            <View style={styles.container}>
               <Text style={styles.titleText}>{`${item.title}`}</Text>
               <Text style={styles.questionsLengthText}>{`${item.questions.length} cards`}</Text>
               <Hr lineColor='black'/>
            </View>
            </TouchableOpacity>
        }
        />
    )}
    else{
        return(
      <View>
        <Ionicons
          name='ios-happy-outline'
          size={100}
        />
        <Text>
            There is no data to display
        </Text>
      </View>
    )}
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
)(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    alignItems: 'center',
    fontSize: 30,
    marginBottom:10
  },
  questionsLengthText:{
    flex: 1,
    alignItems: 'center',
    fontSize: 15,
    marginBottom:20,
    color:gray
  },
  btn:{
    backgroundColor:'#A4A4A4',
    padding:10,
    paddingLeft: 50,
    paddingRight:50,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:5,
    marginBottom:30
  }
})
