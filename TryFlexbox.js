
import React, { Component } from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';

export default class TryFlexbox extends Component {
    onLayout(event) {
        {
            let {width,x,y,height} = event.nativeEvent.layout;
            console.log('onLayout x = ' + x);
            console.log('onLayout y = ' + y);
            console.log('onLayout width = ' + width);
            console.log('onLayout height = ' + height);
        }
    }
    render() {
        return (
            <View style={styles.container} onLayout={this.onLayout}>
                <View style={styles.firstRow}>
                    <View style={styles.test1} />
                    <View style={styles.test2} />
                    <View style={styles.test3} />
                </View>
                <View style={styles.testPosition}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // flexDirection: 'row',
    },
    firstRow: {
        height: 80,
        top: 40,
        backgroundColor: 'black',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    test1: {
        width: 68,
        height: 24,
        margin: 1,
        backgroundColor: 'white'
      },
    test2: {
        width: 40,
        height: 24,
        margin: 1,
        backgroundColor: 'white'
    },
    test3: {
        width: 100,
        height: 24,
        margin: 1,
        backgroundColor: 'white'
    },
    testPosition: {
        backgroundColor: 'grey',
        width: 60,
        height: 60,
        position: 'absolute',
        top: 150,
        right: 50
    },
});
  