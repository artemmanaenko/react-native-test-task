import { useOrdersQuery } from '@orders/shared';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ordersRepository } from '../app/ordersRepository';
import { ScreenContainer } from '../components/ScreenContainer';
import { useOrdersFilterStore } from '../stores/ordersFilterStore';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OrdersList'>;

export const OrdersListScreen = ({ navigation }: Props) => {
  const status = useOrdersFilterStore((state) => state.status);
  const ordersQuery = useOrdersQuery({ repository: ordersRepository, status });

  return (
    <ScreenContainer title="Orders">
      <Text style={styles.subtitle}>React Native candidate task screen</Text>

      <View style={styles.filterPlaceholder}>
        <Text>Filter placeholder. Current value: {status}</Text>
      </View>

      <View style={styles.placeholder}>
        <Text>Query state preview: {ordersQuery.status}</Text>
        <Text>Orders loaded: {ordersQuery.data?.length ?? 0}</Text>
      </View>

      <Button
        title="Open first order (temporary stub)"
        onPress={() => navigation.navigate('OrderDetails', { orderId: '1' })}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: '#6b7280'
  },
  filterPlaceholder: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff'
  },
  placeholder: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    gap: 4
  }
});
