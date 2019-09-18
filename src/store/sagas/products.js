import { put, call } from 'redux-saga/effects';
import api from '~/services/api';
import qs from 'qs';

import ProductActions from '../ducks/products';

export function* loadProduct(search) {
    
    try {
        const response = yield call(api.post, 'product/findonebycodebar', qs.stringify({ barcode: search.search }));
        
        if (response.status == 200) {
            if(response.data != null) {
                yield put(ProductActions.loadProductSuccess(response.data));
            }
            else {
                yield put(ProductActions.loadProductFailure());
            }
        }

    } catch (error) {
        console.log(error);
        yield put(ProductActions.loadProductFailure());
    }
}
