import type { Meta, StoryObj } from '@storybook/react-webpack5';

import PegaExtensionsCameraCapture from './index';

import { configProps, operatorDetails } from './mock';

const meta: Meta<typeof PegaExtensionsCameraCapture> = {
  title: 'PegaExtensionsCameraCapture',
  component: PegaExtensionsCameraCapture,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsCameraCapture>;

if (!window.PCore) {
  window.PCore = {} as any;
}

window.PCore.getConstants = () => {
  return {
    CASE_INFO: { CASE_INFO : 1}
  }
}

window.PCore.getValue = (a) => {
  return a;
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
        resolve(operatorDetails);
      });
    }
  } as any;
};

export const BasePegaExtensionsCameraCapture: Story = (args: any) => {
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
        getValue: () => {/* nothing */},
        getContextName: () => {/* nothing */},
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
};

return (
    <>
      <PegaExtensionsCameraCapture {...props} {...args} />
    </>
  );
};

BasePegaExtensionsCameraCapture.args = {
};
