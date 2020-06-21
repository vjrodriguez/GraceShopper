import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        {this.props.products
          ? this.props.products.map(product => {
              return (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <div className="product">
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl} />
                  </div>
                </Link>
              )
            })
          : ''}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
