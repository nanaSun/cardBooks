import React from 'react'
import { View,Text,FlatList,Dimensions,TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import {receiveDeck} from '../actions/'
import { connect } from 'react-redux'
import {getDecks,initDecks} from '../utils/api'
const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width
const ListItem = styled.Text`
    width:${winWidth}px;
    background: rgb(${props=>props.backgroundColor});
    height:${winHeight/5}px;
    lineHeight:${winHeight/5}px;
    fontSize:${winHeight/25}px;
    textAlign:center;
    color:rgb(${props=>props.textColor});
`;
const backgroundRadomColors=['238,134,154','252,213,129','255,251,198','247,201,221','125,205,244']
const textRadomColors=['252,213,129','238,134,154','125,205,244','255,251,198','247,201,221']
class ListView extends React.Component {
    componentWillMount = () => {
        let getList=this.props.getList
        getDecks((data)=>{
            if(data===null){
                initDecks((data)=>{
                    getDecks((data)=>{
                        getList(JSON.parse(data))
                    })
                })
            }else{
                getList(JSON.parse(data))
            }
        })
    }
    render() {
        let {decks}=this.props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                data={decks}
                renderItem={({item,index})=><ListItem 
                    onPress={() => this.props.navigation.navigate(
                       'DeckDetail',
                       { id: item.title }
                    )}
                    textColor={textRadomColors[index%5]} 
                    backgroundColor={backgroundRadomColors[index%5]}
                    >{item.title}</ListItem>}
                ></FlatList>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate(
                       'AddDeck'
                    )}><Text>ADD DECK</Text></TouchableOpacity>
            </View>
        );
    }
}
function mapStateToProps (state) {
  return{
    decks:typeof state==="undefined"?{}:Object.keys(state).map(function(key) {
        return {...state[key],key:key}
    })
  }
}
function mapDispatchToProps(dispatch){
  return{
    getList:(decks)=>dispatch(receiveDeck(decks))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListView);