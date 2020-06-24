import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {Card, Icon, Button, Image, CardContent} from 'semantic-ui-react'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <Card.Group itemsPerRow={3} className="main-content-section">
        {this.props.products
          ? this.props.products.map(product => {
              return (
                <Card raised key={product.id}>
                  <Image src={product.imageUrl} wrapped ui={false} />
                  <CardContent centered="true" className="product">
                    <Card.Header as={Link} to={`/products/${product.id}`}>
                      {product.name.toUpperCase()}
                    </Card.Header>
                  </CardContent>
                </Card>
              )
            })
          : ''}
      </Card.Group>
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
