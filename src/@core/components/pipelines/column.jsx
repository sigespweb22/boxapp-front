import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled.div`
    color: white;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: #28243D;
`;

const Title = styled.h3`
    color: white;
    padding: 8px;
`
const TaskList = styled.div`
    padding: 8px;
`
export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {provided => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
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