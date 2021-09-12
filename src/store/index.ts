import { configureStore } from '@reduxjs/toolkit'

import { rankReducer, recommendReducer, singersReducer } from './reducers'

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singers: singersReducer,
    rank: rankReducer,
  },
})

export default store
