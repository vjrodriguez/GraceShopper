import React from 'react'
import {Button, Input, Header, Divider, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderId: this.props.orderId,
      productId: this.props.productId,
      quantity: this.props.quantity
    }
    this.handleQtyIncrease = this.handleQtyIncrease.bind(this)
    this.handleQtyDecrease = this.handleQtyDecrease.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleQtyIncrease(e) {
    await this.setState({quantity: this.state.quantity + 1})
    await this.props.updateQty(this.state)
    // this.props.fetchCart()
  }

  async handleQtyDecrease(e) {
    console.log(this.state.quantity)
    if (this.state.quantity > 1) {
      await this.setState({quantity: this.state.quantity - 1})
      await this.props.updateQty(this.state)
      // this.props.fetchCart()
    } else {
      this.handleDelete()
    }
  }

  async handleDelete() {
    await this.props.removeProduct(this.state.productId)
    this.props.fetchCart()
  }

  render() {
    return (
      <div className="cart-item">
        <Image src="/stock_image.png" />
        <div className="product-details">
          <Header as="a">{this.props.name}</Header>
          <Header as="h5">${this.props.price / 100} each</Header>
        </div>
        <div className="quantity-selection">
          <label htmlFor="quantity">
            <Header>Quantity</Header>
          </label>
          <Input size="mini" action>
            <input className="quantity-selection" value={this.state.quantity} />
            <Button.Group basic vertical>
              <Button
                className="quantity-selection"
                value={1}
                icon="angle up"
                onClick={this.handleQtyIncrease}
              />
              <Button
                className="quantity-selection"
                value={-1}
                icon="angle down"
                onClick={this.handleQtyDecrease}
              />
            </Button.Group>
          </Input>
        </div>
        <div className="item-total">
          <Header>Item Total: ${this.props.productSubtotal / 100}</Header>
        </div>
        <div className="remove-item">
          <Button onClick={this.handleDelete} icon="x" />
        </div>
        <Divider />
      </div>
    )
  }
}
