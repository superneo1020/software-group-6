export const initializeOrderStatus = (orders) => {
  return orders.map(order => ({
    ...order,
    startTime: Date.now(),
    status: 'Order Placed',
    remainingTime: order.time
  }));
};

export const updateOrderStatus = (orders) => {
  return orders.map(order => {
    const elapsedTime = Math.floor((Date.now() - order.startTime) / 60000);
    let newStatus = 'Order Placed';
    if (elapsedTime >= order.preparationTime && elapsedTime < order.preparationTime + order.deliveryTime) {
      newStatus = 'Out for Delivery';
    } else if (elapsedTime >= order.preparationTime + order.deliveryTime) {
      newStatus = 'Delivered';
    } else if (elapsedTime > 0) {
      newStatus = 'Preparing';
    }
    const remainingTime = Math.max(order.time - elapsedTime, 0);
    return { ...order, status: newStatus, remainingTime };
  });
};
