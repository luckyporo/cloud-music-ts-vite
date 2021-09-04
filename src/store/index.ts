import { configureStore } from '@reduxjs/toolkit'

import { recommendReducer, singersReducer } from './reducers'

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singers: singersReducer,
  },
})

export default store
