import React, {useState} from 'react';
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
} from 'react-native';
import {useTodos} from '../hook/useTodos';
import {useAppNavigation} from '../hook/useNavigation';
import recordatorio from '../assets/recordatorio.png';
import back from '../assets/back.png';

const FormCreate: React.FC = () => {
  const {addNewTodo, loading} = useTodos();
  const navigation = useAppNavigation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const handleChange = (field: 'title' | 'description', value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await addNewTodo(formData);
      Alert.alert('Success', 'To-do created!');
      setFormData({title: '', description: '', completed: false});
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to create to-do.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image source={recordatorio} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>Create New To-Do</Text>

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

export default FormCreate;
