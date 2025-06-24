import { api } from './Api';

interface CreateOrderPayload {
  baseIds: number[];
  additionalIds?: number[];
}

export function createOrder({ baseIds, additionalIds }: CreateOrderPayload) {
  const params = new URLSearchParams();

  baseIds.forEach(id => params.append('baseIds', id.toString()));
  additionalIds?.forEach(id => params.append('additionalIds', id.toString()));

  return api.post(`/orders?${params.toString()}`);
}

export function getOrderSummary(orderId: number) {
  return api.get(`/orders/${orderId}/summary`);
}

export function confirmOrder(orderId: number) {
  return api.post(`/orders/${orderId}/confirm`);
}
