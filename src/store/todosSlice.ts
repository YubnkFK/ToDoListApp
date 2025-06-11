import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ToDo} from '../models/ToDo';
const BASE_URL = 'http://10.0.2.2:3000';

type TodosState = {
  todo: ToDo | null;
  todos: ToDo[];
  loading: boolean;
  error?: string | null;
};

const initialState: TodosState = {
  todo: null,
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<ToDo[]>(
  'todos/fetchTodos',
  async () => {
    const response = await fetch(`${BASE_URL}/todo`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return data.todos;
  },
);

export const fetchTodoById = createAsyncThunk<ToDo, string>(
  'todos/fetchTodoById',
  async (todoId, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/todo/${todoId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch todo');
      }

      const data = await response.json();
      return data as ToDo;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addTodo = createAsyncThunk<ToDo, Partial<ToDo>>(
  'todos/addTodo',
  async newTodo => {
    const response = await fetch(`${BASE_URL}/todo/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    const data = await response.json();
    return data.todo;
  },
);

export const updateTodo = createAsyncThunk<ToDo, Partial<ToDo>>(
  'todos/updateTodo',
  async updatedTodo => {
    const response = await fetch(
      `${BASE_URL}/todo/update?todoId=${updatedTodo._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      },
    );
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    const data = await response.json();
    return data.updatedTodo as ToDo;
  },
);

export const deleteTodo = createAsyncThunk<string, string>(
  'todos/deleteTodo',
  async (todoId, {rejectWithValue}) => {
    try {
      const response = await fetch(`${BASE_URL}/todo/delete?todoId=${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to delete todo');
      }

      return todoId;
    } catch (error) {
      return rejectWithValue('Network error while deleting todo');
    }
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ToDo[]>) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addTodo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<ToDo>) => {
        state.todos.push(action.payload);
        state.loading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add todo';
      })
      .addCase(updateTodo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<ToDo>) => {
        const index = state.todos.findIndex(
          todo => todo._id === action.payload._id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update todo';
      })
      .addCase(deleteTodo.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete todo';
      })
      .addCase(fetchTodoById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTodoById.fulfilled,
        (state, action: PayloadAction<ToDo>) => {
          const index = state.todos.findIndex(
            todo => todo._id === action.payload._id,
          );
          if (index !== -1) {
            state.todos[index] = action.payload;
          } else {
            state.todos.push(action.payload);
          }
          state.loading = false;
        },
      )
      .addCase(fetchTodoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todo by ID';
      });
  },
});

export default todosSlice.reducer;
