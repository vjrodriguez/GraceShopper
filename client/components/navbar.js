import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Button} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <Menu inverted>
          {/* The navbar will show these links before you log in */}
          <Menu.Item position="left">
            <Button.Group>
              <Button inverted as={Link} to="/products">
                Products
              </Button>
              <Button inverted as={Link} to="/cart">
                Cart
              </Button>
            </Button.Group>
          </Menu.Item>
          <Menu.Item position="right">
            <Button.Group>
              <Button onClick={handleClick}>Logout</Button>
            </Button.Group>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu inverted>
          {/* The navbar will show these links before you log in */}
          <Menu.Item position="left">
            <Button.Group>
              <Button inverted as={Link} to="/products">
                Products
              </Button>
            </Button.Group>
          </Menu.Item>
          <Menu.Item position="right">
            <Button.Group>
              <Button inverted as={Link} to="/login">
                Login
              </Button>

              <Button inverted as={Link} to="/signup">
                Sign Up
              </Button>
            </Button.Group>
          </Menu.Item>
        </Menu>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
