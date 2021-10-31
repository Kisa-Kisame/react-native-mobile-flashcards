import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { formatCard } from '../util/api'
import { CommonActions } from '@react-navigation/native'
import { addCardData } from '../util/api'
import { white, teal } from '../util/colors'

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}
	setQuestion = (text) => {
		this.setState(() => ({
			question: text,
		}))
	}
	setAnswer = (text) => {
		this.setState(() => ({
			answer: text,
		}))
	}
	submit = (deckId) => {
		const { question, answer } = this.state
		const { dispatch } = this.props
		const card = formatCard({ question, answer })

		dispatch(addCard(deckId, card))
		this.setState(() => ({
			question: '',
			answer: '',
		}))
		this.goBack()
		addCardData(deckId, card)
	}
	goBack = () => {
		this.props.navigation.dispatch(
			CommonActions.goBack({
				key: 'DeckView',
			})
		)
	}
	render() {
		const { question, answer } = this.state
		const { deckId } = this.props
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder='Question'
					onChangeText={(question) => this.setQuestion(question)}
					defaultValue={question}
				/>
				<TextInput
					style={styles.input}
					placeholder='Answer'
					onChangeText={(answer) => this.setAnswer(answer)}
					defaultValue={answer}
				/>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => this.submit(deckId)}
				>
					<Text style={styles.btnText}>SUBMIT</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get('window').height,
		display: 'flex',
		padding: 20,
		backgroundColor: white,
	},
	input: {
		fontSize: 16,
		height: 40,
		borderColor: teal,
		borderWidth: 1,
		marginBottom: 20,
	},
	btnText: {
		fontSize: 20,
		color: white,
		alignSelf: 'center',
	},
	btn: {
		backgroundColor: teal,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 3,
		marginTop: 20,
	},
})

function mapStateToProps(decks, { route }) {
	const { deckId } = route.params
	return {
		deckId,
		decks,
	}
}

export default connect(mapStateToProps)(AddCard)
