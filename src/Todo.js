import React, { useState, useContext, createContext, useEffect } from 'react';
import "./Todo.css";
import uuid from 'react-uuid';

const TodoContext = createContext()

const RenderToDo = props => {
    const [todo, setTodo] = useState([])
    const [userInput, setUserInput] = useState('')

    const handleUserInputChange = event => {
        setUserInput(event.target.value)
    }

    const handleCreateNewTodo = () => {
        var newArr = todo;
        newArr.push(userInput)
        setTodo(newArr)
        setUserInput('')
    }

    const DeleteItem = (index) => {
        var newArr = todo.filter((val, ind) => ind !== index);
        setTodo(newArr)
    }

    const UpdateItem = (newVal, index) => {
        var newArr = todo.filter((val, ind) => ind !== index)
        newArr.splice(index, 0, newVal) 
        setTodo(newArr)
    }

    useEffect(() => {
        if (todo !== null && todo.length !== 0) {
            console.log("todo", todo)
        }
    }, [todo])

    const context = {
        DeleteItem,
        UpdateItem
    }


    return (
        <TodoContext.Provider value={context}>
            <div className="MainCont">
                <div className="InputWrapper">
                    <input type='text' value={userInput} onChange={handleUserInputChange} />
                </div>
                <div className="button" onClick={handleCreateNewTodo}>Submit</div>
                <RenderList ListItem={todo} />
            </div>
        </TodoContext.Provider>
    )
}

export default RenderToDo;


const RenderList = props => {
    const { ListItem } = props;

    return (
        <div>
            {ListItem ?
                ListItem.map((item, ind) => <RenderListItem name={item} index={ind} key={uuid()} />)
                :
                null
            }
        </div>

    )
}

const RenderListItem = props => {
    const { name, index } = props;

    const [readOnly, setReadOnly] = useState(true)
    const { DeleteItem, UpdateItem } = useContext(TodoContext);
    const [edits, setEdits] = useState(name)

    const handleEdits = event => {
        setEdits(event.target.value)
    }

    const toggleDisplay = () => {
        setReadOnly(prev => !prev)
    }

    const closeEditMode = () => {
        setReadOnly(true)
        setEdits(name)
    }

    return readOnly ? 
        <div id="itemWrapper">
            <div key={uuid()}>{name}</div>
            <div className="button" onClick={()=>DeleteItem(index)}>Delete</div>
            <div className="button" onClick={()=>toggleDisplay()}>Update</div>
        </div>
        : 
        <div id ="itemWrapper">
            <input value={edits} onChange={handleEdits} className="editInput" />
            <div className="button" onClick={() =>
            {
                UpdateItem(edits, index); 
                closeEditMode(); 
            }}>Submit Changes</div>
            <div className="button" onClick={() => closeEditMode()}>Cancel</div>
        </div>
} 