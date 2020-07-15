import React, {useEffect, useState} from 'react';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import 'moment/locale/pt-br';
import Loader from 'react-native-loading-spinner-overlay';

import {
  Container,
  Header,
  Description,
  DateInfo,
  Temp,
  Localization,
  Divisor,
  ValueView,
  ValueTitle,
  Value,
  Button,
  ButtonText,
  Main,
} from './styles';
import api from '../../services/api';

export default function Info() {
  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState('');
  const [local, setLocal] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [load, setLoad] = useState(false);
  const [date] = useState(new Date());

  async function getData() {
    setLoad(true);
    const {latitude, longitude} = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });
    const {data} = await api.get(
      `weather?lat=${latitude}&lon=${longitude}&&units=metric&lang=pt_br&APPID=f5aba605934a36c9f57fce4b24938e48`,
    );

    setLocal(data.name);
    setDesc(data.weather[0].description);
    setTemp(Math.floor(data.main.temp));
    setMin(Math.floor(data.main.temp_min));
    setMax(Math.floor(data.main.temp_max));
    setLoad(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Loader
        visible={load}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.8)"
        textContent="Carregando..."
        textStyle={{color: 'white', fontSize: 25}}
      />

      <Header>
        <Icon name="sun" size={50} color="white" />

        <Localization>{local}</Localization>

        <DateInfo>
          {moment(date).locale('pt-br').format('dddd, D [de] MMMM')}
        </DateInfo>
      </Header>

      <Main>
        <Temp>{temp} °c</Temp>

        <Divisor />

        <Description>{desc.toUpperCase()}</Description>

        <ValueView>
          <ValueTitle>min </ValueTitle>

          <Value>{min} ° / </Value>

          <ValueTitle>max </ValueTitle>

          <Value>{max} °</Value>
        </ValueView>
      </Main>

      <Button onPress={getData} activeOpacity={0.8}>
        <ButtonText>Atualizar</ButtonText>
      </Button>
    </Container>
  );
}
