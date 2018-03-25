import { AsyncStorage } from 'react-native'
import { Buffer } from 'buffer'
import CryptoJS from 'crypto-js'
const CARDKEY="card-decks"
function md5 (data) {
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    return CryptoJS.MD5(str).toString()
}

export function getDecks ( callback ) {
  return AsyncStorage.getItem(CARDKEY,(err, result) => {
      callback(result);
  })
}
export function getDeck( id , callback ){
  getDecks((decks)=>{
    decks=JSON.parse(decks)
    callback(decks[id])
  })
}
export function saveDeckTitle( title ,timestamp , callback){
  let key=md5(title+timestamp)
  return AsyncStorage.mergeItem(CARDKEY, JSON.stringify({
    [key]: {
      timestamp:timestamp,
      title:title,
      questions:[]
    }
  }),()=>{
    callback(key,title)
  })
}
export function addCardToDeck( id , card , callback ){
  let key=md5(card.question+card.timestamp)
  let obj= {
    key:key,
    timestamp:card.timestamp,
    question: card.question,
    answer: card.answer
  }
  getDecks((decks)=>{
    decks=JSON.parse(decks)
    decks={
      ...decks,
      [id]:{
        ...decks[id],
        questions:[
          ...decks[id].questions,
          obj
        ]
      }
    }
    setDecks(decks,()=>{
      callback(obj)
    })
  })

}
export function setDecks(decks,callback){
  return AsyncStorage.setItem(CARDKEY,JSON.stringify(decks),(err, result) => {
      callback(result);
  })
}


