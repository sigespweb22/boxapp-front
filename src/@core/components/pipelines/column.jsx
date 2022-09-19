import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'

// ** Icon imports
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import NumericPositive1 from 'mdi-material-ui/NumericPositive1'
import Numeric2CircleOutline from 'mdi-material-ui/Numeric2CircleOutline'

import Grid from '@mui/material/Grid'

const Container = styled.div`
    margin: 8px;
    border: 1px solid #393842;
    border-radius: 5px;
    background-color: #28243d;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    font-size: 15px;
    color: #ff671f;
    padding: 8px;
`
const TaskList = styled.div`
    font-size: 13px;
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? '#2f2b46' : '#28243d')}
    flex-grow: 1;
    min-height: 100px;
`
export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Grid container spacing={0} sx={{ marginTop:"4px" }}>
                    <Grid xs={7}>
                        <Title>
                            {this.props.column.title}
                        </Title>
                    </Grid>
                    <Grid xs={5} sx={{ paddingTop: "8px", textAlign: "center", paddingLeft: "25%" }}>
                        <Numeric2CircleOutline 
                            sx={{
                                    marginRight: "5%",
                                    color: '#4a4948',
                                    fontSize: "20px"
                                }}
                        />
                        <NumericPositive1 
                            sx={{
                                    cursor: "pointer",
                                    color: '#4a4948',
                                    fontSize: "20px"
                                }}
                        />
                        <DotsHorizontal 
                            sx={{
                                    cursor: "pointer",
                                    color: '#4a4948',
                                    fontSize: "20px"
                                }}
                        />                        
                    </Grid>
                </Grid>
                <Droppable 
                    droppableId={this.props.column.id}
                >
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >   
                            {
                                this.props.tasks.map((task, index) =>
                                    <Task key={task.id} task={task} index={index} />
                                )
                            }
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}