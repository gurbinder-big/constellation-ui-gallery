/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { Button } from '@pega/cosmos-react-core';
import React from 'react';

// ---- Type Definitions ----
type PConnect = {
  getActionsApi: () => any;
  getValue: (path: string) => any;
};

type ActionType = {
  ID: string;
  name: string;
};

type LaunchCallback = (response?: unknown) => void;

interface LauncherProps {
  buttonText?: string;
  getPConnect: () => PConnect;
  testId?: string;
  actionId?: string;
}

/**
 * Launches a Pega local action in a modal dialog
 */
export function launchLocalAction(
  getPConnect: () => PConnect,
  assignmentID: string,
  action: ActionType,
  cb: LaunchCallback
): void {
  const actionsAPI = getPConnect().getActionsApi();
  const openLocalAction =
    actionsAPI && actionsAPI.openLocalAction.bind(actionsAPI);

    let caseID: string;

    if (!assignmentID.includes('!')) {
      caseID = assignmentID;
    } else {
      const [assignKey] = assignmentID.split('!');
      const [, className, workId] = assignKey.split(' ');
      caseID = `${className} ${workId}`;
    }

  openLocalAction(action.ID, {
    caseID,
    type: 'express',
    containerName: 'modal',
    name: action.name,
    callbacks: {
      submit: (response: unknown) => cb(response),
      cancel: () => cb()
    }
  });
}

const callback = (payload?: unknown): void => {
  console.log('Callback payload:', payload);
};

const MyCoMyComponentsMyLocalActionLauncher: React.FC<LauncherProps> = (props) => {
  const { getPConnect, buttonText, testId, actionId } = props;

  const availableActions: ActionType[] = getPConnect().getValue(
    PCore.getConstants().CASE_INFO.AVAILABLEACTIONS
  );

  const action = availableActions.filter(
    (act: ActionType) => act.ID === actionId
  );

  const assignmentId: string = getPConnect().getValue(
    PCore.getConstants().CASE_INFO.ASSIGNMENT_ID
  );

  const handleClick = (): void => {
    launchLocalAction(getPConnect, assignmentId, action[0], callback);
  };

  return (
    <>
      {action.length > 0 && assignmentId && (
        <Button variant="simple" onClick={handleClick} data-test-id={testId}>
          {buttonText}
        </Button>
      )}
    </>
  );
};

MyCoMyComponentsMyLocalActionLauncher.propTypes = {
  buttonText: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  testId: PropTypes.string,
  actionId: PropTypes.string
};

export default MyCoMyComponentsMyLocalActionLauncher;
