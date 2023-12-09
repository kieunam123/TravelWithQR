import React from 'react';
import {View, Modal, StatusBar, StyleSheet} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import {useSelector} from 'react-redux';
import {TextCustom} from '../components/commons';
import {Colors} from '../configs';
import {RootState} from '../redux/reducers';

const styles = StyleSheet.create({
  backdropModal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface IProps {
  fontsLoaded?:any;

}

const Loading = ({fontsLoaded}:IProps) => {
  const {isLoading, lang} = useSelector((state: RootState) => state.global);
  let vi:boolean = lang === 'vi'
  return (
    <>
      <Modal transparent visible={isLoading} animationType="none">
        <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
        <View style={styles.backdropModal}>
          <View style={styles.content}>
            <View style={{height: 100}}>
              <MaterialIndicator color="white" />
              <TextCustom style={{color: Colors.WHITE}}>
                {vi ? "Vui lòng đợi trong giây lát." : 'Loading, please wait...'}
              </TextCustom>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Loading;
