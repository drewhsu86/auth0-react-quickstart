import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import APIGetter from './APIGetter'

export default function RulesViewer() {
  const { user, isAuthenticated, isLoading } = useAuth0()
  if (isLoading) {
    return <div>
      <h1>Loading...</h1>
    </div>
  }
  if (!isAuthenticated) {
    return <div>
      <h1>You did not successfully Login.</h1>
      <Link to="/">
          Return to Login Screen
      </Link>
    </div>
  }
  
  return (
    <div>
      <h1>Logged in as {user.email}.</h1>
      <APIGetter />
    </div>
  )
}
