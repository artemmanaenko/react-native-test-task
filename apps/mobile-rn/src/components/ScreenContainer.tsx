import type { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{
  title: string;
}>;

export const ScreenContainer = ({ title, children }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6'
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 12
  },
  title: {
    fontSize: 22,
    fontWeight: '600'
  }
});
