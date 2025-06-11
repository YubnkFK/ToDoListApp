import React from 'react';
import {View, Text, StyleSheet, ViewStyle, Image} from 'react-native';
import exclamation from '../assets/exclamation.png';

type CustomCardProps = {
  title: string;
  description: string;
  createdAt: string;
  completed: 'true' | 'false';
  style?: ViewStyle;
};

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  createdAt,
  completed,
  style,
}) => {
  const backgroundColor = completed === 'true' ? '#f8d7da' : '#d4edda';
  const formattedDate = new Date(createdAt).toLocaleDateString();
  return (
    <View style={[styles.card, {backgroundColor}, style]}>
      {completed === 'false' && (
        <View style={styles.warningIcon}>
          <Image
            source={exclamation}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </View>
      )}
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {description}
      </Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text
        style={[
          styles.status,
          completed === 'true' ? styles.completed : styles.active,
        ]}>
        {completed === 'true' ? 'Completed' : 'Pending'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 10,
    elevation: 3,
  },
  warningIcon: {
    position: 'absolute',
    top: -10,
    borderRadius: 12,
    padding: 2,
    zIndex: 10,
  },
  iconImage: {
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  active: {
    color: 'blue',
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'red',
  },
});

export default CustomCard;
