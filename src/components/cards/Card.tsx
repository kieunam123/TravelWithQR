import React from 'react';
import {View, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import styles from './card.styles';
import {Colors} from '../../configs';

export interface ICardProps {
  bgColor?: string;
  children: React.ReactNode;
  isBorderRadius?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftStyle?: ViewStyle;
  onPress?: () => void;
  onLongPress?: () => void;
}

const Card: React.FC<ICardProps> = (props) => {
  const bgStyle = props?.bgColor
    ? {backgroundColor: props?.bgColor}
    : undefined;
  const borderStyle = props?.isBorderRadius
    ? styles.cardBorderRadius
    : undefined;
  return (
    <TouchableWithoutFeedback
      onPress={props?.onPress}
      onLongPress={props?.onLongPress}>
      <View style={[styles.cardContainer, bgStyle, borderStyle]}>
        {props?.leftComponent ? (
          <View style={[styles.cardLeft, props?.leftStyle]}>{props?.leftComponent}</View>
        ) : null}
        <View style={styles.cardBody}>{props?.children}</View>
        {props?.rightComponent ? (
          <View style={styles.cardRight}>{props?.rightComponent}</View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

Card.defaultProps = {
  bgColor: Colors.WHITE,
  isBorderRadius: true,
};

export default Card;
