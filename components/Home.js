import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { fetchDecksData } from '../util/api'
import { receiveDecks } from '../actions'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Deck from './Deck'
import { white, teal } from '../util/colors'

class Home extends Component {
	state = {
		ready: false,
		opacity: new Animated.Value(1),
	}
	componentDidMount() {
		const { dispatch } = this.props

		fetchDecksData()
			.then((decks) => dispatch(receiveDecks(decks)))
			.then(() => {
				this.setState(() => ({ ready: true }))
			})
	}
	render() {
		const { decks } = this.props
		const { ready } = this.state

		if (ready === false) {
			return <AppLoading />
		}
		return (
			<View style={styles.container}>
				{decks.length === 0 ? (
					<Text style={styles.text}>You have no decks</Text>
				) : (
					<Animated.View style={{ opacity: this.state.opacity }}>
						<FlatList
							data={decks}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										Animated.timing(this.state.opacity, {
											toValue: 0,
											duration: 500,
											useNativeDriver: false,
										}).start(({ finished }) => {
											finished &&
												Animated.timing(this.state.opacity, {
													toValue: 1,
													duration: 500,
													useNativeDriver: false,
												}).start(({ finished }) => {
													finished &&
														this.props.navigation.navigate('DeckView', {
															id: item.id,
														})
												})
										})
									}}
									style={styles.item}
								>
									<Deck id={item.id} />
								</TouchableOpacity>
							)}
							keyExtractor={(item) => item.id}
						/>
					</Animated.View>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get('window').height,

		display: 'flex',
		justifyContent: 'flex-start',
		padding: 20,
		backgroundColor: white,
	},
	item: {
		backgroundColor: teal,
		borderRadius: 5,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
	},
	text: {
		fontSize: 24,
		alignSelf: 'center',
	},
})

function mapStateToProps(decks) {
	return {
		decks: Object.values(decks),
	}
}

export default connect(mapStateToProps)(Home)
