import React, {useState} from 'react';
import {
  Alert,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ToDo} from '../models/ToDo';
import {useTodos} from '../hook/useTodos';
import CustomCard from './CustomCard';
import CustomModal from './CustomModal';

type CustomGridProps = {
  todos: ToDo[];
};

const {width: screenWidth} = Dimensions.get('window');
const NUM_COLUMNS = 2;
const SPACING = 10;
const CARD_WIDTH = (screenWidth - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
const CustomGrid: React.FC<CustomGridProps> = ({todos}) => {
  const [selectedToDo, setSelectedId] = useState<ToDo | null>(null);
  const {removeTodo} = useTodos();

  const handleDelete = async () => {
    if (selectedToDo?._id) {
      const success = await removeTodo(selectedToDo._id);
      if (success) {
        setSelectedId(null);
      } else {
        Alert.alert('Error', 'Could not delete the task');
      }
    }
  };

  const openToDo = (todo: ToDo) => {
    setSelectedId(todo);
  };

  const closeToDo = () => {
    setSelectedId(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item, index) => (item._id ? item._id : index.toString())}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => openToDo(item)}
            style={styles.cardWrapper}>
            <CustomCard
              title={item.title}
              description={item.description}
              createdAt={item.createdAt ?? ''}
              completed={item.completed ? 'true' : 'false'}
              style={{width: CARD_WIDTH}}
            />
          </TouchableOpacity>
        )}
      />

      {selectedToDo && (
        <CustomModal
          visible={!!selectedToDo}
          onClose={closeToDo}
          ToDoId={selectedToDo._id}
          onDelete={() => handleDelete()}>
          <View style={styles.selectedCardContainer}>
            <CustomCard
              title={selectedToDo.title}
              description={selectedToDo.description}
              createdAt={selectedToDo.createdAt ?? ''}
              completed={selectedToDo.completed ? 'true' : 'false'}
              style={styles.selectedCard}
            />
          </View>
        </CustomModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  columnWrapper: {
    paddingLeft: SPACING,
  },
  listContent: {
    paddingVertical: SPACING,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: SPACING,
    marginRight: SPACING,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  selectedCardContainer: {
    height: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    elevation: 5,
  },
  selectedCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D0E8F2',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#6200ee',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  closeIcon: {
    color: 'white',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
});

export default CustomGrid;
