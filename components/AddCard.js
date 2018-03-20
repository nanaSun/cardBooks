import React from 'react'
import { View,Text,TextInput,FlatList,Dimensions ,TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import { addCard } from '../actions/'
import { connect } from 'react-redux'
import { addCard as saveNewCard } from '../utils/api'
const TitleInput = styled.TextInput`
    width:200px;
    height:44px;
    color:#000;
`;
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
				id:_.props.id,
				key:_.state.question,
				question:_.state.question,
				answer:_.state.answer
			}
			saveNewCard(newCard,()=>{
				_.props.addCard(newCard)
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
            <Text>ADD NEW card</Text>
            <TextInput 
            	placeholder={"new question"} 
            	value={question} 
            	onChangeText={this.writeQuestion}
            />
            <TextInput 
            	placeholder={"new answer"} 
            	value={answer} 
            	onChangeText={this.writeAnswer}
            />
            <TouchableOpacity onPress={()=>this.addCard()}><Text>SUBMIT</Text></TouchableOpacity>
        </View>
        )
    }
}
function mapStateToProps (state,{navigation}) {
  	const { id } = navigation.state.params
  	console.log(id)
	return { id }
}
function mapDispatchToProps(dispatch){
  return {
    addCard:(card)=>dispatch(addCard(card))
  }
}

export default connect(
	mapStateToProps,
    mapDispatchToProps
)(AddCard)