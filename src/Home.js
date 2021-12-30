/* eslint-disable */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JSON: [],
    };
  }

  componentDidMount() {
    fetch(
      'https://gist.githubusercontent.com/erdem/8c7d26765831d0f9a8c62f02782ae00d/raw/248037cd701af0a4957cce340dabb0fd04e38f4c/countries.json',
    )
      .then(response => response.json())
      .then(json => {
        this.setState({JSON: json});
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <FlatList
        data={this.state.JSON}
        renderItem={({index}) => {
          const country = this.state.JSON[index];
          return (
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate('Detail', {...country})
              }
              style={styles.touchable}
              underlayColor="#EEEEEE"
              activeOpacity={0.6}>
              <View>
                <Text style={styles.textCountryName}>
                  {country.name} ({country.country_code})
                </Text>
                {country.capital && (
                  <Text style={styles.text}>Capital : {country.capital}</Text>
                )}
              </View>
            </TouchableHighlight>
          );
        }}
      />
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  touchable: {
    borderBottomWidth: 0.2,
    borderTopWidth: 0.4,
    padding: 10,
    backgroundColor: 'white',
  },
  textCountryName: {
    textAlign: 'left',
    color: 'blue',
    fontWeight: '700',
    fontSize: 13,
  },
  text: {
    textAlign: 'left',
    color: 'black',
    fontSize: 10,
  },
});
