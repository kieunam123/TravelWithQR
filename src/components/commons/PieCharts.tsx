import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit'

export interface IProps {
  data: IData[];
  width?: number;
  height?: number;
}

export interface IData {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const PieCharts: React.FC<IProps> = (props: IProps) => {
  return (
    <View>
      <PieChart
        data={props.data}
        width={props.width ?? 450}
        height={props.height ?? 250}
        chartConfig={{
          backgroundColor: '#black',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute //for the absolute number remove if you want percentage
      />
    </View>
  )
}

export default PieCharts

const styles = StyleSheet.create({})