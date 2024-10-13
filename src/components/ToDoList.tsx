import { useState, useEffect} from 'react';
import { Stack } from 'react-bootstrap';
import { TabContainer } from './TabContainer/TabContainer';
import { FormContainer } from './FormContainer/FormContainer';
import { ToDo } from '../types';

type ToDoProps = {
  title: string,
}
type tab = 'All' | 'Active'|'Completed';
export const ToDoList = (props:ToDoProps) => {
  const tabs:tab[] = ['All', 'Active', 'Completed'];
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<ToDo[]>([]);
  useEffect(() => {
    setLoading(true);
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
        setList(notesList); // Do something with the list of tasks
        setLoading(false);

      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);
  useEffect(()=> {
    setLoading(true);
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
        setList(notesList); 
        setLoading(false);

      })
      .catch((error) => {
        setLoading(false);
      });
  }, [list.length])
  
  const changeList = (list:ToDo[]) => {
    if(list){setList(list)}
  }
  const changeLoading = (loading:boolean) => {
    setLoading(loading);
  }

  const handleClear = () => {
    const ids = list.filter((el) => el.isCompleted ===true).map(el => el.id)
    ids.forEach(id => {
      fetch(`https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) => {
          setLoading(true);
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
              setList(notesList);
              setLoading(false);

            })
            .catch((error) => {
              console.log(error)
              setLoading(false);
            });
        })
        .catch((error) => {
          console.log(error)
        });
    });

  }

  return(
    <>
    <h1>{props.title}</h1>
   
    <FormContainer setLoading={changeLoading} setList={changeList}/>
   
    <TabContainer key="tabs-container" tabs={tabs} list={list} loading={loading} setList={changeList}/>

    <Stack direction="horizontal" gap={2}>
      <div className="p-2">{list.filter((item) => item.isCompleted === false).length} items left</div>
      <div className="p-2 ms-auto btn-clear" onClick={handleClear}>Clear completed</div>
    </Stack>
    </>
  )
}