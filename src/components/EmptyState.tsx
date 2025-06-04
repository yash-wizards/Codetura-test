import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../models/Theme';

interface EmptyStateProps {
  theme: Theme;
}

const EmptyState: React.FC<EmptyStateProps> = ({ theme }) => {
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="assignment" size={moderateScale(80)} color={theme.colors.textSecondary} />
      </View>
      <Text style={styles.title}>No tasks yet</Text>
      <Text style={styles.subtitle}>
        Tap the + button to add your first task
      </Text>
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(32),
  },
  iconContainer: {
    marginBottom: verticalScale(24),
    opacity: 0.7,
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: verticalScale(24),
  },
});

export default EmptyState; 