import React, { useState } from 'react'
import { RouteConfigComponentProps } from 'react-router-config'
import { CSSTransition } from 'react-transition-group'

import Header from '@/layout/header'

import { Container } from './style'

const Album = ({ history }: RouteConfigComponentProps) => {
  const [showStatus, setShowStatus] = useState(true)

  const handleBack = () => {
    setShowStatus(false)
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={history.goBack}>
      <Container>
        <Header title="返回" handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  )
}

export default Album
