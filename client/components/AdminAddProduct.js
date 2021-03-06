import React from 'react'
import {Modal, Form, Button} from 'semantic-ui-react'

export default class AdminAddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      colorFamily: '',
      price: '',
      stock: '',
      imageUrl:
        'https://www.lacquester.com/wp-content/uploads/2017/03/EmptyBottleNew.png',
      open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createProduct(this.state)
    this.setState({
      name: '',
      description: '',
      colorFamily: '',
      price: '',
      stock: '',
      imageUrl:
        'https://www.lacquester.com/wp-content/uploads/2017/03/EmptyBottleNew.png',
      open: false
    })
  }

  open() {
    this.setState({open: true})
  }

  close() {
    this.setState({open: false})
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        trigger={<Button onClick={this.open}>Add New Product</Button>}
      >
        <Modal.Header>Add a New Product:</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control="input"
                label="Name"
                placeholder="Product Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control="textarea"
                label="Description"
                placeholder="Write something snappy..."
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control="input"
                label="Price"
                placeholder="An Integer"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <Form.Field
                control="input"
                label="Stock"
                placeholder="An Integer"
                name="stock"
                value={this.state.stock}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control="input"
                label="Color Family"
                placeholder="A string"
                name="colorFamily"
                value={this.state.colorFamily}
                onChange={this.handleChange}
              />
              <Form.Field
                control="input"
                label="Image Url"
                placeholder="A string"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button type="button" onClick={this.close}>
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
