import { StyleSheet, Text, Dimensions, View } from 'react-native'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TodoScreen from '../components/SupervisorComponents/TodoScreen';
import InProgressScreen from '../components/SupervisorComponents/InProgressScreen';
import CompletedScreen from '../components/SupervisorComponents/CompletedScreen';
import Colors from '../styles/Colors';

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('window');

const TaskPriorityNavigator = ({ tasks }) => {
  // Custom tab component to display tab labels with badge
  const CustomTabLabel = ({ label, count }) => (
    <View style={styles.tabLabelContainer}>
      <Text style={styles.tabLabelText}>{label}</Text>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.statusContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused, color }) => {
            let count = 0;
            if (route.name === 'Todo') {
              count = tasks.filter(item => item.status === 'Todo').length;
            } else if (route.name === 'Progress') {
              count = tasks.filter(item => item.status === 'Progress').length;
            } else if (route.name === 'Completed') {
              count = tasks.filter(item => item.status === 'Completed').length;
            }

            return <CustomTabLabel label={route.name} count={count} />;
          },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.primary
          },
          tabBarStyle: {
            backgroundColor: 'transparent',
            elevation: 0
          }
        })}
      >
        <Tab.Screen name="Todo" children={() => <TodoScreen tasks={tasks} />} />
        <Tab.Screen name="Progress" children={() => <InProgressScreen tasks={tasks} />} />
        <Tab.Screen name="Completed" children={() => <CompletedScreen tasks={tasks} />} />
      </Tab.Navigator>
    </View>
  )
}

export default TaskPriorityNavigator

const styles = StyleSheet.create({
  statusContainer: {
    backgroundColor: 'transparent',
    flex: 1
  },
  tabLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tabLabelText: {
    marginRight: 5,
    color: Colors.text
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6
  },
  badgeText: {
    color: 'white',
    fontSize: 12
  }
});
