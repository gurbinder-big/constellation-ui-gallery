/* eslint-disable */
import MyCoMyComponentsMyLocalActionLauncher from './index.tsx';

export default {
  title: 'MyCoMyComponentsMyLocalActionLauncher',
  component: MyCoMyComponentsMyLocalActionLauncher
};

if(!window.PCore) { //①
  window.PCore= {};
}

window.PCore.getConstants = () => { //①
  return {
    CASE_INFO: {
      CASE_INFO: 'caseInfo',
      ASSIGNMENT_ID: 'caseInfo.assignments[0].ID',
      AVAILABLEACTIONS: 'caseInfo.availableActions'
    }
  }
}

export const baseMyCoMyComponentsMyLocalActionLauncher = () => { //②
  const props = {
    buttonText: 'Test',
    testId: '123456',
    actionId: 'pyUpdateCaseDetails',
    getPConnect: () => { //③
      return {
        getActionsApi: () => {
          return {
            openLocalAction: () => {
              return {};
            }
          };
        },
        getValue: (parameter) => { //④
          switch (parameter) {
            case window.PCore.getConstants().CASE_INFO.ASSIGNMENT_ID :
              return "ASSIGN-WORKLIST ON8TTL-C11NGALL-WORK LAT-3!ENTERINFO_FLOW_1";
            case window.PCore.getConstants().CASE_INFO.AVAILABLEACTIONS :
              return [
                {
                  name: 'Edit details',
                  links: {
                    open: {
                      rel: 'self',
                      href: '/cases/ON8TTL-C11NGALL-WORK L-3/actions/pyUpdateCaseDetails',
                      type: 'GET',
                      title: 'Get case action details'
                    }
                  },
                  ID: 'pyUpdateCaseDetails',
                  type: 'Case'
                },
                {
                  name: 'Change stage',
                  links: {
                    open: {
                      rel: 'self',
                      href: '/cases/ON8TTL-C11NGALL-WORK L-3/actions/pyChangeStage',
                      type: 'GET',
                      title: 'Get case action details'
                    }
                  },
                  ID: 'pyChangeStage',
                  type: 'Case'
                }
            ];
            default:
              return {};
          }
        }
      };
    }
  };

  return (
    <>
      <MyCoMyComponentsMyLocalActionLauncher {...props} />
    </>
  );
};
