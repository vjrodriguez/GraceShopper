import React from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Container,
  Icon,
  Header,
  Grid,
  Segment,
  Divider
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {fetchCart, updateQty, removeProduct} from '../store/cart'
import CartItem from './cart-item'
import makeTotalStr from '../../script/makeTotalStr'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    return (
      <Container className="main-content-section">
        <Grid divided="vertically">
          {this.props.products ? (
            this.props.products.length ? (
              this.props.products.map(product => {
                return (
                  <CartItem
                    key={product.id}
                    orderId={product.product_order.orderId}
                    productId={product.id}
                    image={product.imageUrl}
                    name={product.name.toUpperCase()}
                    price={product.price}
                    quantity={product.product_order.quantity}
                    productSubtotal={product.product_order.productSubtotal}
                    fetchCart={this.props.fetchCart}
                    updateQty={this.props.updateQty}
                    removeProduct={this.props.removeProduct}
                  />
                )
              })
            ) : (
              <Grid.Row columns={1}>
                <Grid.Column textAlign="center">
                  <Segment>
                    You haven't added anything to your cart yet!
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            )
          ) : (
            ''
          )}
        </Grid>
        <Header textAlign="right">
          Total Price: ${makeTotalStr(this.props.orderTotal)}
        </Header>
        <Button as={Link} to="/products" animated="vertical">
          <Button.Content visible>Keep Shopping</Button.Content>
          <Button.Content hidden>
            <Icon name="shopping bag" />
          </Button.Content>
        </Button>
        <Button as={Link} to="/checkout" animated>
          <Button.Content visible>Go to Checkout</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    products: state.cart.products,
    orderTotal: state.cart.orderTotal
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    updateQty: newQty => dispatch(updateQty(newQty)),
    removeProduct: productId => dispatch(removeProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
