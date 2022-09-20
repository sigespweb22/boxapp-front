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

export default pipeline