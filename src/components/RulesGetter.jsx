import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function RulesGetter() {

  const [ruleList, setRuleList] = useState([]);
  const [errorText, setErrorText] = useState('');

  // if this component is successfully called, use m2m app to get api token
  // then use api token to get rules from management api v2
  useEffect(() => {
    initialize()
  }, [])

  async function initialize() {
    try {
      const accessToken = await getAPIToken()
      setErrorText('Successfully received API JWT')
      const rules = await getRules(accessToken)
      setErrorText('Finished Initilization')
      setRuleList(rules)
    } catch (error) {
      console.error(error)
    }
  }

  async function getAPIToken() {
    try {
      // axios post values from: https://auth0.com/docs/tokens/management-api-access-tokens/get-management-api-access-tokens-for-production
      
      const URL = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`
      const headers = { 'content-type': 'application/json' }
      const body = {
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_AUTH0API_CLIENTID,
        client_secret: process.env.REACT_APP_AUTH0API_CLIENTSECRET,
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`
      }

    
      const response = await axios.post(URL, body, { headers })
      console.log(response.data)
      return response.data.access_token 
    } catch (error) {
      console.error(error)
      setErrorText('See console: Error while getting API JWT')
    }
  }

  async function getRules(accessToken) {
    try {
      const headers = {
        Authorization: 'Bearer ' + accessToken
      }
      const URL = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/rules`
      const response = await axios(URL, { headers })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      setErrorText('See console: Error while accessing API')
    }
  }
  
  return (
    <div>
      RulesGetter
      {errorText ? <h3>{errorText}</h3> : null}

      <h1>Rules List:</h1>
      {
        ruleList.map(rule => {
          return <div key={rule.id} style={{ border: "1px solid black", padding: "10px" }}>
            <h2> {rule.name} </h2>
            <p>Order: {rule.order}</p>
            <p>Stage: {rule.stage}</p>
            <p style={{ overflow: "auto", backgroundColor: "gray", width: "80%", maxHeight: "200px", margin: "auto", padding: "5px" }}>
              {rule.script}
            </p>
          </div>
        })
      }
    </div>
  )
}
