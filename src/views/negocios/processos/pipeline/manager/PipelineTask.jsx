// ** React Imports
import React from 'react'

import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Ticket from 'mdi-material-ui/Ticket'

//** '#fb624a */
const Container = styled.div`
  height: auto;
  color: ${props => (props.isDragging ? 'white' : '#a2a0a2')};
  border: 1px solid #393842;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 12px;
  background-color: ${props => (props.isDragging ? '#18152a' : '#201d34')};
`

const avatars = [
  { index: 1, nome: 'Alan', avatar: '/images/avatars/3.png' },
  { index: 2, nome: 'Gustavo', avatar: '/images/avatars/1.png' },
  { index: 3, nome: 'Tiago', avatar: '/images/avatars/3.png' }
]

const Handle = styled.div`
  width: 30px;
  height: 10px;
  background-color: #56CA00;
  border-radius: 50px;
  margin-right: 8px;
`

export default class PipelineTask extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Grid container spacing={0} sx={{ marginTop: 1 }}>
              <Grid item xs={12} md={12} lg={12}>
                  <Ticket sx={{ fontSize: '0.875rem', mr: 2.25, color: 'primary.main' }} />
                  <Typography sx={{ fontSize: 12, color: 'secondary.main' }}>{'pre-venda #10'}</Typography>
              </Grid>
              <Grid item xs={12} md={10} lg={10} sx={{ color: 'white', fontSize: '15px', marginBottom: '5px' }}>
                  {this.props.task.content}
              </Grid>
              <Grid xs={2}>
                <AvatarGroup max={1} sx={{
                    '& .MuiAvatarGroup-avatar': { fontSize: '.875rem', borderRadius: '50px', border: 'none' },
                    '& .MuiAvatar-root, & .MuiAvatarGroup-avatar': { width: 32, height: 32 }
                  }}
                >
                  {avatars.map(x => <Avatar key={x.index} alt={x.nome} src={x.avatar}/>)}
                </AvatarGroup>
              </Grid>
            </Grid>
            <Handle />
          </Container>
        )}
      </Draggable>
    )
  }
}
// https://egghead.io/lessons/react-conditionally-allow-movement-using-react-beautiful-dnd-draggable-and-droppable-props
