import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export default class App extends React.Component {
  state = {
    data: null,
    ready: false,
  };

  componentWillMount() {
    var request = new XMLHttpRequest();
    request.open(
      'GET',
      'https://api.coindesk.com/v1/bpi/historical/close.json',
    );
    request.send();
    request.onload = response => {
      this.setState(state => {
        state.data = JSON.parse(response.currentTarget._response);
        state.ready = true;
        return state;
      });
    };
  }

  lineChart = () => {
    const data = {
      labels: Object.keys(this.state.data.bpi),
      datasets: [
        {
          data: Object.values(this.state.data.bpi),
        },
      ],
    };
    const chartConfig = {
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      color:() => {return 'green'},
      style: {
        borderRadius: 16,
      },
    };
    return (
      <LineChart
        data={data}
        width={'100%'}
        height={220}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Basic Bitcoin</Text>
        {this.state.ready && this.lineChart()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    color: '#6272a4',
    fontSize: 46,
    paddingTop: 20,
  },
});
