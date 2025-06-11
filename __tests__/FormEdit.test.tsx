import React from 'react';
import {act, create} from 'react-test-renderer';
import FormEdit from '../src/screens/FormEdit';

const mockNavigate = jest.fn();
jest.mock('../src/hook/useNavigation', () => ({
  useAppNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {Id: '123'},
  }),
}));

const mockLoadById = jest.fn();
const mockModifyTodo = jest.fn();

jest.mock('../src/hook/useTodos', () => ({
  useTodos: () => ({
    loadById: mockLoadById,
    modifyTodo: mockModifyTodo,
    loading: false,
  }),
}));

import {Alert} from 'react-native';
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('FormEdit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and loads todo', async () => {
    const todo = {
      _id: '123',
      title: 'Test title',
      description: 'Test description',
      completed: false,
      createdAt: '2023-01-01',
    };
    mockLoadById.mockResolvedValueOnce(todo);

    let tree;
    await act(async () => {
      tree = create(<FormEdit />);
    });

    expect(tree).toBeTruthy();
    expect(mockLoadById).toHaveBeenCalledWith('123');
  });

  it('shows alert and navigates home if todo not found', async () => {
    mockLoadById.mockResolvedValueOnce(null);

    await act(async () => {
      create(<FormEdit />);
    });

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'To-do not found');
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  it('handles modifyTodo success', async () => {
    const todo = {
      _id: '123',
      title: 'Title',
      description: 'Desc',
      completed: false,
      createdAt: '2023-01-01',
    };
    mockLoadById.mockResolvedValueOnce(todo);
    mockModifyTodo.mockResolvedValueOnce(true);

    let root;
    await act(async () => {
      root = create(<FormEdit />);
    });

    const button = root.root.findByProps({title: 'Add To-Do'});
    await act(async () => {
      button.props.onPress();
    });

    expect(mockModifyTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Title',
        description: 'Desc',
      }),
    );
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'To-do modified!');
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  it('handles modifyTodo failure', async () => {
    const todo = {
      _id: '123',
      title: 'Title',
      description: 'Desc',
      completed: false,
      createdAt: '2023-01-01',
    };
    mockLoadById.mockResolvedValueOnce(todo);
    mockModifyTodo.mockRejectedValueOnce(new Error('fail'));

    let root;
    await act(async () => {
      root = create(<FormEdit />);
    });

    const button = root.root.findByProps({title: 'Add To-Do'});
    await act(async () => {
      button.props.onPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Failed to modify to-do.',
    );
  });

  it('shows alert when form fields are empty', async () => {
    const todo = {
      _id: '123',
      title: '',
      description: '',
      completed: false,
      createdAt: '2023-01-01',
    };
    mockLoadById.mockResolvedValueOnce(todo);

    let root;
    await act(async () => {
      root = create(<FormEdit />);
    });

    const button = root.root.findByProps({title: 'Add To-Do'});
    await act(async () => {
      button.props.onPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please fill in all fields.',
    );
  });
});
