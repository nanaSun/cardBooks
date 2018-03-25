import React from 'react'
import ListView from './components/ListView'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import CardListView from './components/CardListView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import Setting from './components/Setting'
import { View } from 'react-native'
import { TabNavigator,StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setDecks } from './utils/api'
import { setLocalNotification } from './utils/helpers'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
/*Tabs for Home page*/
const Tabs = TabNavigator({
  Home: {
    screen: ListView,
    navigationOptions: {
       tabBarLabel: 'List',
       tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome
              name='list-ul'
              color='#333'
              size={32}  
        />)
    },
  },
  AddDeck:{
    screen: AddDeck,
    navigationOptions: {
       tabBarLabel: 'AddDeck',
       tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
              name='ios-add-circle'
              color='#333'
              size={32}  
        />)
    },
  }
},{
  showIcon:true,
  tabBarPosition:'bottom',
  tabBarOptions: {
    tabStyle: {
      paddingTop: 12,
    },
  },
});
/*The whole page*/
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail
  },
  CardListView:{
    screen: CardListView
  },
  AddCard:{
    screen: AddCard
  },
  Quiz:{
    screen: Quiz
  }
}, {
    headerMode: 'none',
})
export default class App extends React.Component {
  componentDidMount() {
     setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}