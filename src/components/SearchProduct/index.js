
import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

import { Container, BoxSearch, Search, CamButton } from './styles';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchProduct = ({ navigation, loadProductRequest }) => {

    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        requestCameraPermission();
    }, []);

    handleDisplayCamera = visible => {
        setVisible(visible);
    }

    handleSearch = text => {
        setSearch(text);
        if (text.length > 3) {
            loadProductRequest(text);
            console.log(text);
            setVisible(false);
        }
        else if (text.length == 0) {
            console.log(text);
        }
    }

    return (
        <>
            {visible ? (
                <CameraKitCameraScreen
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    onBottomButtonPressed={(event) => handleDisplayCamera(false)}
                    scanBarcode={true}
                    onReadCode={event => handleSearch(event.nativeEvent.codeStringValue)}
                    hideControls={false}
                />
            ) : (

                    <BoxSearch>
                        <Icon style={{ padding: 10 }} name="search" size={20} color="#000" />
                        <Search
                            placeholder="Localizar artigo"
                            underlineColorAndroid="transparent"
                            value={search}
                            onChangeText={(text) => handleSearch(text)}
                        />
                        <CamButton onPress={() => handleDisplayCamera(true)}><Icon style={{ padding: 10 }} name="barcode" size={20} color="#FFF" /></CamButton>
                    </BoxSearch>

                )
            }
        </>
    );
}

export default SearchProduct;