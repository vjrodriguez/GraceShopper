import React from 'react'
import {Grid, Button, Radio} from 'semantic-ui-react'

export default function AdminUserView(props) {
  const {user, toggleAdmin} = props
  return (
    <Grid.Row columns={5} verticalAlign="middle">
      <Grid.Column>{user.firstName}</Grid.Column>
      <Grid.Column>{user.lastName}</Grid.Column>
      <Grid.Column>{user.email}</Grid.Column>
      <Grid.Column>
        <Button>Orders</Button>
      </Grid.Column>
      <Grid.Column>
        {user.isAdmin ? (
          <Button basic color="red" onClick={() => toggleAdmin(user.id)}>
            Revoke Admin
          </Button>
        ) : (
          <Button basic color="green" onClick={() => toggleAdmin(user.id)}>
            Make Admin
          </Button>
        )}
      </Grid.Column>
    </Grid.Row>
  )
}
