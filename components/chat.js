import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
    StyleSheet,
    View,
    Platform,
    KeyboardAvoidingView,
    /*Text*/
} from 'react-native';

import {
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy
} from "firebase/firestore";

import { auth, db } from '../config/firebase';


export default function Chat(props) {
    // Retrieving the name and color properties passed from the Start Screen
    let { name, color } = props.route.params;

    // State - hold messages
    const [messages, setMessages] = useState([]);

    // Create reference to the messages collection on firestore
    const messagesRef = collection(db, 'messages');

    useEffect(() => {
        //display users name from start screen as title on chat screen
        props.navigation.setOptions({ title: name });

        // messages to be stored by createdAt(Date/time of creation
        //Query messages collection - pulling all messages
        const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));

        // onSnapshot returns an unsubscriber, listening for updates to the messages collection
        const unsubscribe = onSnapshot(messagesQuery, onCollectionUpdate);

        // unsubsribe snapshot listener on unmount
        return () => unsubscribe();
    }, []);


    // save last messages(state) to the Firestore messages collection
    const addMessage = (message) => {
        addDoc(messagesRef, {
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: message.user
        });
    }

    // Appending the new message to state - //then call addMessage to save to Firebase collection
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        addMessage(messages[0]);
    }, [])

    // Reading snapshot of messages collection then adding messages to messages state
    const onCollectionUpdate = (querySnapshot) => {
        setMessages(
            querySnapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
            }))
        )
    }

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
        //display users name and background color from start screen
        <View
            style={[{ backgroundColor: color }, styles.container]}
        >
            <GiftedChat
                renderBubble={renderBubble.bind()}
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                // pull uid from auth data object and name from start.js/start screen - tehn add to message
                user={{
                    _id: auth?.currentUser?.uid,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any'
                }}
            />

            {/* Fixing Android's keyboard problem - messages shouldn't be covered/hidden by keyboard when typing */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})









