import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../Helper/Layout';

const Header = ({title, navigation, isBack}) => (
  <View
    style={{
      backgroundColor: Colors.primaryColor,
      height: 100,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }}>
    <Text
      style={{
        marginBottom: 10,
        color: Colors.white,
        fontSize: 22,
      }}>
      {title}
    </Text>
  </View>
);

export default Header;
