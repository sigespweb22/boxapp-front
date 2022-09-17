import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled.div`
    font-family: "Montserrat",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    color: white;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: #1C1730;
    width: 100%;

    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    color: white;
    padding: 8px;
`
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? '#413C57' : '#28243D')}
    flex-grow: 1;
    min-height: 100px
`
export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
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