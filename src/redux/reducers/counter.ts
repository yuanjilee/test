import { ADD, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  num: 0
}

export default function counter (state = INITIAL_STATE, action) {
  console.log('🍎 action = ', action)
  switch (action.type) {
    case ADD:
      return {
        num: state.num + 1
      }
     case MINUS:
        const n = action.payload || 1
       return {
         num: state.num - n
       }
     default:
       return state
  }
}

/**
 * 我们的存储是通过“减速器”（Reducer）更新的
 * 
 */