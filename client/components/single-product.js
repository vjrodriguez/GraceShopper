import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  handleSelect() {
    //handleSelect needs to be filled out
    console.log('YOU CHANGED YOUR SELECTION!')
  }

  handleAddToCart() {
    //handleAddToCart needs to be filled out
    console.log('YOU TRIED TO ADD TO YOUR CART!')
  }

  render() {
    let product = this.props.product
    return (
      <div>
        {product ? (
          <div>
            <div className="image-col">
              <img src={product.imageUrl} />
            </div>
            <div className="detail-col">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div>{product.price}</div>
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
            </div>
          </div>
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
    getSingleProduct: id => dispatch(getSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
