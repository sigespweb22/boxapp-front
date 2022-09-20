import React, { useState } from 'react'
import '@atlaskit/css-reset'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import pipeline from './initial-data'
import Column from './column'

const Container = styled.div`
    display: flex
`

const PipelineKanBan = () => {
    const [state, setState] = useState(pipeline)

    const onDragEnd = result => {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = state.columns[source.droppableId]
        const finish = state.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }
    
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            }
    
            setState(newState)

            return
        }

        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        setState(newState)
    }
    
    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Container>
                {
                    state.columnOrder.map((columnId) => {
                        const column = state.columns[columnId]
                        const pipelineTarefas = column.taskIds.map(taskId => state.pipelineTarefas[taskId])
            
                        return <Column key={column.id} column={column} pipelineTarefas={pipelineTarefas} />
                    })
                }
            </Container>
        </DragDropContext>
    )
}
// https://egghead.io/lessons/react-conditionally-allow-movement-using-react-beautiful-dnd-draggable-and-droppable-props

export default PipelineKanBan