
import React, { Component } from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import PropTypes from 'prop-types';

export default class WaitingLeaf extends Component {
    constructor(props) {
        super(props);
    }
    onLoginPressed(aNumber, aPW) {
        this.setState({
            currentScene: 'Waiting',
            phoneNumber: aNumber,
            userPW: aPW
        });
    }
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.textPromptStyle}>
                登录手机号：{this.props.phoneNumber}
            </Text>
            <Text style={styles.textPromptStyle}>
                登录密码：{this.props.userPW}
            </Text>
            <Text style={styles.bigTextPrompt} onPress={() =>this.onGoback()}>
                返回
            </Text>
            
        </View>
        );
    }
    onGoback() {
        this.props.onGobackPressed();
    }
}

WaitingLeaf.propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    userPW: PropTypes.string.isRequired,
    onGobackPressed: PropTypes.func
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textPromptStyle: {
      fontSize: 20
    },
    bigTextPrompt: {
      width: 300,
      backgroundColor: 'gray',
      color: 'white',
      textAlign: 'center',
      fontSize: 60
    }
  });
  