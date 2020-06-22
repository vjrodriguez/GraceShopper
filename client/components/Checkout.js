import React, {Component} from 'react'
import {checkOut, fetchCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//also import the thunks needed from the store
import {Header, Button, Segment, Form} from 'semantic-ui-react'

export class Checkout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  async handleSubmit() {
    event.preventDefault()
    await this.props.checkOut()
    this.props.history.push('/products')
  }

  render() {
    console.log('PROPS!!!', this.props)
    const currentOrder = this.props.order
    const currentTotal = this.props.total / 100
    return currentOrder ? (
      <div>
        <Segment inverted>
          <Header as="h1" inverted clor="grey">
            Order Summary
          </Header>
          <div>
            <Segment inverted>
              <h3>
                Order Items:
                {currentOrder.map(product => {
                  return (
                    <div key={product.id}>
                      {product.name}: {product.product_order.quantity}
                    </div>
                  )
                })}
              </h3>
              <h3>Order Total: ${currentTotal}</h3>
            </Segment>
          </div>
          <div>
            <Segment inverted>
              <Header as="h1" inverted clor="grey">
                Payment and Shipping Info
              </Header>
              <Form inverted>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="First name"
                    placeholder="First name"
                  />
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
                  <Form.Input fluid label="CVC" placeholder="CVC" />
                </Form.Group>
                <Form.Checkbox label="I agree to the Terms and Conditions" />
                <Button type="submit">Confirm Order</Button>
              </Form>
            </Segment>
          </div>
        </Segment>
      </div>
    ) : (
      'Please start an order before checking out!'
    )
  }
}

const mapStateToProps = state => ({
  order: state.cart.products,
  total: state.cart.orderTotal
})

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => {
      dispatch(fetchCart())
    },
    checkOut: () => {
      dispatch(checkOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
