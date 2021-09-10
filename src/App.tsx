import React from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'

import { Data } from './app/Singers/data'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes'
import store from './store'
import { GlobalStyle } from './style'

const App = (): JSX.Element => (
  <Provider store={store}>
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <Data>{renderRoutes(routes)}</Data>
    </HashRouter>
  </Provider>
)

export default App
