const  initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Propecção Serviço TI' },
      'task-2': { id: 'task-2', content: 'Propecção RushFile' },
      'task-3': { id: 'task-3', content: 'Propecção CloudServer 1' },
      'task-4': { id: 'task-4', content: 'Propecção CloudServer 2' },
      'task-5': { id: 'task-5', content: 'Propecção CloudServer 3' },
      'task-6': { id: 'task-6', content: 'Propecção CloudServer 4' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To Do',
        tasksIds: ['task-4', 'task-2', 'task-6']
      },
      'column-2': {
        id: 'column-2',
        title: 'Doing',
        tasksIds: ['task-3']
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        tasksIds: ['task-5', 'task-1'],
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData