import React, { useState } from 'react'
import '@atlaskit/css-reset'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './column'

const Container = styled.div`
    display: flex
`

// const result = {
//     draggableId: 'task-1',
//     type: 'TYPE',
//     reason: 'DROP',
//     source: {
//         droppableId: 'column-1',
//         index: 0,
//     },
//     destination: null
// }

const pipeline = {
    pipelineTarefas: {
      'task-1': { sequence: '', icon: '', id: 'task-1', content: 'Propecção Serviço TI' },
      'task-2': { sequence: '', icon: '', id: 'task-2', content: 'Propecção RushFile' },
      'task-3': { sequence: '', icon: '', id: 'task-3', content: 'Propecção CloudServer 1' },
      'task-4': { sequence: '', icon: '', id: 'task-4', content: 'Propecção CloudServer 2' },
      'task-5': { sequence: '', icon: '', id: 'task-5', content: 'Propecção CloudServer 3' },
      'task-6': { sequence: '', icon: '', id: 'task-6', content: 'Propecção CloudServer 4' },
      'task-7': { sequence: '', icon: '', id: 'task-7', content: 'Propecção CloudServer 5' },
      'task-8': { sequence: '', icon: '', id: 'task-8', content: 'Propecção CloudServer 6' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: '1º Contato',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-7']
      },
      'column-2': {
        id: 'column-2',
        title: 'Reunião Agendada',
        taskIds: ['task-4', 'task-8']
      },
      'column-3': {
        id: 'column-3',
        title: 'Contato pós-reunião',
        taskIds: ['task-5', 'task-6'],
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

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