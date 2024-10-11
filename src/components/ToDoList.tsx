import { nanoid } from 'nanoid';
import { useState, useEffect, SetStateAction} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import { Stack } from 'react-bootstrap';


type ToDo = {
  id: string,
  text: string,
  type: 'active' | 'completed'

}

type ToDoProps = {
  title: string,
}
type tab = 'All' | 'Active'|'Completed';
export const ToDoList = (props:ToDoProps) => {
  const tabs:tab[] = ['All', 'Active', 'Completed'];
  const [loading, setLoading] = useState<string>();
  const [key, setKey] = useState<any>(tabs[0]);
  const [list, setList] = useState<ToDo[]>([]);
  const [todoContent, setTodoContent] = useState("your note");
  useEffect(() => {
   handleReload();
  }, []);
  useEffect(()=> {
    handleReload();
  }, [list.length, list.filter(el => el.type === 'completed').length])

  const handleReload = () => {
    setLoading('all');
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
        setLoading('');

      })
      .catch((error) => {
        setLoading('');
      });
  }

  const handleTabSelect = (k:string|null, e:React.SyntheticEvent<unknown>):void => {
    setKey(k);
  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };
  const handleClear = () => {
    const ids = list.filter((el) => el.type ==='completed').map(el => el.id)
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
        .then((notesList) => {
  
        })
        .catch((error) => {
        });
    });

    handleReload();
  }
  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading('all');
   // setList([...list, {id: nanoid(), text: todoContent, type: "active"}])
    const data = {
      id: nanoid(),
      text: todoContent,
      type: "active"
    };

    fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
        setLoading('');

        return res.json();
      }
    })
    .catch((error) => {
      setLoading('');
    });
   
    handleReload();
    
    setTodoContent('your note')
  };
  const handleClick = (e:React.MouseEvent<HTMLElement>) => {
    
    const el = (e.target as HTMLElement);

    el.classList.add('loading')

    const id = el.id;
    setLoading(id);

    const text = el.innerText;
    let type = el.getAttribute('type');
    
    if(type === 'active'){type = 'completed'}
    else {type = 'active'}

    const data = {
      id: nanoid(),
      text: text,
      type: type
    };

    fetch(`https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
        setLoading('');
        el.classList.remove('loading')
        handleReload();

        return res.json();
      }
    })
    .catch((error) => {
      el.classList.remove('loading')
      setLoading('');

    });
   
  }
  
  return(
    <>
    <h1>{props.title}</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control 
          type="text"  
          value={todoContent}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
   
    <Tabs
      defaultActiveKey={key}
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={handleTabSelect}
    >
      
     
        <Tab eventKey="All" title="All">

          <ListGroup>
          <>
          {list.map((item) => (
            <>
             {item.id === loading && <Placeholder bg="secondary" as={ListGroup.Item}  >please wait...</Placeholder>}
             {item.id !== loading && 
             <ListGroup.Item key={item.id} id={item.id} type={item.type} className={'todo todo-'+item.type} onClick={handleClick}>
              {item.text}
             </ListGroup.Item>
             }
            
           
           
           
            </>
            
            
          ))}
          </>
          </ListGroup>
        </Tab>
        <Tab eventKey="Active" title="Active">
        <ListGroup>
          {list.filter(el => el.type === 'active').map((item) => (
            <ListGroup.Item key={item.id} id={item.id} type={item.type} className={'todo todo-'+item.type} onClick={handleClick}>
            {item.text}
            </ListGroup.Item>
          ))}
          </ListGroup>
        </Tab>
        <Tab eventKey="Completed" title="Completed" >
          
          <ListGroup>
          {list.filter(el => el.type === 'completed').map((item) => (
            <ListGroup.Item key={item.id} id={item.id} type={item.type} className={'todo todo-'+item.type} onClick={handleClick}>
            {item.text}
            </ListGroup.Item>
          ))}
          </ListGroup>
        </Tab>

    </Tabs>
    <Stack direction="horizontal" gap={2}>
      <div className="p-2">{list.filter((item) => item.type === 'active').length} items left</div>
      <div className="p-2 ms-auto" onClick={handleClear}>Clear completed</div>
    </Stack>
    </>
  )
}