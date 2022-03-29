import { Dispatch, SetStateAction, useState, MouseEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { Todo } from '../model/todo';
import ClearIcon from '@mui/icons-material/Clear';

const InputBar = (props: {
    todos: Todo[],
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
}) => {

    const [nextId, setNextId] = useState<number>(2);
    const [input, setInput] = useState<Todo>({id: nextId, text: '', done: false});

    const addTodoItem = (todos: readonly Todo[], todo: Todo): Todo[] => {
        setNextId(nextId+1);
        setInput({id: nextId, text: '', done: false, place: todo.place})
        return [...todos, todo]
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: '10px' }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    value={input.text}
                    placeholder="Add Todo"
                    onChange={(e) => setInput({...input, text: e.target.value})}
                />
                <Tooltip title="Add Todo" placement="top">
                    <IconButton
                        color="primary" 
                        sx={{ p: '10px' }} 
                        onClick={() => props.setTodos(addTodoItem(props.todos, {id: nextId, text: input.text, done: false, place: input.place}))}
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title="Edit Place" placement="top">
                    <IconButton color="error" sx={{ p: '10px' }} onClick={handleClick}>
                        <EditLocationAltIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {setInput({...input, place: 'home'}); handleClose()}}>
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {setInput({...input, place: 'work'}); handleClose()}}>
                        <ListItemIcon>
                            <WorkIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Work</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {setInput({...input, place: undefined}); handleClose()}}>
                        <ListItemIcon>
                            <ClearIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Clear</ListItemText>
                    </MenuItem>
                </Menu>
            </Paper>
    );
}

export default InputBar;