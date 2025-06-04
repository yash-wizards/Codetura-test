import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task } from '../models/Task';
import { Theme } from '../models/Theme';
import { formatDateTime } from '../utils/DateUtils';

interface TaskItemProps {
  task: Task;
  theme: Theme;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  theme,
  onToggleComplete,
  onDelete
}) => {
  const styles = createStyles(theme);

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => onDelete(task.id)
        }
      ]
    );
  };

  return (
    <View style={[styles.container, task.isCompleted && styles.completedContainer]}>
      <Pressable
        style={styles.content}
        onPress={() => onToggleComplete(task.id)}
        android_ripple={{ color: theme.colors.primary + '20' }}
      >
        <View style={styles.checkboxContainer}>
          <View style={[
            styles.checkbox,
            task.isCompleted && styles.checkedCheckbox
          ]}>
            {task.isCompleted && (
              <Icon name="check" size={moderateScale(16)} color="#ffffff" />
            )}
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[
            styles.title,
            task.isCompleted && styles.completedText
          ]}>
            {task.title}
          </Text>
          
          {task.description ? (
            <Text style={[
              styles.description,
              task.isCompleted && styles.completedText
            ]}>
              {task.description}
            </Text>
          ) : null}
          
          <View style={styles.dateContainer}>
            <Icon name="schedule" size={moderateScale(12)} color={theme.colors.textSecondary} />
            <Text style={styles.createdDate}>
              Created on: {formatDateTime(task.createdAt)}
            </Text>
          </View>
        </View>
      </Pressable>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        hitSlop={{ top: scale(10), bottom: scale(10), left: scale(10), right: scale(10) }}
      >
        <Icon name="delete" size={moderateScale(20)} color={theme.colors.error} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: scale(12),
    marginVertical: verticalScale(6),
    marginHorizontal: scale(16),
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  completedContainer: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: scale(16),
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: scale(12),
    marginTop: verticalScale(2),
  },
  checkbox: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  checkedCheckbox: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: moderateScale(14),
    color: theme.colors.textSecondary,
    marginBottom: verticalScale(8),
    lineHeight: verticalScale(20),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  createdDate: {
    fontSize: moderateScale(12),
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskItem; 