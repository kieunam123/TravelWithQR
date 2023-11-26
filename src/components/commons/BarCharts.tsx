import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '~/configs'
import { BarChart } from 'react-native-chart-kit'
import { scaleFactor } from '~/helpers/UtilitiesHelper'

export interface IProps {
  labels: string[],
  data: number[],
  color: string,
  width?: number,
  height?: number,
}

const BarCharts: React.FC<IProps> = (props: IProps) => {
  return (
    <View>
      <BarChart
        data={{
          labels: props.labels,
          // legend: ['External'],
          datasets: [{
            data: props.data
          }],
          // barColors: ['#0DC5FA'],
        }}
        // hideLegend={false}

        width={props.width ?? scaleFactor(400)}
        height={props.height ?? scaleFactor(250)}
        yAxisInterval={1}
        showValuesOnTopOfBars={true}
        withInnerLines={true}
        showBarTops={false}
        // decimalPlaces={0}
        yAxisLabel=""
        yAxisSuffix=""
        segments={Math.max(...props.data)}

        chartConfig={{
          barPercentage: 1,
          decimalPlaces: 0,
          labelColor: (opacity = 1) => Colors.GRAY,
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
          // backgroundColor: "transparent",
          // backgroundGradientTo: "white",
          // backgroundGradientFromOpacity: 0,
          // backgroundGradientFrom: "white",
          // backgroundGradientToOpacity: 0,
          // color: (opacity = 1) => `#0DC5FA`,
          style: {
            borderRadius: 16,
          },
          // propsForBackgroundLines: {
          //   strokeDasharray: "4",
          //   strokeWidth: 0, // If you put 0 in the value no line is displayed
          //   stroke: `rgba(0, 0, 0, 0)`,
          // },
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: '#efefef',
            strokeDasharray: '0',
          },
          propsForLabels: {
            fontSize: `${props.data[7] === undefined ? 15 : scaleFactor(8.7)}`,
          },
          fillShadowGradient: props.color,
          fillShadowGradientOpacity: 1,
        }}
        style={{
          // marginVertical: 8,
          borderRadius: 16,
          marginRight: 10,
          borderWidth: 0.2,
          borderColor: Colors.DISABLED,
          marginLeft: scaleFactor(-30),
        }}
      />
    </View>
  )
}

export default BarCharts