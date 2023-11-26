/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import {FlatList, View, ViewStyle, RefreshControl} from 'react-native';
import NotFound from './NotFound';

export interface IFlatListCommonProps {
  data: any[];
  renderItem(item: any): JSX.Element;
  isShowVertical: boolean;
  horizontal?: boolean;
  isSeparator?: boolean;
  contentContainerStyle?: ViewStyle;
  readonly footer?: React.ReactElement;
  emptyComponent?: React.ReactElement;
  refreshing?: boolean;
  onRefresh?: () => void;
  setCurrentIndex: (index: number) => void;
  currentIndex?: number
}


const FlatListCommon: React.FC<IFlatListCommonProps> = ({
  data,
  isShowVertical,
  horizontal,
  renderItem,
  isSeparator,
  contentContainerStyle,
  footer,
  emptyComponent,
  refreshing,
  onRefresh,
  setCurrentIndex,
  currentIndex
}) => {
  const renderSeparatorComponent = (): JSX.Element => {
    return !isSeparator ? <></> : <View style={{height: 20}} />;
  };

  return (
    <FlatList
      data={data}
      horizontal={horizontal}
      keyExtractor={(_item, index) => `${index}`}
      initialScrollIndex={currentIndex}
      renderItem={(item) => renderItem(item)}
      showsVerticalScrollIndicator={isShowVertical}
      ItemSeparatorComponent={renderSeparatorComponent}
      contentContainerStyle={contentContainerStyle}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(event) => {
        // Calculate the current index based on the scroll position
        const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        setCurrentIndex(index);
      }}
      extraData
      bounces
      ListEmptyComponent={emptyComponent ?? <NotFound />}
      ListFooterComponent={footer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing ?? false}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default FlatListCommon;
