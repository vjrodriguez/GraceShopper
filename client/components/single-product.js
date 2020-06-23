import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'
import {Card, Icon, Image} from 'semantic-ui-react'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: this.props.match.params.id,
      quantity: 1
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.state.productId)
  }

  async handleSelect(e) {
    await this.setState({
      quantity: e.target.value
    })
  }

  async handleAddToCart() {
    await this.props.addToCart('/api/cart', this.state)
    //need to handle post add to cart behavior -- success message? new page?
  }

  render() {
    let product = this.props.product
    return (
      <div>
        {product ? (
          <Card centered>
            <Image src={product.imageUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
              <Card.Description>{product.description}</Card.Description>
              <Card.Meta>
                <span className="date">{product.price / 100}</span>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <label htmlFor="qty-select">Quantity: </label>
              <select
                onChange={this.handleSelect}
                name="quantity"
                id="qty-select"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <button onClick={this.handleAddToCart} type="button">
                Add To Cart
              </button>
            </Card.Content>
          </Card>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => {
  console.log('STATE', state)
  return {
    product: state.product.product
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    addToCart: (path, product) => dispatch(addToCart(path, product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
