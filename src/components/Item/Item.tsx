import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Placeholder from 'react-bootstrap/Placeholder';
import {ToDo} from '../../types';

type ItemProperties = {
  item: ToDo;
  setList: (list:ToDo[]) => void;
  testId: string;
}

export const Item = ({item, setList, testId}:ItemProperties) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const handleClick = (e:React.MouseEvent<HTMLElement>) => {
    const el = (e.target as HTMLElement);

    el.classList.add('loading')

    const id = el.id;
    setLoading(true);

    const text = el.innerText;

    const data = {
      text: text,
      isCompleted: !isCompleted
    };

    fetch(`https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
       console.log('ok')
       setIsCompleted(!isCompleted)
        setLoading(false);
        return res.json();
      }
    })
    .then((notesList) => {
      console.log('ok put', notesList);
      fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes", {
        method: "GET",
        headers: { "content-type": "application/json" }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((notesList) => {
          console.log('ok noteslist')
          console.log(notesList)
          setList(notesList); // Do something with the list of tasks
  
        })
        .catch((error) => {
          setLoading(false);

        });
    })
    .catch((error) => {
      el.classList.remove('loading')
      setLoading(false);

    });
   
  }
  let type = item.isCompleted === true ? 'Completed' : 'Active';
  //if(isCompleted){item.type = 'Completed'}
  useEffect(()=> {
  },[isCompleted])
  return (
    <>
    {loading && <Placeholder bg="secondary" as={ListGroup.Item} >please wait...</Placeholder>}
    {!loading && 
    <ListGroup.Item 
    data-testid={testId}
    key={item.id} 
    id={item.id} 
    type={type} 
    className={'todo todo-'+type} onClick={handleClick}>
     {item.text}
    </ListGroup.Item>
    }
   
  
  
  
   </>
  )
}