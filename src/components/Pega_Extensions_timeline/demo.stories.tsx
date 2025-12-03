import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PegaExtensionsTimeline from './index';

const meta: Meta<typeof PegaExtensionsTimeline> = {
  title: 'PegaExtensionsTimeline',
  component: PegaExtensionsTimeline,
  excludeStories: /.*Data$/,
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsTimeline>;

if (!window.PCore) {
  window.PCore = {} as any;
}

const mockData = {
  data: {
    data: [
      {
        createdAt: "2025-07-05T09:15:00.000Z",
        header: "Medical Leave Request",
        DeadLineDate: "2025-07-10",
        Descripiton: "Employee requesting medical leave.",
        Color: "#FFA133",
        Type: "Paid Leave"
      },
      {
        createdAt: "2025-07-01T08:00:00.000Z",
        header: "Bereavement Leave Request",
        DeadLineDate: "2025-06-07",
        Details: "Bereavement leave for family emergency.",
        pySelected: true,
        pyCount: 6
      },
      {
        createdAt: "2025-06-28T13:45:00.000Z",
        header: "Sabbatical Leave Request",
        DeadLineDate: "2025-05-20",
        Details: "Sabbatical leave for personal development.",
        Type: "Unpaid Leave",
        pxObjClass: "MyOrg-LeaveReq-Data-Timeline"
      },
      {
        createdAt: "2025-06-16T11:20:00.000Z",
        header: "Half-Day Leave Request",
        DeadLineDate: "2025-04-12",
        Details: "Half-day leave for personal reasons.",
        Color: "#FFA1A1",
        pySelected: true
      },
      {
        createdAt: "2025-06-15T09:30:00.000Z",
        header: "Annual Leave Request",
        DeadLineDate: "2025-12-10",
        Details: "Annual leave for 10 days starting from 1st December.",
        Color: "#FF5733",
        pyCount: 5
      },
      {
        createdAt: "2025-06-15T10:10:00.000Z",
        header: "Extended Leave Request",
        DeadLineDate: "2025-03-15",
        Details: "Extended leave for vacation purposes.",
        Type: "Paid Leave",
        pyCount: 9
      },
      {
        createdAt: "2025-06-13T11:00:00.000Z",
        header: "Sick Leave Request",
        DeadLineDate: "2025-12-02",
        Details: "Sick leave for 2 days starting from 28th November.",
        Type: "Unpaid Leave",
        pyCount: 3
      },
      {
        createdAt: "2025-06-12T10:00:00.000Z",
        header: "Training Leave Request",
        DeadLineDate: "2025-09-25",
        Details: "Training leave for 5 days to attend workshop.",
        Color: "#FF33A1",
        Type: "Paid Leave"
      }
    ]
  }
};

window.PCore.getLocaleUtils = () => ({
  getLocaleValue: (value: any) => value,
});

window.PCore.getUserApi = () => ({
  getOperatorDetails: () => Promise.resolve(operatorDetails),
});

window.PCore.getDataApiUtils = () => ({
  getData: (endpoint ,a ,b) => Promise.resolve(mockData),
});

export const BasePegaExtensionsTimeline: Story = (args: any) => {
  const props = {
    getPConnect: () => ({
      getActionsApi: () => ({
        updateFieldValue: () => {},
        triggerFieldChange: () => {},
      }),
      ignoreSuggestion: () => {},
      acceptSuggestion: () => {},
      setInheritedProps: () => {},
      resolveConfigProps: () => {},
    }),
  };

  return <PegaExtensionsTimeline {...props} {...args} />;
};

BasePegaExtensionsTimeline.args = {
  dataPage: "dsadad"
};
