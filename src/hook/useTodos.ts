import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store/store';
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  fetchTodoById,
} from '../store/todosSlice';
import {ToDo} from '../models/ToDo';

export const useTodos = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {todo, todos, loading, error} = useSelector(
    (state: RootState) => state.todos,
  );

  const loadTodosifNeeded = () => {
    dispatch(fetchTodos());
  };

  const loadById = async (id: string) => {
    const result = await dispatch(fetchTodoById(id));
    if (fetchTodoById.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  };

  const addNewTodo = async (tod: ToDo) => {
    const result = await dispatch(addTodo(tod));
    return addTodo.fulfilled.match(result);
  };

  const removeTodo = async (id: string) => {
    const result = await dispatch(deleteTodo(id));
    if (deleteTodo.fulfilled.match(result)) {
      await dispatch(fetchTodos());
      return true;
    } else {
      console.error('Failed to delete todo:', result);
      return false;
    }
  };

  const modifyTodo = async (tod: ToDo) => {
    const result = await dispatch(updateTodo(tod));
    return updateTodo.fulfilled.match(result);
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return {
    todo,
    todos,
    loading,
    error,
    loadById,
    loadTodosifNeeded,
    addNewTodo,
    removeTodo,
    modifyTodo,
  };
};
