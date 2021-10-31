import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions'
import { deleteDeckData } from '../util/api'
import { CommonActions } from '@react-navigation/native'
import { clearLocalNotification, setLocalNotification } from '../util/helpers'
import { white, teal, red } from '../util/colors'

class DeckView extends Component {
	toAddCard = (id) => {
		this.props.navigation.navigate('AddCard', { deckId: id })
	}
	toStartQuiz = (id) => {
		this.props.navigation.navigate('Quiz', { deckId: id })
		clearLocalNotification().then(setLocalNotification)
	}
	toDeleteDeck = () => {
		const { id, decks } = this.props
		const filtered = Object.keys(decks)
			.filter((key) => id !== key)
			.reduce((obj, key) => {
				return {
					...obj,
					[key]: decks[key],
				}
			}, {})
		this.props.dispatch(deleteDeck(filtered))
		this.toHome()
		deleteDeckData(id)
	}
	toHome = () => {
		this.props.navigation.dispatch(
			CommonActions.goBack({
				key: 'Home',
			})
		)
	}
	render() {
		const { id, title, cards } = this.props

		return (
			<View style={styles.container}>
				<Text style={styles.textTitle}>{title}</Text>
				<Text style={styles.text}>{cards} cards</Text>
				<TouchableOpacity style={styles.btn} onPress={() => this.toAddCard(id)}>
					<Text style={styles.btnText}>Add Card</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => this.toStartQuiz(id)}
				>
					<Text style={styles.btnText}>Start Quiz</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.btnDelete}
					onPress={() => this.toDeleteDeck()}
				>
					<Text style={styles.btnTextDelete}>Delete Deck</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get('window').height,
		display: 'flex',
		alignItems: 'center',
		padding: 20,
		backgroundColor: white,
	},
	input: {
		fontSize: 16,
		height: 40,
		borderColor: teal,
		borderWidth: 1,
		marginTop: 20,
		marginBottom: 20,
	},
	textTitle: {
		fontSize: 36,
	},
	text: {
		fontSize: 24,
		marginBottom: 30,
	},
	btnText: {
		fontSize: 20,
		color: white,
		alignSelf: 'center',
	},
	btnTextDelete: {
		fontSize: 20,
		color: red,
		alignSelf: 'center',
	},
	btn: {
		width: Dimensions.get('window').width - 50,
		backgroundColor: teal,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 3,
		margin: 10,
	},
	btnDelete: {
		width: Dimensions.get('window').width - 50,
		backgroundColor: white,
		borderColor: red,
		borderWidth: 1,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 3,
		margin: 10,
	},
})

function mapStateToProps(decks, { route }) {
	const { id } = route.params
	return {
		id,
		title: decks[id] ? decks[id].title : '',
		cards: decks[id] ? Object.keys(decks[id].cards).length : 0,
		decks,
	}
}

export default connect(mapStateToProps)(DeckView)
