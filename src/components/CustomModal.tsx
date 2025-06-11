import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native';
import {useAppNavigation} from '../hook/useNavigation';
import edit from '../assets/edit.png';
import delet from '../assets/delet.png';
import close from '../assets/close.png';

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  ToDoId?: string | null;
};

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
  onDelete,
  style,
  ToDoId,
}) => {
  const navigation = useAppNavigation();
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContent, style]}>
          <View style={styles.topRightButtons}>
            <TouchableOpacity
              style={styles.iconButtonEdit}
              onPress={() => {
                if (ToDoId) {
                  navigation.navigate('FormEdit', {
                    Id: ToDoId as string,
                  });
                }
              }}>
              <Image source={edit} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButtonDelete}
              onPress={onDelete}>
              <Image source={delet} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtonClose} onPress={onClose}>
              <Image source={close} style={styles.iconImage} />
            </TouchableOpacity>
          </View>

          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  topRightButtons: {
    position: 'absolute',
    top: -10,
    right: -10,
    flexDirection: 'row',
    gap: 5,
    zIndex: 10,
  },
  iconButtonClose: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#B0B0B0',
  },
  iconButtonEdit: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#7DC6E8',
  },
  iconButtonDelete: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#E57373',
  },
  iconImage: {
    width: 20,
    height: 20,
  },
});

export default CustomModal;
