import React from 'react'
import {Button, Input, Header, Divider, Image, Item} from 'semantic-ui-react'
import makeTotalStr from '../../script/makeTotalStr'

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
    console.log('props in cart', this.props)
    return (
      <div className="cart-item">
        <Item.Group>
          <Item>
            <Item.Image size="tiny" src={this.props.image} />

            <Item.Content>
              <Item.Header as="h1">{this.props.name}</Item.Header>
              <Item.Extra as="p">
                ${makeTotalStr(this.props.price)} each
              </Item.Extra>
              <Item.Extra>
                <div className="quantity-selection">
                  <label htmlFor="quantity">
                    <div>Quantity</div>
                  </label>
                  <Input size="mini" action>
                    <Button
                      className="remove-item"
                      onClick={this.handleDelete}
                      icon="x"
                    />
                    <input
                      className="quantity-selection"
                      value={this.state.quantity}
                    />
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
                  <Header>
                    Item Total: ${makeTotalStr(this.props.productSubtotal)}
                  </Header>
                </div>

                <Divider />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}
