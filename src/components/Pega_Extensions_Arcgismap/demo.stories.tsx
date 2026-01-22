import type { StoryObj } from '@storybook/react-webpack5';
import { PegaExtensionsArcgismap } from './index';

export default {
  title: 'Widgets/Arcgismap',
  component: PegaExtensionsArcgismap,
  argTypes: {
    getPConnect: {
      table: { disable: true },
    },
  },
};

const setPCore = () => {
  (window as any).PCore = {};
};

type Story = StoryObj<typeof PegaExtensionsArcgismap>;

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

    return <PegaExtensionsArcgismap {...props} />;
  },
  args: {}
};
