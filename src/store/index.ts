import { configureStore } from '@reduxjs/toolkit'
import { recommendReducer } from './reducers'

const store = configureStore({
  reducer: {
    recommend: recommendReducer
  }
})

export default store