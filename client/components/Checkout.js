import React, {Component} from 'react'
import {checkOut, fetchCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//also import the thunks needed from the store
import {Header, Button, Segment, Form, Icon} from 'semantic-ui-react'

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
    this.props.history.push('/confirmation/')
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
              <Button as={Link} to="/cart" animated>
                <Button.Content visible>Return to Cart</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
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
                    label="FIRST NAME"
                    placeholder="First name"
                  />
                  <Form.Input fluid label="LAST NAME" placeholder="Last name" />
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
                  <Form.Input fluid label="ZIP CODE" placeholder="Zipcode" />
                  <Form.Input
                    fluid
                    label="PHONE"
                    placeholder="phone (optional)"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="CARD NUMBER"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <Form.Input fluid label="CVC" placeholder="CVC" />
                </Form.Group>
                <Button as={Link} to="/confirmation" type="submit">
                  Confirm Order
                </Button>
              </Form>
            </Segment>
          </div>
        </Segment>
      </div>
    ) : (
      'Please start an order before confirming order.'
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
