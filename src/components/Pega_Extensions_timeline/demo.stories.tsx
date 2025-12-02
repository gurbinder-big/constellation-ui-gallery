import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PegaExtensionsTimeline from './index';

import { configProps, operatorDetails, timelineData } from './mock';

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

window.PCore.getLocaleUtils = () => ({
  getLocaleValue: (value: any) => value,
});

window.PCore.getUserApi = () => ({
  getOperatorDetails: () => Promise.resolve(operatorDetails),
});

export const BasePegaExtensionsTimeline: Story = (args: any) => {
  const props = {
    ...configProps,

    // Inject timeline events directly
    data: timelineData,

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
  createLabel: configProps.createLabel,
  updateLabel: configProps.updateLabel,
  hideLabel: configProps.hideLabel,
};
