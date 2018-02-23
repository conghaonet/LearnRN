/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  // Platform, StyleSheet, Text, View, Dimensions, PixelRatio
  AppRegistry, StyleSheet, Text, View, Dimensions, TextInput, Alert, DeviceEventEmitter
} from 'react-native';

// const {height, width} = Dimensions.get('window')
// const pixelRatio = PixelRatio.get()

let widthOfMargin = Dimensions.get('window').width * 0.05;

export default class LoginLeaf extends Component {
  static navigationOptions = {
    title: '登录'
  };
  constructor(props) {
    super(props);
    this.state = {
      inputedNum: '',
      inputedPW: ''
    };
    this.updatePW = this.updatePW.bind(this);
    this.jumpToWaiting = this.jumpToWaiting.bind(this);
    this.showWaitingModalBeforeJump = this.showWaitingModalBeforeJump.bind(this);
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
    // console.log('this.props.screenProps.prop1 = '+this.props.screenProps.prop1);
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
  showWaitingModalBeforeJump() { //当用户按下确定时，启动一个定时器，并显示自定义Modal
    this.props.screenProps.setWaitingModal( true, '请等待...' );
    this.aTimer = window.setTimeout( this.jumpToWaiting, 3000);
  }
  userPressConfirm() {
    Alert.alert(
      '提示',
      '确定使用'+this.state.inputedNum+'号码登录码？',
      [
        {text: '取消', onPress: (() => {}), style: 'cancel'},
        {text: '确定', onPress: this.showWaitingModalBeforeJump}
      ],
      // {cancelable: false} //点击返回键、空白区域不消失
    );
  }
  jumpToWaiting() {
    // this.props.onLoginPressed(this.state.inputedNum, this.state.inputedPW);

    this.props.screenProps.setWaitingModal( false, '' );
    this.props.navigation.navigate( 'Wait', //导航跳转命令
      { //传递属性
        phoneNumber:this.state.inputedNum,
        userPW:this.state.inputedPW
      }
    );
  }

  userPressAddressBook() {
    // DeviceEventEmitter.addListener('AndroidToRNMessage', this.handleAndroidMessage.bind(this));
    console.log('点击了通讯录按钮');
    var {NativeModules} = require('react-native');
    let example = NativeModules.ExampleInterface;
    // 回调方式
    // example.HandleMessage('testMessage', (result) => {
    //   this.setState({inputedNum: result});
    // });

    console.log('MY_NAME is: ' + example.MY_NAME);

    example.HandleMessage('testMessage from RN').then(
      (result) => {
        console.log('Promise message: ' + result);
        let aObj = JSON.parse(result);
        this.setState({inputedNum: aObj.phoneNumber});
        return
      }
    ).catch(
      (error) => {
        console.log('Promise error: ' + error);
        console.log('Promise error: ' + error.message);
        console.log('Promise error: ' + error.code);
      }
    );

  //   example.HandleMessage('testMessage from RN').then(
  //     (result) => {
  //         // 处理成功的事件
  //         console.log('Promise message: ' + result);
  //         let aObj = JSON.parse(result);
  //         this.setState({inputedNum: aObj.phoneNumber});
  //     }
  // ).catch(
  //     (error)=>{
  //         // 处理失败的事件
  //         console.log('Promise error: ' + error);
  //       console.log('Promise error: ' + error.message);
  //       console.log('Promise error: ' + error.code);
  // }
  // );

    console.log('=====userPressAddressBook 结束=====');

  }
  handleAndroidMessage(aMessage) {
    console.log('handleAndroidMessage: ' + aMessage);
    let aObj = JSON.parse(aMessage);
    this.setState({inputedNum: aObj.phoneNumber});
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  textInputStyle: {
    margin: widthOfMargin,
    fontSize: 12,
    backgroundColor: 'gray'
  },
  textPromptStyle: {
    margin: widthOfMargin,
    textAlign: 'center',
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
