import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ToDo } from '../../types';
type FormProps = {
  
  //setLoading: Dispatch<SetStateAction<boolean>>;
  setLoading: (loading:boolean) => void;
  setList: (list:ToDo[]) => void
}

export const FormContainer = ({setLoading,  setList}:FormProps) => {
  const [todoContent, setTodoContent] = useState("your note");

  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    
      const data = {
        text: todoContent,
        isCompleted: false
      };

        fetch("https://651d654b44e393af2d59b0eb.mockapi.io/my-api/notes/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data)
        })
        .then((res) => {
          if (res.ok) {
            //handleReload();
            return res.json();
          }
        })
        .then((notesList) => {
          //handleReload();
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
        })
        .catch((error) => {
        });
   
   
    
    setTodoContent('your note')
    //setLoading(true);
   
  };
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };
  return (
    <Form role='form' onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control 
        type="text"  
        value={todoContent}
        placeholder={todoContent}
        onChange={handleChange}
        data-testid='input'
      />
    </Form.Group>
  </Form>
  )
}