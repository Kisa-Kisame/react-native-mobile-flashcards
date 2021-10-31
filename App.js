import 'react-native-gesture-handler'
import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Home from './components/Home'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './util/helpers'
import { white, teal, darker } from './util/colors'

const RouteConfigs = {
	Decks: {
		component: Home,
		name: 'Decks',
		options: {
			title: 'Decks',
		},
	},
	AddDeck: {
		component: AddDeck,
		name: 'Add Deck',
		options: {
			title: 'Add Deck',
		},
	},
}

const TabNavigatorConfig = {
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? teal : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : teal,
			shadowColor: darker,
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowRadius: 6,
			shadowOpacity: 1,
		},
	},
}

const Tab =
	Platform.OS === 'ios'
		? createBottomTabNavigator()
		: createMaterialTopTabNavigator()

function TabNavigator() {
	return (
		<Tab.Navigator {...TabNavigatorConfig}>
			<Tab.Screen {...RouteConfigs['Decks']} />
			<Tab.Screen {...RouteConfigs['AddDeck']} />
		</Tab.Navigator>
	)
}

const NavConfigs = {
	Home: {
		name: 'Home',
		component: TabNavigator,
		options: {
			headerShown: false,
		},
	},
	DeckView: {
		name: 'DeckView',
		component: DeckView,
		options: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: teal,
			},
			headerTitleAlign: 'center',
			title: 'Deck View',
		},
	},
	AddCard: {
		name: 'AddCard',
		component: AddCard,
		options: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: teal,
			},
			headerTitleAlign: 'center',
			title: 'Add Card',
		},
	},
	Quiz: {
		name: 'Quiz',
		component: Quiz,
		options: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: teal,
			},
			headerTitleAlign: 'center',
			title: 'Take Quiz',
		},
	},
}

const Stack = createStackNavigator()

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification()
	}
	render() {
		const store = createStore(reducer)
		return (
			<Provider store={store}>
				<NavigationContainer>
					<StatusBar />
					<Stack.Navigator>
						<Stack.Screen {...NavConfigs['Home']} />
						<Stack.Screen {...NavConfigs['DeckView']} />
						<Stack.Screen {...NavConfigs['AddCard']} />
						<Stack.Screen {...NavConfigs['Quiz']} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)
	}
}
