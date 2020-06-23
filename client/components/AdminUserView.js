import React from 'react'
import {Grid, Button} from 'semantic-ui-react'

export default function AdminUserView(props) {
  return (
    <Grid.Row columns={5} verticalAlign="middle">
      <Grid.Column>FirstName</Grid.Column>
      <Grid.Column>LastName</Grid.Column>
      <Grid.Column>email@email.com</Grid.Column>
      <Grid.Column>
        <Button>Orders</Button>
      </Grid.Column>
      <Grid.Column>
        <Button>Make Admin / Revoke Admin</Button>
      </Grid.Column>
    </Grid.Row>
  )
}
