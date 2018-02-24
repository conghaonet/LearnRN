
import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, NetInfo } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginLeaf from './LoginLeaf';
import WaitingLeaf from './WaitingLeaf';
import WaitingModal from './WaitingModal';

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
export default class TryNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWaitingModal:false, //定义供自定义Modal 使用的状态机变量
            modalPrompt:''
        };
        this.setWaitingModal = this.setWaitingModal.bind(this);
    }
    render() {
        NetInfo.getConnectionInfo().done((info) => {
            console.log('NetInfo info is: '+info.type);
        });
        return (
            <View style={styles.container} >
                <SimpleApp screenProps = {{ prop1: 'value1', prop2: 'value2', setWaitingModal:this.setWaitingModal}} />
                <WaitingModal show={this.state.showWaitingModal}
                    prompt={this.state.modalPrompt} />
            </View>
        );
    }
    setWaitingModal(show, aPrompt) { //用来控制显示自定义Modal 的回调函数
        this.setState({showWaitingModal:show, modalPrompt: aPrompt});
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
});
  