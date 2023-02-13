import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { RadioGroup, RadioButton } from 'cmdn-choice-group';

export default function App() {
  const data = [
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'Javascript', value: 'javascript' },
  ];

  function onPress() {
    console.log('log');
  }

  return (
    <View style={styles.container}>
      <Text>Result</Text>
      <RadioGroup initialValues={data}>
        {data.map(({ label, value }) => {
          return (
            <RadioButton key={label} value={value} onPress={onPress}>
              {() => {
                return (
                  <View>
                    <Text>{value}</Text>
                  </View>
                );
              }}
            </RadioButton>
          );
        })}
      </RadioGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
