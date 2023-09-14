import {StyleSheet} from 'react-native';
import {Colors, StyleConfig} from '../../configs';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.WHITE,
    borderWidth: StyleConfig.BORDER.WIDTH,
    borderColor: Colors.BORDER_DARK,
    elevation: StyleConfig.CARD.ELEVATION,
    flexDirection: 'row',
    width: '100%',
  },
  cardBorderRadius: {
    borderRadius: StyleConfig.BORDER.RADIUS,
  },
  cardLeft: {
    backgroundColor: Colors.ORIGIN,
    flex: 1,
    borderTopLeftRadius: StyleConfig.BORDER.RADIUS,
    borderBottomLeftRadius: StyleConfig.BORDER.RADIUS,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  cardRight: {
    flex: 1,
    backgroundColor: Colors.ORIGIN,
    borderTopRightRadius: StyleConfig.BORDER.RADIUS,
    borderBottomRightRadius: StyleConfig.BORDER.RADIUS,
    position: 'relative',
  },
  cardBody: {
    flex: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default styles;
