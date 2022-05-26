import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as Location from 'expo-location';

export default class CustomActions extends React.Component {

    // allow users to pick a picture from their gallery or camera
    //Upload this images to firestore, once stored get a ref (uri/url)
    imageUpload = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const imageNameBefore = uri.split("/");
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        const storage = getStorage();
        const img_ref = ref(storage, `images/${imageName}`);
        await uploadBytes(img_ref, blob);

        blob.close();
        return await getDownloadURL(img_ref);
    }

    //Ask user for permission to access their gallery of library
    //if user grants permission open the library allowing the user to select a picture from their galery and send this picture 
    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        try {
            if (status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch(error => console.log(error));

                if (!result.cancelled) {
                    const imageUrl = await this.imageUpload(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // ask user for permission to access their hardware camera
    // if granted open camera and let user capture a new picture using Camera once confirmed send the picture passing it in a blob
    takePhoto = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);

        try {
            if (status === 'granted') {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch(error => console.log(error));

                if (!result.cancelled) {
                    const imageUrl = await this.imageUpload(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Ask for permission to access users location
    // if permission is granted, grap location and send it passing it to customActionView

    getLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);

        try {
            if (status === 'granted') {
                let result = await Location.getCurrentPositionAsync({})
                    .catch(error =>
                        console.log(error));

                if (result) {
                    this.props.onSend({
                        location: {
                            longitude: result.coords.longitude,
                            latitude: result.coords.latitude,
                        },
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // using onActionPress to render + button on chat screen to nest the actionSheet
    onActionPress = () => {
        const options = ['Photo & Video Library', 'Camera', ' Share Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        //user clicks on the Phote and video library to choose item from their gallery
                        return this.pickImage();
                    case 1:
                        //user clicks on the camera - opens camera allowing them to capture a picture
                        return this.takePhoto();
                    case 2:
                        //user clicks on the share location, whihc triggers getLocation - getting the users current location and sending it
                        return this.getLocation();
                    default:
                }
            }
        );

    }
    render() {
        return (
            <TouchableOpacity
                accessible={true}
                accessibilityRole="button"
                style={styles.container}
                onPress={this.onActionPress} >
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
})

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
}; 