import React from 'react';
import TaskItem from './TaskItem';

function TaskList(props) {
  return (
    <div>      
      <div
        style={{ maxHeight: '60vh' }}
        className='overflow-auto mb-1 mb-sm-0'
      >
        {
          props.tasks_ar
          &&
          props.tasks_ar.map(item => {
            return (
              <div
                key={item.id}
                className="accordion"
                id="accordionPanelsStayOpenExample"
              >
                <TaskItem>{item}</TaskItem>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default TaskList
