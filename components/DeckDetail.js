import React from 'react'
import { View,Text,FlatList,Dimensions ,TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
class DeckDetail extends React.Component {
    render(){
        const { title,questions } = this.props.item
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{title}</Text>
            <Text>{questions.length}</Text>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate(
                   'CardListView',
                   { id: title }
                )}
            ><Text>VIEW ALL CARDS</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                   'AddCard',
                   { id: title }
                )}><Text>ADD QUIZ</Text></TouchableOpacity>
            <TouchableOpacity><Text>START QUIZ</Text></TouchableOpacity>
            
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