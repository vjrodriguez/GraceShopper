import React from 'react'
import {Button, Container, Icon, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class Cart extends React.Component {
  render() {
    return (
      <Container>
        <Header textAlign="right">$Total Price</Header>
        <Button animated="vertical">
          <Button.Content visible>Keep Shopping</Button.Content>
          <Button.Content hidden>
            <Icon name="shopping bag" />
          </Button.Content>
        </Button>
        <Button animated>
          <Button.Content visible>Go to Checkout</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </Container>
    )
  }
}
