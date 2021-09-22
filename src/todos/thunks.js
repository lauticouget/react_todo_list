import {
    createTodo,
    removeTodo,
    loadTodosInProgress,
    loadTodosSuccess,
    loadTodosFailure,
    markTodoAsCompleted,
} from './actions';

export const loadTodos = () => async (dispatch) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();
    
        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },method: 'delete'
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const deleteCompletedTodosRequest = todos => async dispatch => {
    try {
        const ids = todos.map(t => t.id);
        const promiseBag = [];
        for (const id of ids) {
            promiseBag.push(await fetch(`http://localhost:8080/todos/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },method: 'delete'
            }))
        }
        
        const deletedTodos = await Promise.resolve(promiseBag);
        for (const todo of deletedTodos) {
            const formattedTodo = await todo.json();
            dispatch(removeTodo(formattedTodo));
        }
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const markTodoAsCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        });
        const completedTodo = await response.json();
        dispatch(dispatch(markTodoAsCompleted(completedTodo)));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}
export const displayAlert = text => () => {
    alert(text);
};