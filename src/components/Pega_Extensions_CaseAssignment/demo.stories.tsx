import type { StoryObj } from '@storybook/react-webpack5';
import { PegaExtensionsCaseAssignment } from './index';

export default {
  title: 'Widgets/CaseAssignmentUploader',
  component: PegaExtensionsCaseAssignment,
  argTypes: {
    getPConnect: {
      table: { disable: true },
    },
  },
};

const setPCore = () => {
  (window as any).PCore = {
    getConstants: () => {
      return {
        CASE_INFO: {
          CASE_INFO: '',
        },
      };
    },
  };
};

type Story = StoryObj<typeof PegaExtensionsCaseAssignment>;

export const Default: Story = {
  render: (args) => {
    setPCore();

    const props = {
      ...args,
      getPConnect: () => ({
        getContextName: () => '',
        getValue: () => '',
      }),
    };

    return <PegaExtensionsCaseAssignment {...props} />;
  },
  args: {}
};
