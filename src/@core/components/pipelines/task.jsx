import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

const Container = styled.div`
    height: 70px;
    color: ${props => (props.isDragging ? 'white' : '#a2a0a2')};
    border: 1px solid #393842;
    border-radius: 7px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? '#FF671F' : '#28243d')}
`
export default class Task extends React.Component {
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
                        <Grid container spacing={0} sx={{ marginTop:"4px" }}>
                            <Grid xs={10}
                                sx={{
                                    color: '#4a4948',
                                    fontSize: "12px",
                                    marginBotto: "5px"
                                }}
                            >
                                {"pre-venda #10"}
                                <Grid xs={10}
                                    sx={{
                                        color: 'white',
                                        fontSize: "15px",
                                        marginBottom: "5px"
                                    }}>
                                    {this.props.task.content}
                                </Grid>
                            </Grid>
                            <Grid xs={2}
                                sx={{
                                    paddingLeft: "10%",
                                    paddingTop: "3%"
                                }}
                            >
                                <AvatarGroup
                                    max={1}
                                    sx={{
                                        '& .MuiAvatarGroup-avatar': { fontSize: '.875rem', borderRadius: "50px", border: "none" },
                                        '& .MuiAvatar-root, & .MuiAvatarGroup-avatar': { width: 32, height: 32 }
                                    }}
                                >
                                    <Avatar key={1} alt={"Alan Rezende"} src={`/images/avatars/1.png`} />
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                    </Container>
                )}
            </Draggable>
        )
    }
}