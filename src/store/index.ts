import { configureStore } from '@reduxjs/toolkit'

import { albumReducer, rankReducer, recommendReducer, singersReducer } from './reducers'

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singers: singersReducer,
    rank: rankReducer,
    album: albumReducer,
  },
})

export default store
