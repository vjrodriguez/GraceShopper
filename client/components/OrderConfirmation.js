import React from 'react'
import {Link} from 'react-router-dom'
import {Segment, Button} from 'semantic-ui-react'

const OrderConfirmation = () => {
  return (
    <div>
      <Segment inverted>
        <h2>Your order has been placed!</h2>
        <h3>Thanks for getting polish'd with us</h3>
        <Button type="submit" as={Link} to="/products">
          Start New Order
        </Button>
      </Segment>
    </div>
  )
}

export default OrderConfirmation
