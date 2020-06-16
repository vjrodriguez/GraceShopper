import React from 'react'
import {connect} from 'react-redux'

export class AllProducts extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        {this.props.products.map(product => {
          return (
            <Link to={`/products/${product.id}`}>
              <div className="product" key={product.id}>
                <h2>{product.name} </h2>
                <img src={product.imageUrl} />
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)
