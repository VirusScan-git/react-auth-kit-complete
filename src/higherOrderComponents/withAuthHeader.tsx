import React from 'react'
import { AuthContextConsumer } from '../AuthContext'

interface withAuthHeaderProps {
  authHeader: string
}

const withAuthHeader = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return class withAuthHeader extends React.Component<P & withAuthHeaderProps> {
    render() {
      const { ...props } = this.props
      return (
        <AuthContextConsumer>
          {(c) => {
            if (c?.authState) {
              return (
                <Component
                  {...(props as P)}
                  authHeader={`Bearer ${c.authState.authToken}`}
                />
              )
            } else {
              return <Component {...(props as P)} authHeader={`Bearer `} />
            }
          }}
        </AuthContextConsumer>
      )
    }
  }
}

export default withAuthHeader
