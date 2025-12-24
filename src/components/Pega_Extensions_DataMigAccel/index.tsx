import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withConfiguration, Button, EmptyState, Icon } from '@pega/cosmos-react-core';
import Autocomplete from './Autocomplete';
import Database from './Database';
import Stepper from './Stepper';
import type { PConnFieldProps } from './PConnProps';
import GlobalStyle from './styles';
import { fetchListDataPage } from './apiUtils';

const DashboardWrapper = styled.div`
  background: #ffffff;
  min-height: 100%;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial;
  font-size: 14px;
  color: #111827;
  padding: 16px;
`;

interface DashboardProps extends PConnFieldProps {
  value: string;
  dataBaseDataPage: string;
  caseTypesDataPage: string;
  schemaNamesDataPage: string;
  dataTypesDataPage: string;
}

type RowType = {
  id: number;
  type: string;
  targetProperty: string;
  sourceTable: string;
  joinCriteria: string;
};

function DataMigAccelComponent(props: DashboardProps) {
  const { getPConnect, value, dataBaseDataPage, caseTypesDataPage, schemaNamesDataPage, dataTypesDataPage } = props;

  const PConnect = getPConnect();
  const context = PConnect.getContextName();

  console.log(context, value);

  const mockFields = ['pyID', 'pyLabel', 'pyStatus'];
  const steps = ['DB', 'Map Fields', 'Review'];
  const migrationTypes = [
    {
      id: 'caseType',
      label: 'Case Type',
    },
    {
      id: 'dataType',
      label: 'Data Type',
    },
  ];

  const [flows, setFlows] = useState<RowType[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeRow, setActiveRow] = useState<RowType | null>(null);
  const [sourceTypes, setSourceTypes] = useState<string[]>([]);
  const [joinCriteria, setjoinCriteria] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Dropdown data states
  const [dataBases, setDatabases] = useState<any[]>([]);
  const [schemaNames, setschemaNames] = useState<any[]>([]);
  const [caseTypes, setcaseTypes] = useState<any[]>([]);
  const [dataTypes, setDataTypes] = useState<any[]>([]);

  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedMigrationType, setselectedMigrationType] = useState('');

  useEffect(() => {
    setSourceTypes(['root', 'page', 'list']);
    setjoinCriteria(['inner', 'left']);
  }, []);

  // Load data pages
  useEffect(() => {
    async function loadData() {
      try {
        const dataBases = await fetchListDataPage(dataBaseDataPage, context, {});
        setDatabases(dataBases?.data || []);
      } catch (err) {
        console.error('Error loading data pages:', err);
      }
    }

    loadData();
  }, [dataBaseDataPage, caseTypesDataPage, dataTypesDataPage, context]);

  useEffect(() => {
    if (!selectedMigrationType) return;

    async function loadData() {
      const dataPage =
        selectedMigrationType === 'caseType'
          ? caseTypesDataPage
          : dataTypesDataPage;

      const res = await fetchListDataPage(dataPage, context, {});
      if(selectedMigrationType === 'caseType') {
        setcaseTypes(res?.data || []);
      }

      if(selectedMigrationType === 'dataType') {
        setDataTypes(res?.data || []);
      }
    }
    loadData();
  }, [selectedMigrationType, context]);


  useEffect(() => {
    async function loadSchemaNames() {
      if (!selectedDatabase) {
        setschemaNames([]);
        return;
      }

      try {
        const schemaNamesResult = await fetchListDataPage(schemaNamesDataPage, context, {
          SourceDatabaseName: selectedDatabase,
          Scenario: 1,
        });
        setschemaNames(schemaNamesResult?.data || []);
      } catch (err) {
        console.error('Error loading schema names:', err);
        setschemaNames([]);
      }
    }

    loadSchemaNames();
  }, [selectedDatabase, schemaNamesDataPage, context]);

  useEffect(() => {
    async function loadSchemaNames() {
      if (!selectedDatabase) {
        setschemaNames([]);
        return;
      }

      try {
        const schemaNamesResult = await fetchListDataPage(schemaNamesDataPage, context, {
          SourceDatabaseName: selectedDatabase,
          Scenario: 1,
        });
        setschemaNames(schemaNamesResult?.data || []);
      } catch (err) {
        console.error('Error loading schema names:', err);
        setschemaNames([]);
      }
    }

    loadSchemaNames();
  }, [selectedDatabase, schemaNamesDataPage, context]);

  const addRow = () => {
    setFlows((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: '',
        targetProperty: '',
        sourceTable: '',
        joinCriteria: '',
      },
    ]);
  };

  const updateRow = (id: number, key: keyof RowType, value: string) => {
    setFlows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  };

  const deleteRow = (id: number) => {
    setFlows((prev) => prev.filter((r) => r.id !== id));
  };

  const openMapPopup = (row: RowType) => {
    setActiveRow(row);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setActiveRow(null);
  };

  // Selected values
  // const [selectedCaseType, setSelectedCaseType] = useState('');
  // const [selectedMode, setSelectedMode] = useState('');
  // const [selectedTarget, setSelectedTarget] = useState('');
  // const [selectedExtract, setSelectedExtract] = useState('');
  // const [treeData, setTreeData] = useState<any>(null);
  // const [dataBricksForm, setDataBricksForm] = useState<any>(null);
  // const [snowFlakeForm, setSnowFlakeForm] = useState<any>(null);

  // const [fileContent, setFileContent] = useState<any>(null);
  // const [uploadedTable, setUploadedTable] = useState<any>(null);
  // const [uploadedTableValues, setUploadedTableValues] = useState<Record<string, any>>({});
  // const [dataBricksValues, setDataBricksValues] = useState<Record<string, Record<string, string>>>({});
  // const [snowFlakeValues, setSnowFlakeValues] = useState<Record<string, Record<string, string>>>({});

  const submit = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleFinalSubmit = () => {
    // Add your final submission logic here
    console.log('Final submission');
    // Example: PConnect.getActionsApi().finishAssignment();
  };

  return (
    <DashboardWrapper>
      <GlobalStyle />
      <div style={{ marginTop: '16px' }} className='wrap'>
        <h3 style={{ marginBottom: '10px' }}> Data Migration</h3>
        <div>
          {<Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />}

          {activeStep === 0 && (
            <>
              <div style={{ width: '80%', marginTop: '20px' }}>
                <Database
                  dataBases={dataBases}
                  migrationTypes={migrationTypes}
                  caseTypes={caseTypes}
                  schemaNames={schemaNames}
                  dataTypes={dataTypes}
                  selectedDatabase={selectedDatabase}
                  setSelectedDatabase={setSelectedDatabase}
                  selectedMigrationType={selectedMigrationType}
                  setselectedMigrationType={setselectedMigrationType}
                  onSubmit={submit}
                />
              </div>
            </>
          )}

          {activeStep === 1 && flows.length === 0 && (
            <>
              <EmptyState style={{ marginTop: '12px', marginBottom: '12px' }} />
              <Button compact={true} onClick={addRow}>
                Add Flow
              </Button>
            </>
          )}

          {activeStep === 1 && flows.length !== 0 && (
            <>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginTop: '12px',
                  marginBottom: '12px',
                }}
              >
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Target Property</th>
                    <th>Source Table</th>
                    <th>Join Criteria</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <select value={row.type} onChange={(e) => updateRow(row.id, 'type', e.target.value)}>
                          <option value=''>Select</option>
                          {sourceTypes.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <Autocomplete
                          options={mockFields}
                          onSelect={(val) => updateRow(row.id, 'targetProperty', val)}
                        />
                      </td>

                      <td>
                        <Autocomplete options={mockFields} onSelect={(val) => updateRow(row.id, 'sourceTable', val)} />
                      </td>

                      <td>
                        <select
                          value={row.joinCriteria}
                          onChange={(e) => updateRow(row.id, 'joinCriteria', e.target.value)}
                        >
                          <option value=''>Select</option>
                          {joinCriteria.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <Button icon onClick={() => openMapPopup(row)}>
                          <Icon name='eye' />
                        </Button>
                        <Button icon style={{ marginLeft: 8 }} onClick={() => deleteRow(row.id)}>
                          <Icon name='trash' />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button compact={true} onClick={addRow}>
                Add Flow
              </Button>
              <br />
              <Button onClick={() => submit()}> Next </Button>
            </>
          )}
          {showPopup && activeRow && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  background: '#fff',
                  padding: 20,
                  width: 400,
                  borderRadius: 8,
                }}
              >
                <h4>Mapping Details</h4>
                <button onClick={closePopup}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
}

export default withConfiguration(DataMigAccelComponent);
