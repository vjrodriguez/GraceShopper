import React from 'react'
import {Segment} from 'semantic-ui-react'

const OrderConfirmation = () => {
  return (
    <div>
      <Segment inverted>
        <h2>Your order has been placed!</h2>
        <h3>Thanks for getting polish'd with us</h3>
        <button type="submit">Start New Order</button>
      </Segment>
    </div>
  )
}

export default OrderConfirmation
