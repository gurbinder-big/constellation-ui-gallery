import type { StoryObj } from '@storybook/react-webpack5';

import PegaExtensionsTimeline from './index';

import { configProps, operatorDetails } from './mock';

const meta: Meta<typeof PegaExtensionsTimeline> = {
  title: 'PegaExtensionsTimeline',
  component: PegaExtensionsTimeline,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsTimeline>;

if (!window.PCore) {
  window.PCore = {} as any;
}

window.PCore.getLocaleUtils = () => {
  return {
    getLocaleValue: (value: any) => {
      return value;
    }
  } as any;
};

window.PCore.getUserApi = () => {
  return {
    getOperatorDetails: () => {
      return new Promise(resolve => {
        // @ts-ignore
        resolve(operatorDetails);
      });
    }
  } as any;
};

export const BasePegaExtensionsTimeline: Story = (args: any) => {

  const props = {
    label: configProps.label,
    createOperator: configProps.createOperator,
    updateOperator: configProps.updateOperator,
    createDateTime: configProps.createDateTime,
    updateDateTime: configProps.updateDateTime,

    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
};

return (
    <>
      <PegaExtensionsTimeline {...props} {...args} />
    </>
  );
};

BasePegaExtensionsTimeline.args = {
  createLabel: configProps.createLabel,
  updateLabel: configProps.updateLabel,
  hideLabel: configProps.hideLabel
};
