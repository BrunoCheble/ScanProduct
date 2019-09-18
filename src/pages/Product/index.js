
import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProductActions from '~/store/ducks/products';

import { Container, DetailProduct, Title, StockQtt, LastPrice, GoodsReceipt, GoodsIssue, BoxSearch, Search, CamButton } from './styles';

import { CameraKitCameraScreen } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

import ListSimilarProducts from '~/components/ListSimilarProducts';

const Product = ({ navigation, product, loadProductRequest }) => {

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
        <Container>
            {visible ? (
                <CameraKitCameraScreen
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    onBottomButtonPressed={(event) => handleDisplayCamera(false)}
                    scanBarcode={true}
                    laserColor={"blue"}
                    frameColor={"yellow"}

                    showFrame={true}
                    offsetForScannerFrame = {10}
                    heightForScannerFrame = {300}
                    colorForScannerFrame = {'red'}

                    onReadCode={event => handleSearch(event.nativeEvent.codeStringValue)}
                    hideControls={false}
                    flashImages={{
                        // Flash button images
                        on: require('~/assets/flashon.png'),
                        off: require('~/assets/flashoff.png'),
                        auto: require('~/assets/flashauto.png'),
                    }}
                    cameraFlipImage={require('~/assets/flip.png')}
                    captureButtonImage={require('~/assets/capture.png')}
                />
            ) : (
                    <>
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
                        <DetailProduct>
                            <Title>{product.description}</Title>
                            <LastPrice>{product.last_price}</LastPrice>
                            <StockQtt>{product.stock_qtt}</StockQtt>
                            <GoodsReceipt>{product.last_goods_receipt_date}</GoodsReceipt>
                            <GoodsIssue>{product.last_goods_issue_date}</GoodsIssue>
                        </DetailProduct>
                        <ListSimilarProducts products={product.similars} />
                    </>
                )
            }
        </Container>
    );
}

const mapStateToProps = state => ({
    product: state.product.product,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ProductActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);