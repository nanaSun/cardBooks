import React from 'react'
import { View,Text,FlatList,TouchableOpacity,TouchableWithoutFeedback,Animated } from 'react-native'
import styled from 'styled-components'
import {receiveDeck} from '../actions/'
import { connect } from 'react-redux'
import { getDecks,setDecks } from '../utils/api'
import { backgroundRadomColors,textRadomColors } from '../utils/colors'
import { winHeight,winWidth,timeFormat } from '../utils/helpers'
import sortBy from  'sort-by'

const ListItem = styled.View`
    width:${winWidth}px;
    background: rgb(${props=>props.backgroundColor});
    padding:20px;
`;
const ListTitle = styled.Text`
    fontSize:24px;
    textAlign:center;
    color:rgb(${props=>props.textColor});
`;
const ListCardnum = styled.Text`
    fontSize:16px;
    textAlign:center;
    color:rgb(${props=>props.textColor});
`;
class ListView extends React.Component {
    state={
        loading:true
    }
    componentWillMount(){
        let { getList } = this.props
        let _=this;
        getDecks((data)=>{
            try{
                getList(JSON.parse(data))
                _.setState({
                    loading:false
                })
            }catch(e){
                setDecks({},function(){})
            }
        })
        
    }
    needAnimation(bounceValue,index,key){
        let {navigation}=this.props
        let anim=Animated.sequence([
           Animated.timing(bounceValue, { duration: 200, toValue: 1.2}),
           Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ])
        anim.start(()=>navigation.navigate('DeckDetail', { id: key }))
        //
    }
    render() {
        let { decks,navigation }=this.props
        let _=this
        decks=decks.map((d)=>{
            d.bounceValue=new Animated.Value(1)
            return d
        })
        decks.sort(sortBy("-timestamp"));
        if(decks.length==0){
            if(this.state.loading){
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>LOADING...</Text>
                    </View>
                )
            }else{
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(
                               'AddDeck'
                            )}
                        >
                        <Text>Add your First Deck</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }else{
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <FlatList
                    data={decks}
                    renderItem={({item,index})=>
                        <Animated.View style={[{transform: [{scale: item.bounceValue}]}]}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                        _.needAnimation(item.bounceValue,index,item.key)
                                    }
                                }
                            >
                                <ListItem 
                                backgroundColor={backgroundRadomColors[index%5]}
                                >
                                    <ListTitle
                                    textColor={textRadomColors[index%5]} 
                                    >{item.title}</ListTitle>
                                    <ListCardnum textColor={textRadomColors[index%5]} >{item.questions.length} cards</ListCardnum>
                                    <ListCardnum textColor={textRadomColors[index%5]} >last modify time:{timeFormat(item.timestamp)}</ListCardnum>
                                </ListItem>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    }
                    ></FlatList>
                </View>
            );
        }
    }
}
function mapStateToProps (state) {
  return{
    decks:typeof state==="undefined"?[]:Object.keys(state).map(function(key) {
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