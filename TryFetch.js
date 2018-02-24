
import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, NetInfo } from 'react-native';
import MyUtil from './MyUtil'


//等同于：export default SimpleApp;
export default class TryFetch extends Component {

    componentWillMount() {
        let REQUEST_URL = 'http://fepapi.beta.web.sdp.101.com/v1/commonapi/get_codes';
        let map = {
            method: 'GET'
        }
        let privateHeaders = {
            'Private-header1' : 'value1',
            'Private-header2' : 'value2'
        }
        map.headers = privateHeaders;
        map.timeout = 500;
        map.size = 0;
        fetch(REQUEST_URL, map).then((result) => {
            MyUtil.log('MyUtilMyUtilMyUtilMyUtilMyUtilMyUtilMyUtilMyUtilMyUtilMyUtil');
            MyUtil.log(result.headers);
            result.json().then((obj) => {
                MyUtil.log(obj);
                // console.log(result.status);
            }).catch((error) => {
                // console.log(result.text());
                MyUtil.log(error);
            });
        }).catch((error) => {
            MyUtil.log(error);
        });
    }
    render() {
        NetInfo.getConnectionInfo().done((info) => {
            MyUtil.log('type of NetInfo.getConnectionInfo is: '+info.type);
        });
        return (
            <View style={styles.container} >
                
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
});
  