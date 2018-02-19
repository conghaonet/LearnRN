/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  // Platform, StyleSheet, Text, View, Dimensions, PixelRatio
  AppRegistry, StyleSheet, Text, View, Dimensions, TextInput, Alert
} from 'react-native';

// const {height, width} = Dimensions.get('window')
// const pixelRatio = PixelRatio.get()

let widthOfMargin = Dimensions.get('window').width * 0.05;

export default class LoginLeaf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputedNum: '',
      inputedPW: ''
    };
    this.updatePW = this.updatePW.bind(this)
    this.jumpToWaiting = this.jumpToWaiting.bind(this)
  }
  updateNum(inputedNum) {
    this.setState((state) => {
      for(var aName in state) {
        console.log(aName);
        console.log(state[aName]);
      }
      return {
        inputedNum,
        aBrandnewStateVariable: 'I am a new variable.'
      };
    }, this.changeNumDone);
  }
  changeNumDone() {
    console.log('React Native has changed inputed Num');
  }
  updatePW(inputedPW) {
    console.log('This is updatePW.');
    console.log(this);

    this.setState({inputedPW});
  }
render() {
    console.log('This is render.');
    console.log(this);
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInputStyle}
          placeholder={'请输入手机号'}
          onChangeText = {(newText) => this.updateNum(newText)}/>
        <Text style={styles.textPromptStyle}>
          您输入的手机号：{this.state.inputedNum}
        </Text>
        {/* 这是一段注释 */}
        <TextInput style={styles.textInputStyle}
          placeholder={'请输入密码'}
          secureTextEntry={true}
          onChangeText = {this.updatePW}/>
        <Text style={styles.textPromptStyle}>
          您输入的密码：{this.state.inputedPW}
        </Text>
        <Text style={styles.bigTextPrompt}
          onPress={() => this.userPressConfirm()}>
          确定
        </Text>
        <Text style={styles.bigTextPrompt}
          onPress={() => this.userPressAddressBook()}>
          通讯录
        </Text>
      </View>
    );
  }
  userPressConfirm() {
    Alert.alert(
      '提示',
      '确定使用'+this.state.inputedNum+'号码登录码？',
      [
        {text: '取消', onPress: (() => {}), style: 'cancel'},
        {text: '确定', onPress: this.jumpToWaiting}
      ],
      // {cancelable: false} //点击返回键、空白区域不消失
    );
  }
  jumpToWaiting() {
    this.props.onLoginPressed(this.state.inputedNum, this.state.inputedPW);
  }

  userPressAddressBook() {
    //TODO:     
    console.log('点击了通讯录按钮');
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  textInputStyle: {
    margin: widthOfMargin,
    fontSize: 20,
    height: 60,
    backgroundColor: 'gray'
  },
  textPromptStyle: {
    margin: widthOfMargin,
    fontSize: 20
  },
  bigTextPrompt: {
    margin: widthOfMargin,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  }
});
