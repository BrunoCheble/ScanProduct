import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import Mergers from 'seamless-immutable-mergers';

/**
 * Action types & creators
 */
const { Types, Creators } = createActions({
    loadProductRequest: ['search'],
    loadProductSuccess: ['product'],
    loadProductFailure: null,
});

export const ProductTypes = Types;
export default Creators;

/**
 * Handlers
 */
const INITIAL_STATE = Immutable({
    product: {
        id: null,
        description: null,
        stock_qtt : null,
        last_goods_receipt_date : null,
        last_goods_issue_date : null,
        similars: []
    },
});

/**
 * Reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_PRODUCT_SUCCESS]: (state, { product }) => ({ ...state, product }),
    [Types.LOAD_PRODUCT_FAILURE]: (state, {}) => INITIAL_STATE,
});
