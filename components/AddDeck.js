import React from 'react'
import { View,Text,TextInput,FlatList,Dimensions ,TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import {addDeck} from '../actions/'
import { connect } from 'react-redux'
import { addDeck as saveNewDeck } from '../utils/api'
const TitleInput = styled.TextInput`
    width:200px;
    height:44px;
    color:#000;
`;
class AddDeck extends React.Component {
	state={
		title:""
	}
	writeTitle=(title)=>{
		this.setState({
			title
		})
	}
	addDeck(){
		let _=this;
		if(_.state.title!==""){
			let newDeck={
				title:_.state.title,
				questions:[]
			}
			saveNewDeck(newDeck,newDeck.title,()=>{
				_.props.addDeck(newDeck)
				_.props.navigation.navigate("Home")
			})
			
			
		}
	}
    render(){
    	const {title}=this.state
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ADD NEW DECK</Text>
            <TextInput placeholder={"newdecktitle"} value={title} onChangeText={this.writeTitle}/>
            <TouchableOpacity onPress={()=>this.addDeck()}><Text>SUBMIT</Text></TouchableOpacity>
        </View>
        )
    }
}
function mapStateToProps (state) {
	console.log("addDeck")
	return {}
}
function mapDispatchToProps(dispatch){
  return {
    addDeck:(deck)=>dispatch(addDeck(deck))
  }
}

export default connect(
	mapStateToProps,
    mapDispatchToProps
)(AddDeck)