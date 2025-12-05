import * as Haptics from 'expo-haptics';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Haptics.selectionAsync</Text>
      <View style={styles.buttonContainer}>
        <Button title="Selection" onPress={() => Haptics.selectionAsync()} />
      </View>
      <Text>Haptics.notificationAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Success"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          }
        />
        <Button
          title="Error"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
          }
        />
        <Button
          title="Warning"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
          }
        />
      </View>
      <Text>Haptics.impactAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Light"
          onPress={() => Haptics.impactAsync(ImpactFeedbackStyle.Light)}
        />
        <Button
          title="Medium"
          onPress={() => Haptics.impactAsync(ImpactFeedbackStyle.Medium)}
        />
        <Button
          title="Heavy"
          onPress={() => Haptics.impactAsync(ImpactFeedbackStyle.Heavy)}
        />
        <Button
          title="Rigid"
          onPress={() => Haptics.impactAsync(ImpactFeedbackStyle.Rigid)}
        />
        <Button
          title="Soft"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
});
