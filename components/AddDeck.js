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
import { addDeck } from '../actions'
import { formatDeck, createDeckData } from '../util/api'
import { CommonActions } from '@react-navigation/native'
import { white, teal } from '../util/colors'

class AddDeck extends Component {
	state = {
		title: '',
	}
	setTitle = (text) => {
		this.setState(() => ({
			title: text,
		}))
	}
	submit = () => {
		const { title } = this.state
		const { dispatch } = this.props
		const deck = formatDeck({ title })

		dispatch(addDeck(deck))
		this.setState(() => ({
			title: '',
		}))
		this.textInput.clear()
		this.props.navigation.navigate('DeckView', { id: deck.id })
		createDeckData(deck)
	}
	toHome = () => {
		this.props.navigation.dispatch(
			CommonActions.goBack({
				key: 'Add Deck',
			})
		)
	}
	render() {
		const { title } = this.state

		return (
			<View style={styles.container}>
				<Text style={styles.text}>What is the title of your new deck?</Text>
				<TextInput
					style={styles.input}
					placeholder='Deck name'
					onChangeText={(title) => this.setTitle(title)}
					defaultValue={title}
					ref={(input) => {
						this.textInput = input
					}}
				/>
				<TouchableOpacity style={styles.btn} onPress={this.submit}>
					<Text style={styles.btnText}>Create Deck</Text>
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
		marginTop: 20,
		marginBottom: 20,
	},
	text: {
		fontSize: 24,
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
	},
})

function mapStateToProps(decks) {
	return {
		decks,
	}
}

export default connect(mapStateToProps)(AddDeck)
