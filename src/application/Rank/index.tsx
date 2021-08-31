import React, { memo } from 'react'

type Props = {
  [key: string]: any
}

function Rank(props: Props) {
  return <div>rank</div>
}

export default memo(Rank)
