import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../models/Theme';
import { CreateTaskRequest } from '../models/Task';

interface AddTaskActionSheetProps {
  theme: Theme;
  onAddTask: (request: CreateTaskRequest) => Promise<void>;
}

const { height: screenHeight } = Dimensions.get('window');

const AddTaskActionSheet = React.forwardRef<ActionSheetRef, AddTaskActionSheetProps>(
  ({ theme, onAddTask }, ref) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const styles = createStyles(theme);

    const handleSubmit = async () => {
      if (!title.trim()) {
        Alert.alert('Error', 'Please enter a task title');
        return;
      }

      try {
        setIsSubmitting(true);
        await onAddTask({
          title: title.trim(),
          description: description.trim()
        });

        // Reset form and close sheet
        setTitle('');
        setDescription('');
        if (ref && typeof ref !== 'function' && ref.current) {
          ref.current.hide();
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to create task');
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleClose = () => {
      setTitle('');
      setDescription('');
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.hide();
      }
    };

    return (
      <ActionSheet
        ref={ref}
        containerStyle={styles.container}
        // gestureEnabled={true}
        statusBarTranslucent
        drawUnderStatusBar={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Task</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              hitSlop={{ top: scale(10), bottom: scale(10), left: scale(10), right: scale(10) }}
            >
              <Icon name="close" size={moderateScale(24)} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Title *</Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter task title"
                  placeholderTextColor={theme.colors.textSecondary}
                  maxLength={100}
                  autoFocus={true}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter task description (optional)"
                  placeholderTextColor={theme.colors.textSecondary}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={500}
                  returnKeyType="done"
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleClose}
                  disabled={isSubmitting}
                >
                  <Icon name="cancel" size={moderateScale(20)} color={theme.colors.textSecondary} style={styles.buttonIcon} />
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleSubmit}
                  disabled={isSubmitting || !title.trim()}
                >
                  <Icon name="add" size={moderateScale(20)} color="#ffffff" style={styles.buttonIcon} />
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? 'Adding...' : 'Add Task'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ActionSheet>
    );
  }
);

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  content: {
    height: screenHeight * 0.85, // 85% of screen height
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: theme.colors.text,
  },
  closeButton: {
    padding: scale(4),
  },
  scrollContainer: {
    flex: 1,
  },
  form: {
    padding: scale(20),
    paddingBottom: verticalScale(40), // Extra padding for safe area
  },
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: verticalScale(8),
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: scale(12),
    padding: scale(16),
    fontSize: moderateScale(16),
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
  descriptionInput: {
    height: verticalScale(100),
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: scale(12),
  },
  button: {
    flex: 1,
    paddingVertical: verticalScale(16),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    marginRight: scale(8),
  },
  cancelButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cancelButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  submitButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#ffffff',
  },
});

AddTaskActionSheet.displayName = 'AddTaskActionSheet';

export default AddTaskActionSheet; 