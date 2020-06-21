import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//also import the thunks needed from the store
import {Header, Button, Form, Segment} from 'semantic-ui-react'

export class Checkout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  // async handleSubmit() here

  render() {
    return (
      <div>
        <Segment inverted>
          <Header as="h1" inverted clor="grey">
            Order Summary
          </Header>
          <div>
            <Segment inverted>
              <h3>order quantity: </h3>
              <h3>order total: </h3>
            </Segment>
          </div>
          <Segment inverted>
            <Button type="submit">Buy Now</Button>
          </Segment>
        </Segment>
      </div>
    )
  }
}

export default Checkout
