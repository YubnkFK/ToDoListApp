import React from 'react';
import {Alert} from 'react-native';
import {create, act} from 'react-test-renderer';
import FormCreate from '../src/screens/FormCreate';

jest.mock('../src/hook/useTodos', () => ({
  useTodos: () => ({
    addNewTodo: jest.fn(() => Promise.resolve()),
    loading: false,
  }),
}));

jest.mock('../src/hook/useNavigation', () => ({
  useAppNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('FormCreate', () => {
  it('renders correctly and submits form', async () => {
    let tree: any;

    await act(async () => {
      tree = create(<FormCreate />);
    });

    const inputs = tree.root.findAllByType('TextInput');
    expect(inputs.length).toBeGreaterThanOrEqual(2);

    const buttons = tree.root.findAllByProps({title: 'Add To-Do'});
    expect(buttons.length).toBe(1);
    const button = buttons[0];

    await act(async () => {
      inputs[0].props.onChangeText('Test Title');
      inputs[1].props.onChangeText('Test Description');
    });

    await act(async () => {
      await button.props.onPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'To-do created!');

    const inputsAfter = tree.root.findAllByType('TextInput');
    expect(inputsAfter[0].props.value).toBe('');
    expect(inputsAfter[1].props.value).toBe('');
  });

  it('shows error alert if fields are empty', async () => {
    let tree: any;

    await act(async () => {
      tree = create(<FormCreate />);
    });

    const buttons = tree.root.findAllByProps({title: 'Add To-Do'});
    expect(buttons.length).toBe(1);
    const button = buttons[0];

    await act(async () => {
      await button.props.onPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please fill in all fields.',
    );
  });
});
