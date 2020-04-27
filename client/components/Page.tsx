import React, { FunctionComponent } from 'react'
import Header from './Header'
import Meta from './Meta'

const Page: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Meta />
      <Header />
      {children}
    </div>
  )
}

export default Page
