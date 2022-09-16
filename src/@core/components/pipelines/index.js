import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './column'

const PipelineKanBan = () => {
    const state = initialData
    
    onDragEnd = (result) => {
        // TODO: reorder our column
    }

    return (
        <DragDropContext onDragStart={this.onDragEnd}
        >
            { 
                state.columnOrder.map((columnId) => {
                    const column = state.columns[columnId]
                    const tasks = column.tasksIds.map(taskId => state.tasks[taskId])
            
                    return <Column key={column.id} column={column} tasks={tasks} />
                })
            }
        </DragDropContext>
        
    )
    
}

export default PipelineKanBan