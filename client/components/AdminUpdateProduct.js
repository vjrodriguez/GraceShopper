import React from 'react'
import {Grid, Input, Form, Button, Modal, Icon, Header} from 'semantic-ui-react'

export default class AdminUpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'productname',
      colorFamily: 'blue',
      description: 'a description',
      price: '900',
      stock: '80',
      imageUrl: 'a URL',
      open: false

      // name: this.props.name,
      // colorFamily: this.props.colorFamily,
      // description: this.props.description,
      // price: this.props.price,
      // stock: this.props.stock,
      // imageUrl: this.props.imageUrl,
      // open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  close() {
    this.setState({open: false})
  }

  open() {
    this.setState({open: true})
  }

  render() {
    return (
      <Grid.Row columns={8}>
        <Grid.Column>
          <Form.Field
            control={Input}
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Grid.Column>
        <Grid.Column>
          <Form.Field
            control={Input}
            name="colorFamily"
            value={this.state.colorFamily}
            onChange={this.handleChange}
          />
        </Grid.Column>
        <Grid.Column>
          <Form.Field
            control={Input}
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </Grid.Column>
        <Grid.Column>
          <Form.Field
            control={Input}
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </Grid.Column>
        <Grid.Column>
          <Form.Field
            control={Input}
            name="stock"
            value={this.state.stock}
            onChange={this.handleChange}
          />
        </Grid.Column>
        <Grid.Column>
          <Form.Field
            control={Input}
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </Grid.Column>
        <Grid.Column>
          <Button>Save Updates</Button>
        </Grid.Column>
        <Grid.Column>
          <Modal
            trigger={<Button onClick={this.open}>Remove Product</Button>}
            basic
            size="small"
            open={this.state.open}
          >
            <Header
              icon="archive"
              content="Are you sure you want to remove this product from the database?"
            />
            <Modal.Actions>
              <Button basic color="red" inverted onClick={this.close}>
                <Icon name="remove" /> Cancel
              </Button>
              <Button color="green" inverted onClick={this.close}>
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid.Row>
    )
  }
}
