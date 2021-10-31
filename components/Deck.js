import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../util/colors'

class Deck extends Component {
	render() {
		const { title, cards } = this.props

		return (
			<View style={styles.container}>
				<Text style={styles.text}>{title}</Text>
				<Text style={styles.text}>{cards} cards</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: white,
	},
})

function mapStateToProps(decks, { id }) {
	return {
		title: decks[id].title,
		cards: Object.keys(decks[id].cards).length,
	}
}

export default connect(mapStateToProps)(Deck)
