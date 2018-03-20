import React from 'react'
import { View,Text,FlatList,Dimensions,TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'

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
class CardListView extends React.Component {
    render() {
        let {cards}=this.props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                data={cards}
                renderItem={({item,index})=><ListItem
                    textColor={textRadomColors[index%5]} 
                    backgroundColor={backgroundRadomColors[index%5]}
                    >{item.question}-{item.answer}</ListItem>}
                ></FlatList>
            </View>
        );
    }
}
function mapStateToProps (state,{navigation}) {
    const { id } = navigation.state.params
    return{
        cards:typeof state==="undefined"?{}:state[id].questions
    }
}
export default connect(mapStateToProps)(CardListView);