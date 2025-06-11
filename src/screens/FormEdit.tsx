import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from '../navigation/AppNav';
import {useTodos} from '../hook/useTodos';
import {ToDo} from '../models/ToDo';
import {useAppNavigation} from '../hook/useNavigation';
import recordatorio from '../assets/recordatorio.png';
import back from '../assets/back.png';

const FormEdit: React.FC = () => {
  const {modifyTodo, loadById, loading} = useTodos();
  const route = useRoute<RouteProp<RootStackParamList, 'FormEdit'>>();
  const {Id} = route.params;
  const navigation = useAppNavigation();
  const [formData, setFormData] = useState<ToDo>({
    _id: '',
    title: '',
    description: '',
    completed: false,
    createdAt: '',
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await loadById(Id);
        if (todo) {
          setFormData(todo);
        } else {
          Alert.alert('Error', 'To-do not found');
          navigation.navigate('Home');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load to-do.');
      }
    };

    fetchTodo();
  }, [Id]);

  const handleChange = (field: 'title' | 'description', value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const success = await modifyTodo(formData);
      if (success) {
        Alert.alert('Success', 'To-do modified!');
        navigation.navigate('Home');
      } else {
        throw new Error();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to modify to-do.');
    }
  };

  const handleToggleCompleted = () => {
    setFormData(prev => ({...prev, completed: !prev.completed}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image source={recordatorio} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>Modify To-Do</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={formData.title}
          onChangeText={value => handleChange('title', value)}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={formData.description}
          onChangeText={value => handleChange('description', value)}
          multiline
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Completed:</Text>
          <Switch
            value={formData.completed}
            onValueChange={handleToggleCompleted}
          />
        </View>

        <Button title="Add To-Do" onPress={handleSubmit} disabled={loading} />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200ee" />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Home')}>
        <Image source={back} style={styles.fabIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignContent: 'center',
  },
  formContainer: {
    marginTop: '30%',
    padding: 20,
    borderRadius: 8,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: 'red',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    objectFit: 'cover',
  },
  fabIcon: {
    width: 56,
    height: 56,
    tintColor: '#fff',
  },
});

export default FormEdit;
