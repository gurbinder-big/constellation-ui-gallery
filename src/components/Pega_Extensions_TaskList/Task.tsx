import { useRef, useState, useEffect } from 'react';
import { Button, Checkbox, Icon, Input, registerIcon } from '@pega/cosmos-react-core';
import * as trashIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/trash.icon';
import * as pencil from '@pega/cosmos-react-core/lib/components/Icon/icons/pencil.icon';
import { TaskCard } from './styles';
import type { Task } from './index';
registerIcon(trashIcon, pencil);


interface TaskElementProps {
  task: Task;
  saveableDataPage: string;
  deleteTask: (id: string) => void;
  getPConnect: () => any;
}
const TaskElement = (props: TaskElementProps) => {
  const { task, deleteTask, getPConnect, saveableDataPage } = props;
  const [status, setStatus] = useState(task.IsCompleted);
  const [title, setTitle] = useState(task.Label);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = title;
    }
  }, [isEditing]);

  const submitTask = () => {
    setIsEditing(false);
    setTitle(inputRef.current?.value || '');
  };

  const editTask = () => {
    setIsEditing(true);
  };

  const toggleStatus = () => {
    setStatus((prevStatus) => {
      const updatedValue = !prevStatus;
      // API call to update the backend
      (window as any).PCore.getRestClient()
        .invokeRestApi('updateDataObject', {
          queryPayload: {
            data_view_ID: saveableDataPage,
          },
          body: {
            data: {
              Id: task.Id, // Send the task Id as pyGUID
              IsCompleted: updatedValue, // Send the updated Status
            },
          },
        })
        .catch(() => {});
      return updatedValue;
    });
  };

  return (
    <TaskCard key={task.Id}>
      {isEditing ? (
        <>
          <Input label={getPConnect().getLocalizedValue('Task name')} labelHidden ref={inputRef} />
          <Button icon variant='text' label={getPConnect().getLocalizedValue('Submit task')} onClick={submitTask}>
            <Icon name='check' />
          </Button>
        </>
      ) : (
        <>
          <Checkbox
            checked={status} // Use the boolean Status directly for the checkbox
            onChange={toggleStatus} // Pass the Id and current Status to toggle
            label={title}
          />
          <Button variant='text' label={getPConnect().getLocalizedValue('Edit task')} onClick={editTask}>
            <Icon name='pencil' />
          </Button>
          <Button
            variant='text'
            label={getPConnect().getLocalizedValue('Delete task')}
            onClick={() => deleteTask(task.Id)}
          >
            <Icon name='trash' />
          </Button>
        </>
      )}
    </TaskCard>
  );
};

export default TaskElement;
