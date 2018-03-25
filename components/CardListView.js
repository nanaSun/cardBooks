import React from 'react'
import { View,Text,FlatList,Dimensions,TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { backgroundRadomColors,textRadomColors } from '../utils/colors'
import { winHeight,
        winWidth,
        timeFormat
        } from '../utils/helpers'
const ListItem = styled.View`
    width:${winWidth}px;
    background: rgb(${props=>props.backgroundColor});
    padding: ${winHeight/25}px;
`;
const ListItemText=styled.Text`
    fontSize:18px;
    textAlign:center;
    color:rgb(${props=>props.textColor});
`;
class CardListView extends React.Component {
    render() {
        let {cards}=this.props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                data={cards}
                renderItem={({item,index})=><ListItem
                    backgroundColor={backgroundRadomColors[index%5]}
                    >
                    <ListItemText textColor={textRadomColors[index%5]} >Modified time:{timeFormat(item.timestamp)}</ListItemText>
                    <ListItemText textColor={textRadomColors[index%5]} >Q:{item.question}</ListItemText>
                    <ListItemText textColor={textRadomColors[index%5]} >A:{item.answer}</ListItemText>
                    </ListItem>}
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