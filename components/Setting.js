import React, { Component } from 'react'
import {
  DatePickerIOS,
  TimePickerAndroid,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import { clearLocalNotification,setLocalNotification  } from '../utils/helpers'

export default class App extends Component {
  constructor(props) {
    super(props);
    let date=new Date()
    this.state = {
    	chosenDate:  date,
    	nowatime:{
    		hour:date.getHours(),
    		minute:date.getMinutes()
    	}
    };
    this.setDate = this.setDate.bind(this);
  }
  showTimePicker(){
  	try {
	  TimePickerAndroid.open({
	    hour: this.state.nowatime.hour,
	    minute: this.state.nowatime.minute,
	    is24Hour: true,
	  }).then((data)=>{
	  	this.setState({
	  		nowatime:{
	  			hour:data.hour,
	  			minute:data.minute
	  		}
	  	})
	  });
	} catch ({code, message}) {
	  console.log('Cannot open time picker', message);
	}
  }
  setDate(newDate) {
    this.setState({
    	chosenDate: newDate,
  		nowatime:{
  			hour:newDate.getHours(),
  			minute:newDate.getMinutes()
  		}
  	})
  }
  setNewNotification(){

  }
  render() {
  	if(Platform.OS==="android") 
  		return(
  			<View>
  				<Text onPress={()=>this.showTimePicker()}>Choose time</Text>
  			</View>
  		)
  	else
	    return (
	      <View style={styles.container}>
	        <DatePickerIOS
	          mode="time"
	          date={this.state.chosenDate}
	          onDateChange={this.setDate}
	        />
	      </View>
	    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})