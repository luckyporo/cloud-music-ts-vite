import React, { memo } from 'react'

type Props = {
  [key: string]: any
}

function Singers(props: Props) {
  return <div>signers</div>
}

export default memo(Singers)
