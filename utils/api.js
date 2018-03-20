import { AsyncStorage } from 'react-native'
const data={
    Japanese:{
        title:'Japanese',
        questions:[
            {
                key:'Sousa',
                question:'操作',
                answer:'そうさ'
            },{
                key:'Kikai',
                question:'きかい',
                answer:'機械'
            },{
                key:'ryokougaisya',
                question:'りょこうがいしゃ',
                answer:'旅行会社'
            },{
                key:'koukuugaisya',
                question:'航空会社',
                answer:'こうくうがいしゃ'
            },{
                key:'eigyoubu',
                question:'えいぎょうぶ',
                answer:'営業部'
            },{
                key:'aitei-sanngyou',
                question:'アイテイー産業',
                answer:'アイテイーさんぎょう'
            },{
                key:'seihinn',
                question:'製品',
                answer:'せいひん'
            },{
                key:'kennchikuka',
                question:'建築家',
                answer:'けんちくか'
            },{
                key:'sekkei',
                question:'せっけい',
                answer:'設計'
            }
        ]
    },
  React: {
    title: 'React',
    questions: [
      {
        key:"q1",
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        key:"q2",
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        key:"q1",
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
export function getDecks (callback) {
  return AsyncStorage.getItem('decks2',(err, result) => {
      callback(result);
  })
}
export function addDeck (deck, key,callback) {
  return AsyncStorage.mergeItem('decks2', JSON.stringify({
    [key]: deck
  }),callback)
}
export function setDecks(decks,callback){
  return AsyncStorage.setItem('decks2',JSON.stringify(decks),(err, result) => {
      callback(result);
  })
}
export function initDecks(callback){
  return AsyncStorage.setItem('decks2',JSON.stringify(data),(err, result) => {
      callback(result);
  })
}
export function addCard (card,callback) {
  getDecks((decks)=>{
    decks=JSON.parse(decks)
    decks={
      ...decks,
      [card.id]:{
        ...decks[card.id],
        questions:[
          ...decks[card.id].questions,
          {
            key:card.key,
            question: card.question,
            answer: card.answer
          }
        ]
      }
    }
    console.log(decks)
    setDecks(decks,callback)
  })
}

