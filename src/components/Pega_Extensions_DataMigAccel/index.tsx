import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withConfiguration } from '@pega/cosmos-react-core';
import Database from './Database';
import Mapping from './Mapping';
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
  caseTypesPropsDataPage: string;
  schemaNamesDataPage: string;
  tableNamesDataPage: string;
  tableDetailsDataPage: string;
  dataTypesDataPage: string;
}

function DataMigAccelComponent(props: DashboardProps) {
  const { getPConnect, value, dataBaseDataPage, caseTypesDataPage, tableNamesDataPage, tableDetailsDataPage, caseTypesPropsDataPage, schemaNamesDataPage, dataTypesDataPage } = props;

  const PConnect = getPConnect();
  const context = PConnect.getContextName();

  console.log(context, value);

  const steps = ['DB', 'Map Fields', 'Review'];
  const migrationTypes = [
    {
      id: 'caseType',
      label: 'Case Type',
    },
    {
      id: 'dataType',
      label: 'Data Type',
    }
  ];


  // Dropdown data states
  const [dataBases, setDatabases] = useState<any[]>([]);
  const [schemaNames, setschemaNames] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [caseTypes, setcaseTypes] = useState<any[]>([]);
  const [dataTypes, setDataTypes] = useState<any[]>([]);
  const [caseTypeProperties, setCaseTypeProperties] = useState<any[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const [sourceTypes, setSourceTypes] = useState<string[]>([]);
  const [joinCriteria, setjoinCriteria] = useState<string[]>([]);

  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedMigrationType, setselectedMigrationType] = useState('');
  const [schemaName, setschemaName] = useState('');
  const [selectedCaseType, setselectedCaseType] = useState('');

  useEffect(() => {
    setSourceTypes(['primary', 'page', 'page list']);
    setjoinCriteria(['inner', 'left']);

    setSelectedDatabase('CustomerData');
    setselectedMigrationType('caseType');
    setschemaName('dummy');
    setselectedCaseType('BIG-GDM-Work-DataMigration');

  },[]);

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
          dataViewParameters : {
            SourceDatabaseName: selectedDatabase,
            Scenario: 1
          }
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
    async function loadTables() {
      if (!schemaName) {
        setTables([]);
        return;
      }
      try {
        const res = await fetchListDataPage(tableNamesDataPage, context, {
          dataViewParameters : {
            Scenario: 2,
            SourceSchemaName: schemaName,
            SourceDatabaseName: selectedDatabase
          }
        });
        setTables(res?.data || []);
      } catch (err) {
        console.error('Error loading schema names:', err);
        setTables([]);
      }
    }
    loadTables();
  }, [selectedDatabase, tableNamesDataPage, schemaName,context]);

  useEffect(() => {
    async function loadCaseTypeProperties() {
      if (!selectedCaseType) {
        setCaseTypeProperties([]);
        return;
      }
      try {
        const res = await fetchListDataPage(caseTypesPropsDataPage, context, {
          dataViewParameters : {
            CaseType: selectedCaseType,
          }
        });
        const cleaned = res?.data.map(item => {
          const result = {
            pyPropertyName: item.pyPropertyName
          };

          if (Array.isArray(item.ChildProperties)) {
            result.ChildProperties = item.ChildProperties.map(child => ({
              pyPropertyName: child.pyPropertyName
            }));
          }

          return result;
        });

        setCaseTypeProperties();
      } catch (err) {
        console.error('Error loading schema names:', err);
        setCaseTypeProperties([]);
      }
    }
    loadCaseTypeProperties();
  }, [caseTypesPropsDataPage, selectedCaseType, context]);


  const submit = () => {
    setActiveStep((prev) => prev + 1);
  };

  // const handleFinalSubmit = () => {
  //   console.log('Final submission');
  // };

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

                  selectedCaseType={selectedCaseType}
                  setselectedCaseType={setselectedCaseType}

                  schemaName={schemaName}
                  setschemaName={setschemaName}

                  selectedDatabase={selectedDatabase}
                  setSelectedDatabase={setSelectedDatabase}

                  selectedMigrationType={selectedMigrationType}
                  setselectedMigrationType={setselectedMigrationType}

                  onSubmit={submit}
                />
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Mapping
                context={context}
                tableDetailsDataPage={tableDetailsDataPage}
                selectedMigrationType={selectedMigrationType}
                activeStep={activeStep}
                sourceTypes={sourceTypes}
                joinCriteria={joinCriteria}
                tables={tables}

                schemaName={schemaName}
                selectedDatabase={selectedDatabase}

                caseTypeProperties={caseTypeProperties}
              />
            </>
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
}

export default withConfiguration(DataMigAccelComponent);
