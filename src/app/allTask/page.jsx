'use client';
import React, { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { toggleComplete, toggleImportant, deleteTodo, editTodo } from '../../redux/TodoSlice';
import TaskCard from '../../components/TaskCard';
import EditTodoDialog from '../../components/EditTodo';
import { Container, Typography,TextField,InputAdornment } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import { usePathname } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';

const AllTask = () => {

  const pathname = usePathname();
  const tasks = useSelector((state) => state.todos); 
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [query, setQuery] = useState('');


const handleSearch = (query) => {
  if (!query) {
    filterTasksByRoute();
  } else {
    setFilteredTasks(
      tasks.filter((task) =>
        task.text.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
};


  const filterTasksByRoute = () => {
    switch (pathname) {
      case '/completed':
        setFilteredTasks(tasks.filter((task) => task.completed));
        break;
      case '/uncompleted':
        setFilteredTasks(tasks.filter((task) => !task.completed));
        break;
      case '/important':
        setFilteredTasks(tasks.filter((task) => task.important));
        break;
      case '/todaytask':
        const today = new Date().toISOString().split('T')[0];
        setFilteredTasks(tasks.filter((task) => task.creationDate === today));
        break;
      case '/allTask':
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  useEffect(() => {
    filterTasksByRoute();
  }, [pathname, tasks]);


  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleToggleImportant = (id) => {
    dispatch(toggleImportant(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);  
    setIsEditDialogOpen(true);  
  };

  const handleEditTodo = (updatedTask) => {
    dispatch(editTodo(updatedTask));  
    setIsEditDialogOpen(false);  
  };
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    handleSearch(value); 
  };
 
  return (
    <Container>
       <TextField
      className='searchInput'
        variant="outlined"
        placeholder="Search..."
        size="small"
        value={query} 
        onChange={handleSearchChange} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">

              <SearchIcon />
            </InputAdornment>
          ),
        }}
        
      />
      <Typography variant="h4" gutterBottom  sx={{color:'black'}}>All Tasks...</Typography>
      <div  style={{display:'flex', gap:'10px'}}>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant}
            onDelete={handleDelete}
            onEdit={handleEditClick}  
          />
        ))
      ) : (
        <Typography variant='h3' sx={{color:'green'}} >No tasks available!</Typography>
      )}
      </div>

     
      {selectedTask && (
        <EditTodoDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          task={selectedTask}
          onEditTodo={handleEditTodo}
        />
      )}
    </Container>
  );
};

export default AllTask;
