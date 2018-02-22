
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginLeaf from './LoginLeaf';
import WaitingLeaf from './WaitingLeaf';

const SimpleApp = StackNavigator ({
        Home: {screen: LoginLeaf}, //对应RN 组件的名称，必须有
        Wait: {screen: WaitingLeaf}
    },
    {
        // headerMode: 'none' //隐藏标题栏
    }
);

// export default SimpleApp;

//等同于：export default SimpleApp;
export default class LearnRN extends Component {
    render() {
        return (
            <SimpleApp />
        );
    }
}