import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CustomGrid from '../components/CustomGrid';
import {useTodos} from '../hook/useTodos';
import {useAppNavigation} from '../hook/useNavigation';

const HomeScreen = () => {
  const {todos, loading, error} = useTodos();
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#6200ee" />}
      {error && <Text style={styles.error}>Error: {error}</Text>}

      <View style={styles.gridContainer}>
        <CustomGrid todos={todos} />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('FormCreate')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  emoji: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 3,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  gridContainer: {
    width: '100%',
    flex: 1,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 30,
  },
});
