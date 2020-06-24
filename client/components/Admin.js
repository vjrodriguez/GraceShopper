import React from 'react'
import {connect} from 'react-redux'
import {
  Grid,
  Statistic,
  Accordion,
  Icon,
  GridColumn,
  Button,
  Modal,
  Header,
  Dropdown
} from 'semantic-ui-react'
import AdminUpdateProduct from './AdminUpdateProduct'
import AdminAddProduct from './AdminAddProduct'
import AdminUserView from './AdminUserView'
import {
  createProduct,
  getProducts,
  submitUpdate,
  removeProduct,
  getUsers,
  toggleAdmin,
  fetchStats
} from '../store/admin'
import makeTotalStr from '../../script/makeTotalStr'

export class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      activeIndex: -1
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick = (e, titleProps) => {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getUsers()
    this.props.fetchStats()
  }

  render() {
    const {activeIndex} = this.state
    console.log('PROPS', this.props)
    return (
      <Grid divided="vertically" className="main-content-section">
        <Grid.Row columns={3}>
          <Grid.Column textAlign="center">
            <Statistic>
              <Statistic.Value>
                {this.props.users ? this.props.users.length : 0}
              </Statistic.Value>
              <Statistic.Label>User Accounts</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Statistic>
              <Statistic.Value>
                {this.props.totalQty ? this.props.totalQty : 0}
              </Statistic.Value>
              <Statistic.Label>Products Sold</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Statistic>
              <Statistic.Value>
                {' '}
                {this.props.totalRev
                  ? `$${makeTotalStr(this.props.totalRev)}`
                  : '$0'}
              </Statistic.Value>
              <Statistic.Label>Total Revenue</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Accordion fluid styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Manage Products
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Grid>
                <Grid.Row columns={8}>
                  <GridColumn>
                    <Header as="h4">Product Name:</Header>
                  </GridColumn>
                  <GridColumn>
                    <Header as="h4">Color Family:</Header>
                  </GridColumn>
                  <GridColumn>
                    <Header as="h4">Description:</Header>
                  </GridColumn>
                  <GridColumn>
                    <Header as="h4">Price:</Header>
                  </GridColumn>
                  <GridColumn>
                    <Header as="h4">Stock:</Header>
                  </GridColumn>
                  <GridColumn>
                    <Header as="h4">Image:</Header>
                  </GridColumn>
                </Grid.Row>
                {this.props.products
                  ? this.props.products.map(product => {
                      return (
                        <AdminUpdateProduct
                          product={product}
                          submitUpdate={this.props.submitUpdate}
                          key={product.id}
                          removeProduct={this.props.removeProduct}
                        />
                      )
                    })
                  : ''}
                <Grid.Row columns={1}>
                  <AdminAddProduct createProduct={this.props.createProduct} />
                </Grid.Row>
              </Grid>
            </Accordion.Content>
          </Accordion>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Accordion fluid styled>
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Manage Users
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Grid>
                {/* <Grid.Row columns={6}>
                  <Grid.Column>
                    <Dropdown
                      placeholder="Last Name"
                      search
                      selection
                      clearable
                      options={[
                        {
                          key: 'LastName1',
                          text: 'LastName1',
                          value: 'LastName1',
                        },
                        {
                          key: 'LastName2',
                          text: 'LastName2',
                          value: 'LastName2',
                        },
                      ]}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      placeholder="Email"
                      search
                      selection
                      clearable
                      options={[
                        {
                          key: 'Email1',
                          text: 'Email1',
                          value: 'Email1',
                        },
                        {
                          key: 'Email2',
                          text: 'Email2',
                          value: 'Email2',
                        },
                      ]}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      placeholder="Admin Permissions?"
                      search
                      selection
                      clearable
                      options={[
                        {
                          key: 'Admin',
                          text: 'Admin',
                          value: 'Admin',
                        },
                        {
                          key: 'Not Admin',
                          text: 'Not Admin',
                          value: 'Not Admin',
                        },
                      ]}
                    />
                  </Grid.Column>
                </Grid.Row> */}
                <Grid.Row columns={5}>
                  <GridColumn>
                    <Header as="h4">First Name:</Header>
                  </GridColumn>
                  <GridColumn>
                    <Header as="h4">Last Name:</Header>
                  </GridColumn>
                  <GridColumn>
                    <Header as="h4">Email:</Header>
                  </GridColumn>
                </Grid.Row>
                {this.props.users
                  ? this.props.users.map(user => {
                      return (
                        <AdminUserView
                          key={user.id}
                          user={user}
                          toggleAdmin={this.props.toggleAdmin}
                        />
                      )
                    })
                  : ''}
              </Grid>
            </Accordion.Content>
          </Accordion>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapState = state => {
  return {
    products: state.admin.products,
    users: state.admin.users,
    totalRev: state.admin.totalRev,
    totalQty: state.admin.totalQty
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    createProduct: newProduct => dispatch(createProduct(newProduct)),
    submitUpdate: updatedProduct => dispatch(submitUpdate(updatedProduct)),
    removeProduct: productId => dispatch(removeProduct(productId)),
    getUsers: () => dispatch(getUsers()),
    toggleAdmin: userId => dispatch(toggleAdmin(userId)),
    fetchStats: () => dispatch(fetchStats())
  }
}

export default connect(mapState, mapDispatch)(Admin)
