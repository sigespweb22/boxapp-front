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
// const draggableSnapshot = {
//     isDragging: true,
//     dragggingOver: 'column-1'
// }

// const droppableSnapshot = {
//     isDraggingOver: true,
//     dragggingOverWith: 'task-1'
// }

// const pipeline = {
//     pipelineTarefas: {
//       'task-1': { sequence: '', icon: '', id: 'task-1', content: 'Propecção Serviço TI' },
//       'task-2': { sequence: '', icon: '', id: 'task-2', content: 'Propecção RushFile' },
//       'task-3': { sequence: '', icon: '', id: 'task-3', content: 'Propecção CloudServer 1' },
//       'task-4': { sequence: '', icon: '', id: 'task-4', content: 'Propecção CloudServer 2' },
//       'task-5': { sequence: '', icon: '', id: 'task-5', content: 'Propecção CloudServer 3' },
//       'task-6': { sequence: '', icon: '', id: 'task-6', content: 'Propecção CloudServer 4' },
//       'task-7': { sequence: '', icon: '', id: 'task-7', content: 'Propecção CloudServer 5' },
//       'task-8': { sequence: '', icon: '', id: 'task-8', content: 'Propecção CloudServer 6' }
//     },
//     columns: {
//       'column-1': {
//         id: 'column-1',
//         title: '1º Contato',
//         taskIds: ['task-1', 'task-2', 'task-3', 'task-7']
//       },
//       'column-2': {
//         id: 'column-2',
//         title: 'Reunião Agendada',
//         taskIds: ['task-4', 'task-8']
//       },
//       'column-3': {
//         id: 'column-3',
//         title: 'Contato pós-reunião',
//         taskIds: ['task-5', 'task-6'],
//       }
//     },
//     columnOrder: ['column-1', 'column-2', 'column-3']
// }

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
                                this.props.pipelineTarefas.map((tarefa, index) =>
                                    <Task key={tarefa.id} task={tarefa} index={index} />
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