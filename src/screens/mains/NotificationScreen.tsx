import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '~/components/sections'
import { SafeView } from '~/components/commons'
import Icon from 'react-native-vector-icons/FontAwesome'; 

const NotificationScreen = () => {
	const notifications = [
		{ id: 1, message: 'You have a new message from John Doe.' },
		{ id: 2, message: 'Your post has received 10 likes.' },
		{ id: 3, message: 'Reminder: Your appointment is tomorrow at 3 PM.' },
	];
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<Icon name="bell" size={30} color="#333" />
				<Text style={styles.headerText}>Notifications</Text>
			</View>
			<View style={styles.notificationList}>
				{notifications.map((notification) => (
					<View key={notification.id} style={styles.notificationItem}>
						<Icon name="exclamation-circle" size={20} color="#FF6347" />
						<Text style={styles.notificationText}>{notification.message}</Text>
					</View>
				))}
			</View>
		</ScrollView>
	)
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  notificationList: {
    width: '100%',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
});