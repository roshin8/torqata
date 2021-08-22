import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import {
  Content,
  Sidebar,
  Header
} from './index'

const Layout = () => {
  const darkMode = useSelector(state => state.darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )

  return (
    <div className={classes}>
      <Sidebar/>
      <div className="c-wrapper">
        <Header/>
        <div className="c-body">
          <Content/>
        </div>
      </div>
    </div>
  )
}

export default Layout
