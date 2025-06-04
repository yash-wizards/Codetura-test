import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ActionSheetRef } from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../hooks/useTheme';
import TaskItem from '../components/TaskItem';
import AddTaskActionSheet from '../components/AddTaskActionSheet';
import EmptyState from '../components/EmptyState';
import { Task } from '../models/Task';

const HomeScreenContent: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const {
    tasks,
    loading,
    error,
    refreshTasks,
    createTask,
    deleteTask,
    toggleTaskCompletion
  } = useTasks();
  
  const insets = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const styles = createStyles(theme, insets);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshTasks();
    setRefreshing(false);
  };

  const openAddTaskSheet = () => {
    actionSheetRef.current?.show();
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      theme={theme}
      onToggleComplete={toggleTaskCompletion}
      onDelete={deleteTask}
    />
  );

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.isCompleted).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const stats = getTaskStats();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
        translucent={true}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Icon name="assignment" size={moderateScale(32)} color={theme.colors.primary} />
            <Text style={styles.headerTitle}>Todo List</Text>
          </View>
          <TouchableOpacity
            style={styles.themeButton}
            onPress={toggleTheme}
            hitSlop={{ top: scale(10), bottom: scale(10), left: scale(10), right: scale(10) }}
          >
            <Icon 
              name={isDarkMode ? 'light-mode' : 'dark-mode'} 
              size={moderateScale(24)} 
              color={theme.colors.text} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Stats */}
        {tasks.length > 0 && (
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="list" size={moderateScale(20)} color={theme.colors.text} />
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="check-circle" size={moderateScale(20)} color={theme.colors.success} />
              <Text style={[styles.statNumber, { color: theme.colors.success }]}>
                {stats.completed}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="pending" size={moderateScale(20)} color={theme.colors.primary} />
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {stats.pending}
              </Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {loading && tasks.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading tasks...</Text>
          </View>
        ) : tasks.length === 0 ? (
          <EmptyState theme={theme} />
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[theme.colors.primary]}
                tintColor={theme.colors.primary}
              />
            }
            contentContainerStyle={styles.listContent}
            ListFooterComponent={<View style={styles.listFooter} />}
          />
        )}
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Icon name="error" size={moderateScale(16)} color="#ffffff" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={openAddTaskSheet}
        activeOpacity={0.8}
      >
        <Icon name="add" size={moderateScale(28)} color="#ffffff" />
      </TouchableOpacity>

      {/* Add Task ActionSheet */}
      <AddTaskActionSheet
        ref={actionSheetRef}
        theme={theme}
        onAddTask={createTask}
      />
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
          <HomeScreenContent />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

const createStyles = (theme: any, insets: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: scale(20),
    paddingTop: insets.top + verticalScale(20),
    paddingBottom: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  headerTitle: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  themeButton: {
    padding: scale(8),
    borderRadius: scale(8),
    backgroundColor: theme.colors.surface,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: verticalScale(16),
    backgroundColor: theme.colors.surface,
    borderRadius: scale(12),
  },
  statItem: {
    alignItems: 'center',
    gap: verticalScale(4),
  },
  statNumber: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: theme.colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: verticalScale(12),
    fontSize: moderateScale(16),
    color: theme.colors.textSecondary,
  },
  listContent: {
    paddingTop: verticalScale(16),
  },
  listFooter: {
    height: verticalScale(100) + insets.bottom,
  },
  errorContainer: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    marginHorizontal: scale(16),
    marginBottom: verticalScale(16),
    borderRadius: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  errorText: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: verticalScale(24) + insets.bottom,
    right: scale(24),
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.3,
    shadowRadius: scale(8),
    elevation: 8,
  },
});

export default HomeScreen;