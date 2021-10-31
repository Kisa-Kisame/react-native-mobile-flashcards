import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import { white, teal, red, black } from '../util/colors'

class Quiz extends Component {
	state = {
		cardNo: 0,
		correct: 0,
		showAnswer: false,
	}
	handleShowAnswer = () => {
		this.setState(() => ({
			showAnswer: !this.state.showAnswer,
		}))
	}
	handleCorrectAnswer = () => {
		this.setState(() => ({
			cardNo: this.state.cardNo + 1,
			correct: this.state.correct + 1,
			showAnswer: false,
		}))
	}
	handleWrongAnswer = () => {
		this.setState(() => ({
			cardNo: this.state.cardNo + 1,
			showAnswer: false,
		}))
	}
	restartQuiz = () => {
		this.setState(() => ({
			cardNo: 0,
			correct: 0,
			showAnswer: false,
		}))
	}
	toDeck = () => {
		this.props.navigation.dispatch(CommonActions.goBack())
	}
	render() {
		const { cardIds, cards } = this.props
		var total = Object.keys(cards).length
		var { cardNo, showAnswer, correct } = this.state

		return (
			<View style={styles.container}>
				{total === 0 ? (
					<Text style={styles.textBlack}>
						Sorry you cannot take a quiz because there are no cards in the deck
					</Text>
				) : cardNo === total ? (
					<View>
						<Text
							style={{
								color: black,
								fontSize: 20,
								alignSelf: 'center',
								marginBottom: 30,
							}}
						>
							Correct answers: {correct} out of {total}
						</Text>

						<TouchableOpacity
							style={styles.btnRestart}
							onPress={this.restartQuiz}
						>
							<Text style={styles.btnTextCorrect}>Restart Quiz</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.btn} onPress={() => this.toDeck()}>
							<Text style={styles.btnText}>Back to Deck</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View>
						<View style={styles.questionContainer}>
							<Text style={styles.textTitle}>
								{!showAnswer ? 'Question' : 'Answer'}
							</Text>
							<Text style={styles.text}>
								{!showAnswer
									? cards[cardIds[cardNo]].question
									: cards[cardIds[cardNo]].answer}
							</Text>
						</View>
						<Text style={styles.textNo}>
							{cardNo + 1} out of {total}
						</Text>
						<TouchableOpacity
							style={styles.btn}
							onPress={this.handleShowAnswer}
						>
							<Text style={styles.btnText}>
								Show {showAnswer ? 'Question' : 'Answer'}
							</Text>
						</TouchableOpacity>
						<View style={styles.btnContainer}>
							<TouchableOpacity
								style={styles.btnCorrect}
								onPress={this.handleCorrectAnswer}
							>
								<Text style={styles.btnTextCorrect}>Correct</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.btnWrong}
								onPress={this.handleWrongAnswer}
							>
								<Text style={styles.btnTextWrong}>Wrong</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
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
	questionContainer: {
		height: Dimensions.get('window').height * 0.4,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: teal,
	},
	btnContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
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
		fontSize: 16,
		alignSelf: 'center',
		color: white,
	},
	textNo: {
		fontSize: 16,
		alignSelf: 'center',
		color: black,
		marginBottom: 20,
	},
	text: {
		fontSize: 24,
		marginBottom: 30,
		alignSelf: 'center',
		color: white,
	},
	textBlack: {
		fontSize: 24,
		marginBottom: 30,
		alignSelf: 'center',
		color: black,
	},
	btnText: {
		fontSize: 20,
		color: teal,
		alignSelf: 'center',
	},
	btnTextWrong: {
		fontSize: 20,
		color: red,
		alignSelf: 'center',
	},
	btnTextCorrect: {
		fontSize: 20,
		color: white,
		alignSelf: 'center',
	},
	btn: {
		width: Dimensions.get('window').width - 50,
		backgroundColor: white,
		borderColor: teal,
		borderWidth: 1,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 3,
		margin: 10,
	},
	btnRestart: {
		width: Dimensions.get('window').width - 50,
		backgroundColor: teal,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 3,
		margin: 10,
	},
	btnWrong: {
		backgroundColor: white,
		borderColor: red,
		borderWidth: 1,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 3,
	},
	btnCorrect: {
		backgroundColor: teal,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 3,
	},
})

function mapStateToProps(decks, { route }) {
	const { deckId } = route.params
	return {
		cardIds: Object.keys(decks[deckId].cards),
		cards: decks[deckId].cards,
	}
}

export default connect(mapStateToProps)(Quiz)
