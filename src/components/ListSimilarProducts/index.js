import React from 'react';
import { FlatList, Item, Title, SubTitle } from './styles';

const FlatListItem = ({ item, index }) => (
    <Item>
        <Title>{item.description}</Title>
        <SubTitle>{item.last_price}</SubTitle>
    </Item>
);

const ListSimilarProducts = ({ products }) => (
    <FlatList
    data={products}
    keyExtractor={(item, index) => item.id.toString()}
    renderItem={({ item, index }) => {
        return (
            <FlatListItem item={item} index={index} />
        );
    }}
    />
);

export default ListSimilarProducts;
