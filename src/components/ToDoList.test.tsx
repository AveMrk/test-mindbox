import {render, screen, fireEvent} from '@testing-library/react';
import { ToDoList } from './ToDoList';

describe('ToDoList test', () => {
  
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
  });
  test('fetch todo list', async() => {
    render(<ToDoList title='todos'/>);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes", {
      method: "GET",
      headers: { "content-type": "application/json" }
      }
    )
    const todos = await screen.findAllByTestId('item-all');
    expect(todos.length).toBe(3);
  })
  test('clear completed tasks', () => {
    render(<ToDoList title='todos'/>);
    const clearbtn = screen.getByText(/Clear completed/i);
    fireEvent.click(clearbtn);

    
    const clearedTasks = screen.queryAllByTestId('item-completed');
    expect(clearedTasks.length).toEqual(0);
  })
  
  
  test('change event', () => {
    render(<ToDoList title='todos'/>);
    const input = screen.getByPlaceholderText(/your note/i);
    
    fireEvent.input(input, {
      target: {value: '123'}
    })

    const inputAfterChange = screen.getByPlaceholderText('123');
    expect(inputAfterChange).toBeInTheDocument();
  
  })
  test('add new task', async() => {
    render(<ToDoList title='todos'/>);
    const form = screen.getByRole('form');



    fireEvent.submit(form);

    expect(window.fetch).toHaveBeenCalled();
    
  })
  afterEach(() => {
    //Удаляем созданную заметку
    fetch(`https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes/4`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
    jest.restoreAllMocks();
  });
  
})