// import type { Meta, StoryObj } from '@storybook/react-webpack5';
// import PegaExtensionsTimelineZoom from './index';

// const meta: Meta<typeof PegaExtensionsTimelineZoom> = {
//   title: 'PegaExtensionsTimelineZoom',
//   component: PegaExtensionsTimelineZoom,
//   excludeStories: /.*Data$/,
// };

// export default meta;
// type Story = StoryObj<typeof PegaExtensionsTimelineZoom>;

// if (!window.PCore) {
//   window.PCore = {} as any;
// }

// const mockData = {
//   data: {
//     data: [
//       {
//         createdAt: '2025-07-05T09:15:00.000Z',
//         header: 'Medical Leave Request',
//         DeadLineDate: '2025-07-10',
//         Descripiton: 'Employee requesting medical leave.',
//         Color: '#FFA133',
//         Type: 'Paid Leave',
//       },
//       {
//         createdAt: '2025-07-01T08:00:00.000Z',
//         header: 'Bereavement Leave Request',
//         DeadLineDate: '2025-06-07',
//         Details: 'Bereavement leave for family emergency.',
//         pySelected: true,
//         pyCount: 6,
//       },
//       {
//         createdAt: '2025-06-28T13:45:00.000Z',
//         header: 'Sabbatical Leave Request',
//         DeadLineDate: '2025-05-20',
//         Details: 'Sabbatical leave for personal development.',
//         Type: 'Unpaid Leave',
//         pxObjClass: 'MyOrg-LeaveReq-Data-Timeline',
//       },
//       {
//         createdAt: '2025-06-16T11:20:00.000Z',
//         header: 'Half-Day Leave Request',
//         DeadLineDate: '2025-04-12',
//         Details: 'Half-day leave for personal reasons.',
//         Color: '#FFA1A1',
//         pySelected: true,
//       },
//       {
//         createdAt: '2025-06-15T09:30:00.000Z',
//         header: 'Annual Leave Request',
//         DeadLineDate: '2025-12-10',
//         Details: 'Annual leave for 10 days starting from 1st December.',
//         Color: '#FF5733',
//         pyCount: 5,
//       },
//       {
//         createdAt: '2025-06-15T10:10:00.000Z',
//         header: 'Extended Leave Request',
//         DeadLineDate: '2025-03-15',
//         Details: 'Extended leave for vacation purposes.',
//         Type: 'Paid Leave',
//         pyCount: 9,
//       },
//       {
//         createdAt: '2025-06-13T11:00:00.000Z',
//         header: 'Sick Leave Request',
//         DeadLineDate: '2025-12-02',
//         Details: 'Sick leave for 2 days starting from 28th November.',
//         Type: 'Unpaid Leave',
//         pyCount: 3,
//       },
//       {
//         createdAt: '2025-06-12T10:00:00.000Z',
//         header: 'Training Leave Request',
//         DeadLineDate: '2025-09-25',
//         Details: 'Training leave for 5 days to attend workshop.',
//         Color: '#FF33A1',
//         Type: 'Paid Leave',
//       },
//     ],
//   },
// };

// window.PCore.getLocaleUtils = () => ({
//   getLocaleValue: (value: any) => value,
// });

// window.PCore.getUserApi = () => ({
//   getOperatorDetails: () => Promise.resolve(operatorDetails),
// });

// window.PCore.getDataApiUtils = () => ({
//   getData: () => Promise.resolve(mockData),
// });

// export const BasePegaExtensionsTimelineZoom: Story = (args: any) => {
//   const props = {
//     getPConnect: () => ({
//       getActionsApi: () => ({
//         updateFieldValue: () => {},
//         triggerFieldChange: () => {},
//       }),
//       ignoreSuggestion: () => {},
//       acceptSuggestion: () => {},
//       setInheritedProps: () => {},
//       resolveConfigProps: () => {},
//     }),
//   };

//   return <PegaExtensionsTimelineZoom {...props} {...args} />;
// };

// BasePegaExtensionsTimelineZoom.args = {
//   dataPage: 'dsadad',
// };

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PegaExtensionsTimelineZoom from './index';

/* ------------------- STORY META ------------------- */
const meta: Meta<typeof PegaExtensionsTimelineZoom> = {
  title: 'PegaExtensions/TimelineZoom',
  component: PegaExtensionsTimelineZoom,
};
export default meta;

type Story = StoryObj<typeof PegaExtensionsTimelineZoom>;

/* ------------------- PCore MOCKS ------------------- */
if (!window.PCore) {
  window.PCore = {} as any;
}

/* Required by index.tsx */
window.PCore.getConstants = () => ({
  CASE_INFO: {
    CASE_INFO: 'CASE_INFO',
  },
});

/* Required by TimelineWidget */
window.PCore.getLocaleUtils = () => ({
  getLocaleValue: (value: any) => value,
});

/* ------------------- MOCK PEGA DATA (MULTI-DATE) ------------------- */
const pegaHistoryMock = {
  data: {
    data: [
      /* ===== 11 Dec 2025 ===== */
      {
        pxTimeCreated: '2025-12-11T09:38:41.785Z',
        pyPerformer: 'Mandeep',
        pxObjClass: 'History-MyOrg-LeaveReq-Work',
        pxInsName: 'MYORG-LEAVEREQ-WORK L-5011',
        Type: 'order_created',
        Color: '#4285F4',
      },
      {
        pxTimeCreated: '2025-12-11T10:05:12.210Z',
        pyPerformer: 'Mandeep',
        Type: 'payment_completed',
        Color: '#0F9D58',
      },
      {
        pxTimeCreated: '2025-12-11T12:30:55.901Z',
        pyPerformer: 'Mandeep',
        Type: 'warehouse_packed',
        Color: '#FBBC05',
      },

      /* ===== 10 Dec 2025 ===== */
      {
        pxTimeCreated: '2025-12-10T16:45:33.452Z',
        pyPerformer: 'Mandeep',
        Type: 'shipped',
        Color: '#F4B400',
      },
      {
        pxTimeCreated: '2025-12-10T18:10:09.120Z',
        pyPerformer: 'Mandeep',
        Type: 'out_for_delivery',
        Color: '#1A73E8',
      },

      /* ===== 09 Dec 2025 ===== */
      {
        pxTimeCreated: '2025-12-09T09:15:10.009Z',
        pyPerformer: 'Mandeep',
        Type: 'delivered',
        Color: '#34A853',
      },

      /* ===== 07 Dec 2025 ===== */
      {
        pxTimeCreated: '2025-12-07T14:22:45.777Z',
        pyPerformer: 'Mandeep',
        Type: 'return_requested',
        Color: '#EA4335',
      },
      {
        pxTimeCreated: '2025-12-07T15:40:12.300Z',
        pyPerformer: 'Mandeep',
        Type: 'return_approved',
        Color: '#188038',
      },
    ],
  },
};

/* Mock Pega Data API */
window.PCore.getDataApiUtils = () => ({
  getData: () => Promise.resolve(pegaHistoryMock),
});

/* ------------------- STORY ------------------- */
export const BaseTimelineZoom: Story = {
  args: {
    dataPage: 'D_HistoryTimeline',
    getPConnect: () => ({
      getActionsApi: () => ({
        updateFieldValue: () => {},
        triggerFieldChange: () => {},
      }),
      getValue: () => ({
        ID: 'MYORG-LEAVEREQ-WORK L-5011',
      }),
      getContextName: () => 'TEST_CONTEXT',
    }),
  },
};
