import React from 'react'
import { View,Text,TextInput,FlatList,Dimensions ,TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import { addCard } from '../actions/'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { backgroundRadomColors,textRadomColors } from '../utils/colors'
import { winHeight,winWidth,timeStamp } from '../utils/helpers'

const TitleInput = styled.TextInput`
    width:${winWidth*0.8}px;
    height:44px;
    padding:0 20px;
    border-radius:4px;
    fontSize:20px;
    marginBottom:30px;
    border:1px solid #333;
    color:#666;
`;

const TitleText= styled.Text`
	width:${winWidth*0.8}px;
    fontSize:${winWidth/20}px;
    marginBottom:30px;
`
const Btn = styled.TouchableOpacity`
	width:${winWidth*0.3}px;
    height:44px;
    background:#333;
    border-radius:10px;
`
const TextBtn = styled.Text`
	textAlign:center;
    fontSize:20px;
    line-height:44px;
    color:#fff;
`
class AddCard extends React.Component {
	state={
		question:"",
		answer:""
	}
	writeQuestion=(question)=>{
		this.setState({
			question
		})
	}
	writeAnswer=(answer)=>{
		this.setState({
			answer
		})
	}
	addCard(){
		let _=this;
		if(_.state.question!==""&&_.state.answer!==""){
			let newCard={
                timestamp:timeStamp(),
				question:_.state.question,
				answer:_.state.answer
			}
			addCardToDeck(_.props.id,newCard,(data)=>{
				_.props.addCard(_.props.id,data)
				_.props.navigation.navigate(
					'DeckDetail',
                    { id: _.props.id }
                )
			})
		}
	}
    render(){
    	const {question,answer}=this.state
        return (
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TitleText>Add a new Quiz</TitleText>
            <TitleInput 
            	placeholder={"new question"} 
            	value={question} 
            	onChangeText={this.writeQuestion}
            />
            <TitleInput 
            	placeholder={"new answer"} 
            	value={answer} 
            	onChangeText={this.writeAnswer}
            />
            <Btn onPress={()=>this.addCard()}><TextBtn>SUBMIT</TextBtn></Btn>
        </View>
        )
    }
}
function mapStateToProps (state,{navigation}) {
  	const { id } = navigation.state.params
	return { id }
}
function mapDispatchToProps(dispatch){
  return {
    addCard:(id,card)=>dispatch(addCard(id,card))
  }
}

export default connect(
	mapStateToProps,
    mapDispatchToProps
)(AddCard)