import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, MenuButton, Title} from './styles';

export default function Info() {
  return (
    <Container>
      <MenuButton>
        <Icon name="menu" size={45} color="white" />
      </MenuButton>

      <Title>Clima Agora</Title>

      <MenuButton>
        <Icon name="add-circle" size={35} color="white" />
      </MenuButton>
    </Container>
  );
}
