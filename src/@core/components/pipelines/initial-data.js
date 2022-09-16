const  initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Propecção Serviço TI' },
      'task-2': { id: 'task-1', content: 'Propecção RushFile' },
      'task-3': { id: 'task-1', content: 'Propecção CloudServer 1' },
      'task-4': { id: 'task-1', content: 'Propecção CloudServer 2' },
      'task-5': { id: 'task-1', content: 'Propecção CloudServer 3' },
      'task-6': { id: 'task-1', content: 'Propecção CloudServer 4' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: '1º contato',
        tasksIds: ['task-1', 'task-2', 'task-3']
      },
      'column-2': {
        id: 'column-2',
        title: 'Doing',
        tasksIds: ['task-4']
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        tasksIds: ['task-5', 'task-5'],
      }
    },
    columnOrder: ['column-1']
}

export default initialData