
import React, { Component } from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

export default class WaitingLeaf extends Component {
    // static navigationOptions = {
    //     title: '登录中...',
    // }
    static navigationOptions =({navigation}) =>({
        title: '登录中...'+navigation.state.params.phoneNumber,
    });
    
    constructor(props) {
        super(props);
        this.onGoback = this.onGoback.bind(this);
    }
    onLoginPressed(aNumber, aPW) {
        this.setState({
            currentScene: 'Waiting',
            phoneNumber: aNumber,
            userPW: aPW
        });
    }
    render() {
        //通过StackNavigator方式传递的参数
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
            <Text style={styles.textPromptStyle}>
                {/* 登录手机号：{this.props.phoneNumber} */}
                登录手机号：{params.phoneNumber}
            </Text>
            <Text style={styles.textPromptStyle}>
                {/* 登录密码：{this.props.userPW} */}
                登录密码：{params.userPW}
            </Text>
            <Text style={styles.bigTextPrompt} onPress={() =>this.onGoback()}>
                返回
            </Text>
            
        </View>
        );
    }
    onGoback() {
        // this.props.onGobackPressed();
        // this.props.navigation.goBack(); //弹出当前界面，返回上一个界面
        const resetAction = NavigationActions.reset({
            index: 5,
            actions: [
                NavigationActions.navigate(
                    {
                        routeName: 'Home'
                    }
                ),
                NavigationActions.navigate(
                    {
                        routeName: 'Wait',
                        params: {
                            phoneNumber: 1,
                            userPW: 1
                        }
                    }
                ),
                NavigationActions.navigate(
                    {
                        routeName: 'Wait',
                        params: {
                            phoneNumber: 2,
                            userPW: 2
                        }
                    }
                ),
                NavigationActions.navigate(
                    {
                        routeName: 'Wait',
                        params: {
                            phoneNumber: 3,
                            userPW: 3
                        }
                    }
                ),
                NavigationActions.navigate(
                    {
                        routeName: 'Wait',
                        params: {
                            phoneNumber: 4,
                            userPW: 4
                        }
                    }
                ),
                NavigationActions.navigate(
                    {
                        routeName: 'Wait',
                        params: {
                            phoneNumber: 5,
                            userPW: 5
                        }
                    }
                )
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }
}

WaitingLeaf.propTypes = {
    // phoneNumber: PropTypes.string.isRequired,
    // userPW: PropTypes.string.isRequired,
    // onGobackPressed: PropTypes.func
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
  