import React from 'react'
import {
  Button,
  Input,
  Header,
  Divider,
  Image,
  Item,
  Grid,
  GridColumn
} from 'semantic-ui-react'
import makeTotalStr from '../../script/makeTotalStr'
import gitUrlParse from 'git-url-parse'

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
    // this.props.fetchCart()
  }

  render() {
    console.log('props in cart', this.props)
    return (
      <Grid.Row className="cart-item" columns={5} verticalAlign="middle">
        <Grid.Column>
          <Image size="small" src={this.props.image} />
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">{this.props.name}</Header>
          <Header as="p">${makeTotalStr(this.props.price)} each</Header>
        </Grid.Column>
        <Grid.Column>
          <div className="quantity-selection">
            <label htmlFor="quantity">
              <div>Quantity</div>
            </label>
            <Input size="mini" action>
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
        </Grid.Column>
        <Grid.Column>
          <div className="item-total">
            <Header>
              Item Total: ${makeTotalStr(this.props.productSubtotal)}
            </Header>
          </div>
        </Grid.Column>
        <Grid.Column>
          <Button
            className="remove-item"
            onClick={this.handleDelete}
            icon="x"
          />
        </Grid.Column>
      </Grid.Row>
    )
  }
}
