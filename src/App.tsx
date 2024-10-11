import './App.css';
import { ToDoList } from './components/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  
  return (
    <div className='container'>
      <ToDoList title='todos'></ToDoList>
    </div>
  );
}

export default App;
