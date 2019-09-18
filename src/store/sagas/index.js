import { all, takeLatest } from 'redux-saga/effects';

import { ProductTypes } from '../ducks/products';

import { loadProduct } from './products';

export default function* rootSaga() {
  yield all([
    takeLatest(ProductTypes.LOAD_PRODUCT_REQUEST, loadProduct),
  ]);
}
