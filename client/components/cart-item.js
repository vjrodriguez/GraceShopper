import React from 'react'
import {Button, Input, Header, Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity
    }
  }
  render() {
    return (
      <div className="cart-item">
        <div className="product-details">
          <Header as="a">Product Name</Header>
          <Header as="h5">price each</Header>
        </div>
        <div className="quantity-selection">
          <label htmlFor="quantity">
            <Header as={Link}>Quantity</Header>
          </label>
          <Input name="quantity" value={this.state.quantity} size="mini" action>
            <input className="quantity-selection" />
            <Button.Group basic vertical>
              <Button
                className="quantity-selection"
                value={1}
                icon="angle up"
              />
              <Button
                className="quantity-selection"
                value={-1}
                icon="angle down"
              />
            </Button.Group>
          </Input>
        </div>
        <div className="item-total">
          <Header>$ Item Total</Header>
        </div>
        <div className="remove-item">
          <Button icon="x" />
        </div>
        <Divider />
      </div>
    )
  }
}
