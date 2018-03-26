import React from 'react'
import { StyleSheet,View,Text,FlatList,Dimensions,TouchableOpacity,Animated,Platform } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { backgroundRadomColors,textRadomColors } from '../utils/colors'
import { winHeight,winWidth,getDailyReminderValue,clearLocalNotification,setLocalNotification  } from '../utils/helpers'
const bkg1='rgb('+backgroundRadomColors[0]+')'
const bkg2='rgb('+backgroundRadomColors[3]+')'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: winWidth,
    height: winHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bkg1,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: bkg2,
    position: "absolute",
    top: 0
  },
  flipText: {
    width: "80%",
    fontSize: 20,
    textAlign:"center",
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
  }
});
const QuizNum = styled.Text`
    position:absolute;
    top:20px;
    left:20px;
    color:#000;
    fontSize:24px;
    zIndex:10;
`;
const ShowAnswerBtn = styled.View`
    position:absolute;
    bottom:120px;
    left:${winWidth*0.1}px;
    width:${winWidth*0.8}px;
    backgroundColor:black;
`;
const ShowAnswerText = styled.Text`
    fontSize:24px;
    padding:10px 0;
    textAlign:center;
    color:white;
`;
const AnswerBar = styled.View`
    position:absolute;
    bottom:10px;
    width:${winWidth*0.8}px;
    flex:1;
    flex-direction:row;
    zIndex:10;
`;
const ConfirmBtn = styled.Text`
    width:50%;
    fontSize:24px;
    padding:10px 0;
    textAlign:center;
    color:white;
    backgroundColor:red;
`;
const ScoreText = styled.Text`
    fontSize:48px;
    marginBottom:20px;
    textAlign:center;
    color:#333;
`;
const BackBtn = styled.Text`
    width:80%;
    fontSize:24px;
    padding:10px 20px;
    backgroundColor:rgb(${backgroundRadomColors[0]});
    marginBottom:30px;
    textAlign:center;
    color:rgb(${textRadomColors[0]});
`;
class Quiz extends React.Component {
	state={
		id:0,
		index:0,
        filpValue:0,
		num:0,
		questions:[]
	}
	componentWillMount = () => {
		let {cards,id}=this.props
        this.setState({
        	id:id,
        	questions:cards,
        	num:cards.length
        })
        this.initAnimation()
        
    }
    initAnimation=()=>{
        let {filpValue}=this.state
    	this.animatedValue = new Animated.Value(filpValue);
	    this.animatedValue.addListener(({ value }) => {
	      this.setState({
            filpValue:value
          })
	    })
	    this.frontInterpolate = this.animatedValue.interpolate({
	      inputRange: [0, 180],
	      outputRange: ['0deg', '180deg'],
	    })
	    this.backInterpolate = this.animatedValue.interpolate({
	      inputRange: [0, 180],
	      outputRange: ['180deg', '360deg']
	    })
        
    }
    flipCard() {
        let {filpValue} = this.state

	    if (filpValue >= 90) {
	      Animated.spring(this.animatedValue,{
	        toValue: 0,
	        friction: 8,
	        tension: 10
	      }).start(()=>{
            this.setState({
                filpValue:0
            })
          });
	    } else {
	      Animated.spring(this.animatedValue,{
	        toValue: 180,
	        friction: 8,
	        tension: 10
	      }).start(()=>{
            this.setState({
                filpValue:180
            })
          });
	    }
  	}
    answerQuesion = (result) => {
    	let {questions,index,num}=this.state
    	questions[index].result=result
    	this.setState({
    		questions:questions,
    		index:index+1
    	})
    }
    render() {
    	const frontAnimatedStyle = {
	      transform: [
	        { rotateY: this.frontInterpolate}
	      ]
	    }
	    const backAnimatedStyle = {
	      transform: [
	        { rotateY: this.backInterpolate }
	      ]
	    }
        let {filpValue,questions,index,num,id}=this.state
        let question=questions[index]
        if(num===index){
            clearLocalNotification().then(setLocalNotification)
        	return (
	            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	            	<ScoreText>score:{(questions.reduce((p,c)=>{return p+c.result},0)/num*100).toFixed(2)}%</ScoreText>
	                <TouchableOpacity onPress={() => this.props.navigation.navigate(
	                   'DeckDetail',
                       { id: id }
	                )}><BackBtn>Back to Deck</BackBtn></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(
                       'Quiz',
                       { id: id }
                    )}><BackBtn>Restart Quiz</BackBtn></TouchableOpacity>
	            </View>
	        )

        }else{
	        return (
	            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <QuizNum>
                        COUNT: {num-index}
                    </QuizNum>
		            <View>
		            	<Animated.View style={[filpValue>=90?{opacity:0}:"",styles.flipCard, frontAnimatedStyle]}>
			                <Text style={[styles.flipText]}>{question.question}</Text>
				            <ShowAnswerBtn><ShowAnswerText  onPress={() => this.flipCard()}>Show Answer</ShowAnswerText></ShowAnswerBtn>
			            </Animated.View>
			            <Animated.View style={[filpValue<90?{opacity:0}:0,styles.flipCard, styles.flipCardBack,backAnimatedStyle]}>
			                <Text style={[styles.flipText]}>{question.answer}</Text>
			                <ShowAnswerBtn><ShowAnswerText onPress={() => this.flipCard()}>Show Question</ShowAnswerText></ShowAnswerBtn>
			            </Animated.View>
			        </View>
	            	<AnswerBar>
    	            	<ConfirmBtn onPress={()=>this.answerQuesion(1)}>YES</ConfirmBtn>
    	                <ConfirmBtn style={[{backgroundColor:green}]} onPress={()=>this.answerQuesion(0)}>NO</ConfirmBtn>
                    </AnswerBar>
                </View>
	        );
        }
    }
}

function mapStateToProps (state,{navigation}) {
    const { id } = navigation.state.params
    return{
    	id:id,
        cards:typeof state==="undefined"?{}:state[id].questions.map((q)=>{
        	return {
        		...q,
        		result:0
        	}
        })
    }
}
export default connect(mapStateToProps)(Quiz);