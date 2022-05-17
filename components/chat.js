import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
    StyleSheet,
    View,
    Platform,
    /*Text,*/
    KeyboardAvoidingView
} from 'react-native';

export default function Chat(props) {
    let { name, color } = props.route.params;
    const [messages, setMessages] = useState([]);

    //display users name and background color from start screen
    useEffect(() => {
        props.navigation.setOptions({ title: name });
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: `${name} has joined the chat.`,
                createdAt: new Date(),
                system: true,
                // pass additional custom parameters if any
            },
        ]);
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    // implement and customize the colour of users bubble
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )
    }


    return (
        <View style={[{ backgroundColor: color }, styles.container]}>
            <GiftedChat
                renderBubble={renderBubble.bind()}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />

            {/* Fixing Androids kexboard problem - messages shouldn't be covered/hidden by kexboard when typiing */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})

