// mock.ts

export const configProps = {
  label: 'Create operator',
  title: 'Timeline Demo',

  datapageName: 'D_TimelineData.pxResults',
};

export const operatorDetails = {
  pyFirstName: 'John',
  pyLastName: 'Doe',
  pyUserName: 'john.doe',
  pyEmail: 'john.doe@example.com',
};

// --------------------------------------------
// DUMMY TIMELINE DATA FOR STORYBOOK
// --------------------------------------------

export const timelineData = [
  {
    id: 1,
    createdAt: '2025-01-10T10:15:00Z',
    header: 'Order Created',
    type: 'order_created',
    caseID: 'ORD-1001',
    color: '#4285F4',
    description: 'The order was successfully created in the system.',
  },
  {
    id: 2,
    createdAt: '2025-01-11T14:30:00Z',
    header: 'Payment Completed',
    type: 'payment_completed',
    color: '#0F9D58',
    method: 'Credit Card',
    amount: '$250.00',
  },
  {
    id: 3,
    createdAt: '2025-01-12T09:00:00Z',
    header: 'Warehouse Packed',
    type: 'warehouse_packed',
    color: '#F4B400',
    packedBy: 'Warehouse Team 4',
  },
  {
    id: 4,
    createdAt: '2025-01-13T17:45:00Z',
    header: 'Shipped',
    type: 'shipped',
    color: '#4374E0',
    courier: 'BlueDart',
    trackingID: 'BD-98234121',
  },
  {
    id: 5,
    createdAt: '2025-01-14T12:00:00Z',
    header: 'Out for Delivery',
    type: 'out_for_delivery',
    color: '#DB4437',
    route: 'Sector 21 → Sector 14',
  },
  {
    id: 6,
    createdAt: '2025-01-15T16:22:00Z',
    header: 'Delivered',
    type: 'delivered',
    color: '#0B8043',
    receivedBy: 'Customer',
    deliveredAt: 'Front doorstep',
  },
  {
    id: 7,
    createdAt: '2025-01-16T11:00:00Z',
    header: 'Return Requested',
    type: 'return_requested',
    color: '#AB47BC',
    reason: 'Size mismatch',
  },
  {
    id: 8,
    createdAt: '2025-01-17T13:00:00Z',
    header: 'Return Approved',
    type: 'return_approved',
    color: '#8E24AA',
    approvedBy: 'John Manager',
  },
];
