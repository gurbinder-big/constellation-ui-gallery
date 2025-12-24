import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Pega_Extensions_DataMigAccel from './index';
import configProps from './mock';

const meta: Meta<typeof Pega_Extensions_DataMigAccel> = {
  title: 'Pega_Extensions_DataMigAccel',
  component: Pega_Extensions_DataMigAccel,
  excludeStories: /.*Data$/,
};

export default meta;

type Story = StoryObj<typeof Pega_Extensions_DataMigAccel>;

if (!window.PCore) {
  window.PCore = {};
}

const mockData = {
  kafkaDataBricksSaveDataPage: {
    pzLoadTime: '123'
  },
  dataTypesDataPage: {
    data : {
      data: [
        {
          "pyLabel": "dummy"
        },
        {
          "pyLabel": "dummy"
        }
      ]
    }
  },
  schemaNamesDataPage: {
    data : {
      data: [
        {
          "SchemaName": "dummy"
        },
        {
          "SchemaName": "dummy"
        }
      ]
    }
  },
  dataBaseDataPage: {
    data : {
      data: [
        {
          "pyRWDatabase": "CustomerData"
        },
        {
          "pyRWDatabase": "PegaDATA"
        }
      ]
    }
  },
  caseTypesDataPage: {
    data : {
      data: [
        {
          "pyClassName": "BIG-GDM-Work-DataMigration"
        },
        {
          "pyClassName": "BIG-GDM-Work-DataMigration"
        },
        {
          "pyClassName": "BIG-GDM-Work-DataMigration"
        }
      ]
    }
  },
};

window.PCore.getDataPageUtils = () => {
  return {
    getPageDataAsync: (endpoint) => {
      switch (endpoint) {
        case 'dataTypesDataPage':
          return Promise.resolve(mockData.dataTypesDataPage);
        case 'schemaNamesDataPage':
          return Promise.resolve(mockData.schemaNamesDataPage);
        case 'dataBaseDataPage':
          return Promise.resolve(mockData.dataBaseDataPage);
        case 'caseTypesDataPage':
          return Promise.resolve(mockData.caseTypesDataPage);
        default:
          return Promise.reject(new Error('Unknown endpoint'));
      }
    }
  }
}

window.PCore.getDataApiUtils = () => {
  return {
    getData: (endpoint) => {
      switch (endpoint) {
        case 'dataTypesDataPage':
          return Promise.resolve(mockData.dataTypesDataPage);
        case 'schemaNamesDataPage':
          return Promise.resolve(mockData.schemaNamesDataPage);
        case 'dataBaseDataPage':
          return Promise.resolve(mockData.dataBaseDataPage);
        case 'caseTypesDataPage':
          return Promise.resolve(mockData.caseTypesDataPage);
        default:
          return Promise.reject(new Error('Unknown endpoint'));
      }
    }
  }
};

export const BaseComponent: Story = (args) => {
  const props = {
    ...configProps,
    getPConnect: () => ({
      getValue: (value) => value,
      getContextName: () => 'app/primary_1',
      getLocalizedValue: (value) => value,
      getActionsApi: () => ({
        updateFieldValue: () => {},
        triggerFieldChange: () => {},
      }),
      ignoreSuggestion: () => {},
      acceptSuggestion: () => {},
      setInheritedProps: () => {},
      resolveConfigProps: () => {}
    }),
  };

  return (
    <>
      <Pega_Extensions_DataMigAccel {...props} {...args} />
    </>
  );
};

BaseComponent.args = {
  caseTypesDataPage: configProps.caseTypesDataPage,
  dataBaseDataPage: configProps.dataBaseDataPage,
  dataTypesDataPage: configProps.dataTypesDataPage,
  schemaNamesDataPage: configProps.schemaNamesDataPage
};
