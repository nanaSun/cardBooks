import { Dimensions,AsyncStorage } from 'react-native'
import { Permissions,Notifications } from 'expo'
const NOTIFICATION_KEY="cardquiz:notifications"

export const winHeight = Dimensions.get('window').height
export const winWidth = Dimensions.get('window').width

export function timeStamp(){
  return new Date().getTime();
}
export function timeFormat(time){
  return new Date(time).toLocaleString();
}
export function getDailyReminderValue(){
	return {
		today:"Don't forget to have a quiz!"
	}
}
export function clearLocalNotification () {
  return AsyncStorage
  		.removeItem(NOTIFICATION_KEY)
  		.then(Notifications.cancelAllScheduledNotificationsAsync)
}
function createNotification () {
  return {
    title: 'Have a Quiz!',
    body: "don't Forget to Have a Quiz!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}
export function setLocalNotification (hour=20,minite=0) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let today = new Date()
              today.setDate(today.getDate()+1)
              today.setHours(hour)
              today.setMinutes(minite)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: today,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify({
              	hour:hour,
              	minite:minite,
              	state:true
              }))
            }
          })
      }
    })
}
