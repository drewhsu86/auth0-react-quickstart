import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Logout() {
  const { logout } = useAuth0()

  return (
    <button onClick={() => logout({ returnTo: process.env.NODE_ENV === "production" ? "https://auth0-rules-test-ahsu.netlify.app" : "http://localhost:3000" })}> Log Out </button>
  )
}
