import produce from 'immer'
import React, { createContext, Dispatch, useReducer } from 'react'

import { categoryTypes } from '@/utils/config'

import { CategoryAction, CategoryState } from './store/types'

type CategoryDataContextType = {
  state: CategoryState
  dispatch: Dispatch<CategoryAction>
}

export const CategoryDataContext = createContext<CategoryDataContextType>(
  {} as CategoryDataContextType,
)

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'

const reducer = (state: CategoryState, action: CategoryAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_CATEGORY:
        {
          draft.category = action.payload
          const target = categoryTypes.find((c) => c.key === action.payload)
          if (target) {
            draft.type = target.type
            draft.area = target.area
          }
        }
        break
      case CHANGE_ALPHA:
        draft.alpha = action.payload
        break
      default:
        return state
    }
  })
}

const initialState: CategoryState = {
  category: '',
  type: '',
  area: '',
  alpha: '',
}

type Props = {
  children: React.ReactNode
}

export const Data = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CategoryDataContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryDataContext.Provider>
  )
}
