import React from 'react'
import { View,Text,FlatList,Dimensions ,TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { backgroundRadomColors,textRadomColors } from '../utils/colors'
import { winHeight,
        winWidth
        } from '../utils/helpers'
import {getDeck} from '../utils/api'

const Item = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    width:${winWidth}px;
    height:${winHeight/4}px;
`;
const ItemTitle = styled.Text`
    fontSize:${winHeight/25}px;
    textAlign:center;
    color:#333;
`;
const ItemCardnum = styled.Text`
    fontSize:${winHeight/30}px;
    textAlign:center;
    color:#333;
`;
const ItemBtn = styled.TouchableOpacity`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    background:rgb(${backgroundRadomColors[1]});
    width:${winWidth*0.8}px;
    height:${winHeight/15}px;
    marginBottom:${winHeight/60}px;
    borderRadius:${winHeight/30}px;
`;
class DeckDetail extends React.Component {
    state = {
        id:"",
        title:"",
        questions:[]
    }
    componentWillMount = () => {
        let {id,navigation}=this.props
        let _=this
        getDeck(id,(data)=>{
            if(data===null){
                navigation.navigate('Home')
            }else{
                _.setState({
                    id:id,
                    title:data.title,
                    questions:data.questions
                })
            }
        })
    }
    render(){
        const { title,questions,id } = this.state
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Item>
                <ItemTitle>{title}</ItemTitle>
                <ItemCardnum>{questions.length}</ItemCardnum>
            </Item>
            <Item>
                <ItemBtn 
                    onPress={() => this.props.navigation.navigate(
                       'CardListView',
                       { id: id }
                    )}>
                    <Text>VIEW ALL CARDS</Text>
                </ItemBtn>
                <ItemBtn 
                    onPress={() => this.props.navigation.navigate(
                       'AddCard',
                       { id: id }
                    )}>
                    <Text>ADD QUIZ</Text>
                </ItemBtn>
                <ItemBtn 
                    onPress={() => {
                        this.props.navigation.navigate('Quiz',{ id: id })
                    }}>
                    <Text>START QUIZ</Text>
                </ItemBtn>
            </Item>
        </View>
        )
    }
}
function mapStateToProps (state, { navigation }) {
    const { id } = navigation.state.params

    return {
        id,
        item:typeof state==="undefined"?{title:"",questions:[]}:state[id]
    }
}


export default connect(
    mapStateToProps
)(DeckDetail)