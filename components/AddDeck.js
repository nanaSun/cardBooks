import React from 'react'
import { View,Text,TextInput,FlatList,Dimensions ,TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import { addDeck } from '../actions/'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { backgroundRadomColors,textRadomColors } from '../utils/colors'
import { winHeight,winWidth,timeStamp } from '../utils/helpers'

const TitleInput = styled.TextInput`
    width:${winWidth*0.8}px;
    textAlign:center;
    height:60px;
    border-radius:30px;
    fontSize:24px;
    marginBottom:30px;
    border:1px solid #333;
    color:#666;
`;
const TitleText= styled.Text`
	width:${winWidth*0.8}px;
	textAlign:center;
    fontSize:${winWidth/15}px;
    height:${winHeight/4}px;
`
const Btn = styled.TouchableOpacity`
	width:${winWidth*0.3}px;
    height:60px;
    background:#333;
    border-radius:10px;
`
const TextBtn = styled.Text`
	textAlign:center;
    fontSize:20px;
    line-height:60px;
    color:#fff;
`

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
        let time=timeStamp();
		if(_.state.title!==""){
			saveDeckTitle(_.state.title,time,(key,title)=>{
                _.props.addDeck(key,title,time);
				_.props.navigation.navigate("Home")
				
			})
		}
	}
    render(){
    	const {title}=this.state
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TitleText>What is the title of your New Deck?</TitleText>
            <TitleInput placeholder={"newdecktitle"} value={title} onChangeText={this.writeTitle}/>
            <Btn onPress={()=>this.addDeck()}><TextBtn>SUBMIT</TextBtn></Btn>
        </View>
        )
    }
}
function mapStateToProps (state) {
	return {}
}
function mapDispatchToProps(dispatch){
  return {
    addDeck:(key,title,timestamp)=>dispatch(addDeck(key,title,timestamp))
  }
}

export default connect(
	mapStateToProps,
    mapDispatchToProps
)(AddDeck)