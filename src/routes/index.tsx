import React from 'react'
import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router-dom'

import Home from '@/app/Home'
import Rank from '@/app/Rank'
import Recommend from '@/app/Recommend'
import Singers from '@/app/Singers'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'} />,
      },
      {
        path: '/recommend',
        component: Recommend,
      },
      {
        path: '/singers',
        component: Singers,
      },
      {
        path: '/rank',
        component: Rank,
      },
    ],
  },
]

export default routes
