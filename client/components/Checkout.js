import React, {Component} from 'react'
import {checkOut, fetchCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//also import the thunks needed from the store
import {Header, Button, Segment} from 'semantic-ui-react'

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
          <Segment inverted>
            <Button type="submit">
              Back to Cart<Link to="/cart" />
            </Button>
            <Button type="submit">Buy Now</Button>
          </Segment>
        </Segment>
      </div>
    ) : (
      ''
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
