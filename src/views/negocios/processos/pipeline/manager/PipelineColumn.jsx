import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PipelineTask from 'src/views/negocios/processos/pipeline/manager/PipelineTask'

// ** Icon imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import NumericPositive1 from 'mdi-material-ui/NumericPositive1'
import Numeric2CircleOutline from 'mdi-material-ui/Numeric2CircleOutline'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Container = styled.div`
    margin: 8px;
    // border: 1px solid #393842;
    background-color: white;
    border-radius: 7px;
    background-color: ${props => (props.isDragging ? '#393842' : '#201d34')};
    width: 100%;
    display: flex;
    flex-direction: column;
`

const TaskList = styled.div`
    font-size: 13px;
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.isDraggingOver ? '#ff671f' : 'inherit'};
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

export default class PipelineColumn extends React.Component {
    
    handleChange = evt => {
        this.setState({html: evt.target.value});
    };

    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Grid container spacing={0} sx={{ marginTop:"4px" }}>
                        <Grid item xs={12} md={10} lg={10} {...provided.dragHandleProps}>
                                <Typography 
                                    
                                    sx={{ fontSize: 16, fontWeight: 500, color: 'white', ml: 2.35, pt: 1 }}
                                >
                                    {this.props.column.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={2} lg={2} sx={{ textAlign: 'right', p: 1, pr: 1  }} >
                                <Numeric2CircleOutline sx={{ marginRight: "10%", color: '#959595', fontSize: "20px" }} />
                                <DotsVertical sx={{ cursor: "pointer", color: '#959595', fontSize: "20px" }} />
                                <NumericPositive1 sx={{ cursor: "pointer", color: '#959595', fontSize: "20px" }} />
                            </Grid>
                        </Grid>
                        <Droppable 
                            droppableId={this.props.column.id}
                            type='task'
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >   
                                    {
                                        this.props.pipelineTarefas.map((tarefa, index) =>
                                            <PipelineTask key={tarefa.id} task={tarefa} index={index} />
                                        )
                                    }
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}
// ** ContentEditable
// ** https://github.com/lovasoa/react-contenteditable