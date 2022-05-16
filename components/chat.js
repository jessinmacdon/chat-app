import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Chat(props) {
    //display users name and background color from start screen
    let { name, color } = props.route.params;
    useEffect(() => {
        props.navigation.setOptions({ title: name });
    }, []);

    return (
        // Components to create the color arrays, titles and the app's colors
        <View style={[{ backgroundColor: color }, styles.container]}>
            <Text style={styles.text}>This will be your chat screen! Updating.....</Text>
            <Text style={styles.text}>Chat room will be ready in 2 days</Text>
        </View>
    )
}

// Creating stylesheet for the start screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
    },
});