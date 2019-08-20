import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
`;

export const Title = styled.Text`
color: #000;
font-size: 16px;
font-weight: bold;
`;

export const SubTitle = styled.Text`
color: #000;
font-size: 14px;
`;

export const FlatList = styled.FlatList``;

export const BoxSearch = styled.View`
flex-direction: row;
justify-content: center;
border: 1px solid #ccc;
align-items: center;
`;

export const Search = styled.TextInput`
flex: 1;
padding: 10px 10px 10px 0;
background-color: #fff;
color: #424242;
`;

export const Item = styled.View`
flex-direction: row;
border: 1px solid #ccc;
`;

export const CamButton = styled.TouchableOpacity`
background-color: #0079a1;
padding: 10px;
`;