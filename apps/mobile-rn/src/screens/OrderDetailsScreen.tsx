import { useOrderDetailsQuery } from '@orders/shared';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { ordersRepository } from '../app/ordersRepository';
import { ScreenContainer } from '../components/ScreenContainer';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

export const OrderDetailsScreen = ({ route }: Props) => {
  const { orderId } = route.params;
  const detailsQuery = useOrderDetailsQuery({ repository: ordersRepository, orderId });

  return (
    <ScreenContainer title="Order Details">
      <Text style={styles.subtitle}>Order id: {orderId}</Text>

      <View style={styles.placeholder}>
        <Text>Query state preview: {detailsQuery.status}</Text>
        <Text>This screen is intentionally incomplete for the assignment.</Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: '#6b7280'
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
