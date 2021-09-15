import React from 'react'
import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router-dom'

import Album from '@/app/Album'
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
        routes: [
          {
            path: '/recommend/:id',
            component: Album,
          },
        ],
      },
      {
        path: '/singers',
        component: Singers,
      },
      {
        path: '/rank',
        component: Rank,
        key: 'rank',
        routes: [
          {
            path: '/rank/:id',
            component: Album,
          },
        ],
      },
    ],
  },
]

export default routes
