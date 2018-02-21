
import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image
} from 'react-native';

export default class TryFlexbox extends Component {
    onLayout(event) {
        {
            let {x, y, width, height} = event.nativeEvent.layout;
            console.log('onLayout x = ' + x);
            console.log('onLayout y = ' + y);
            console.log('onLayout width = ' + width);
            console.log('onLayout height = ' + height);
        }
    }
    render() {
        //http://ww1.sinaimg.cn/large/0060lm7Tly1fooavenxnhj310z164n5k.jpg
        //http://ww4.sinaimg.cn/large/0060lm7Tly1fooaphegztj30gy0b3jrf.jpg
        // var imageSource = 'http://cs.101.com/v0.1/static/fep/static/course-covers/bi/bi_cover7.png';
        let imageSource = {
            uri: 'http://cs.101.com/v0.1/static/fep/static/course-covers/bi/bi_cover7.png'
        };

        Image.getSize(imageSource.uri, (width, height) => {
                console.log('imageSource width = ' + width);
                console.log('imageSource height = ' + height);
        });

        let imageSourceA = {
            uri: 'http://cs.101.com/v0.1/static/fep/static/course-covers/bi/bi_cover6.png'
        };

        Image.prefetch(imageSourceA.uri).then((result) => {
            console.log('imageA result = ' + result);
        }).catch((error) => {
            console.log('imageA error = ' + error);
        });
        return (
            <View style={styles.container} onLayout={this.onLayout}>
                <View style={styles.firstRow} top={40}>
                    <View style={styles.test1} />
                    <View style={styles.test2} />
                    <View style={styles.test3} />
                </View>
                <Image style={styles.imageStyle} top={40} source={imageSource}/>
                <Image style={styles.imageStyle} top={40} source={imageSourceA}/>
                <Image style={styles.imageStyle} top={40} width={90} height={90} backgroundColor={'grey'} resizeMode={'center'} source={imageSourceA}/>
                <Image style={styles.imageStyle} top={40} width={90} height={90} source={require('./ic_launcher.png')}/>
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
    imageStyle: {
        width: 213,
        height: 120,
        backgroundColor: 'white'
    }
});
  