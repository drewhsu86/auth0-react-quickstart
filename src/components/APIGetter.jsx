import React, { Component } from 'react'
import axios from 'axios'

export default class RulesGetter extends Component {

  constructor() {
    super()
    this.state = {
      ruleList: [],
      appList: [],
      errorText: ''
    }
  }

  // if this component is successfully called, use m2m app to get api token
  // then use api token to get rules from management api v2
  componentDidMount() {
    this.initialize()
  }

  setStateAs(data, stateName) {
    this.setState({
      [stateName]: data
    })
  }

  initialize = async () => {
    try {
      const accessToken = await this.getAPIToken()
      this.setStateAs('Successfully received API JWT', 'errorText')

      const rules = await this.getFromAPI(accessToken, 'rules')
      this.setStateAs(rules, 'ruleList')

      const apps = await this.getFromAPI(accessToken, 'clients')
      this.setStateAs(apps, 'appList')

    } catch (error) {
      console.error(error)
    }
  }

  getAPIToken = async () => {
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
      this.setStateAs('See console: Error while getting API JWT', 'errorText')
    }
  }

  getFromAPI = async (accessToken, path) => {
    try {
      const headers = {
        Authorization: 'Bearer ' + accessToken
      }
      const URL = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/${path}`
      const response = await axios(URL, { headers })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      this.setStateAs('See console: Error while accessing API', 'errorText')
    }
  }
  
  render() {
    return (
      <div>
        {this.state.errorText ? <h3>{this.state.errorText}</h3> : null}

        <h1>Apps List:</h1>
        {
          this.state.appList.map((app, idx) => {
            return <div key={idx} style={{ border: "1px solid black", padding: "10px", margin: "0 20%" }}>
              <h2> {app.name} </h2>
            </div>
          })
        }

        <h1>Rules List:</h1>
        {
          this.state.ruleList.map(rule => {
            return <div key={rule.id} style={{ border: "1px solid black", padding: "10px", margin: "0 20%" }}>
              <h2> {rule.name} </h2>
              <p>Order: {rule.order}</p>
              <p>Stage: {rule.stage}</p>
              <p style={{ overflow: "auto", backgroundColor: "lightgray", width: "80%", height: "100px", margin: "auto", padding: "5px" }}>
                {rule.script}
              </p>
            </div>
          })
        }
      </div>
    )
  }
}
