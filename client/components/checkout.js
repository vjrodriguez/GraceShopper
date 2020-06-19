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
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header as="h1">Order Summary</Header>
        <div>
          <Segment inverted>
            <h3>order quantity: </h3>
            <h3>order total: </h3>
          </Segment>
        </div>
        <Header as="h1">Shipping and Billing Info</Header>
        <Segment inverted>
          <Form inverted>
            <Form.Group widths="equal">
              <Form.Input fluid label="First name" placeholder="First name" />
              <Form.Input fluid label="Last name" placeholder="Last name" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="SHIPPING ADDRESS"
                placeholder="street address"
              />
              <Form.Input
                fluid
                label="CITY, STATE"
                placeholder="i.e. New York, NY"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input fluid label="ZIP CODE" placeholder="Zip" />
              <Form.Input fluid label="PHONE" placeholder="phone" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="CARD NUMBER"
                placeholder="xxxx-xxxx-xxxx-xxxx"
              />
              <Form.Input fluid label="CVC" placeholder="CVC" />s
            </Form.Group>
            <Form.Checkbox label="I agree to the Terms and Conditions" />
            <Button type="submit">Place Order</Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

export default Checkout
