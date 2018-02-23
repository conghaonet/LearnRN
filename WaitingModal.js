
import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Modal, ActivityIndicator
} from 'react-native';

export default class WaitingModal extends Component {
    render() {
        return (
            <Modal transparent={true} 
                onRequestClose={() => {}} // android必须实现, 忽略用户按下Android 返回键事件
                visible={this.props.show}>
                <View style={styles.mainViewStyle}>
                    <View style={styles.contentViewStyle}>
                        <Text style={styles.textStyle}>
                            {this.props.prompt}
                        </Text>
                        <ActivityIndicator animating={true}
                            color={'blue'}
                            size={'large'} />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.75)' //设置主View 的半透明效果，Modal 才能透明
    },
    contentViewStyle: {
        backgroundColor: 'white' //Modal 显示内容背景色为白色，不让背景透过来，让用户看不清
    },
    textStyle: {
        fontSize: 30,
        margin: 30
    }
});