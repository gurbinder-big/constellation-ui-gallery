import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withConfiguration } from '@pega/cosmos-react-core';
import { Button } from '@pega/cosmos-react-core';
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

//mapping
type MappingType = {
  id: string;
  targetProperty: string;
  sourceTableName: string;
  sourceProperty: string;
  joinType: string;
};

//flow
type RowType = {
  id: string;
  type: string;
  targetProperty: string;
  targetPropertyChilds: Record<string, any>[];
  sourceTableName: string;
  sourceTableColumns: string[];
  mappings: MappingType[];
};

function DataMigAccelComponent(props: DashboardProps) {
  const { getPConnect, dataBaseDataPage, caseTypesDataPage, tableNamesDataPage, tableDetailsDataPage, caseTypesPropsDataPage, schemaNamesDataPage, dataTypesDataPage } = props;

  const PConnect = getPConnect();
  const context = PConnect.getContextName();
  const [flowData, setFlowData] = useState<RowType[]>([]);

  useEffect(() => {
    setFlowData([{
      id: crypto.randomUUID(),
      type: 'primary',
      targetProperty: '',
      targetPropertyChilds: [],
      sourceTableName: '',
      sourceTableColumns: [],
      mappings: []
    }]);
  }, []);

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

  const [primaryTable, setprimaryTable] = useState('');
  const [primaryColumnKey, setprimaryColumnKey] = useState('');

  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    setSourceTypes(['page', 'page list']);
    setjoinCriteria(['inner', 'left']);

    // for testing

    setprimaryTable('employees');
    setprimaryColumnKey('id');
    setSelectedDatabase('CustomerData');
    setselectedMigrationType('caseType');
    setschemaName('dummy');
    setselectedCaseType('BIG-GDM-Work-DataMigration');
  },[]);

  // loading data pages
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
    async function fetchTableColumns() {
      try {
        const res = await fetchListDataPage(tableDetailsDataPage, context, {
          dataViewParameters : {
            Scenario: 3,
            SourceSchemaName: schemaName,
            SourceDatabaseName: selectedDatabase,
            SourceTableName: primaryTable
          }
        });
        const columns = (res?.data || []).map((c: any) => c.column_name);
        setColumns(rcolumns);
      } catch (error) {
        setColumns([]);
      }
    }
    fetchTableColumns();
  }, [tableDetailsDataPage, selectedDatabase, primaryTable, schemaName, context]);

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
        const cleaned = (res?.data ?? []).map(item => {
          const result: {
            pyPropertyName: string;
            ChildProperties?: { pyPropertyName: string }[];
          } = {
            pyPropertyName: item.pyPropertyName
          };

          if (Array.isArray(item.ChildProperties)) {
            result.ChildProperties = item.ChildProperties.map((child : any) => ({
              pyPropertyName: child.pyPropertyName
            }));
          }

          return result;
        });

        setCaseTypeProperties(cleaned);
      } catch (err) {
        console.error('Error loading schema names:', err);
        setCaseTypeProperties([]);
      }
    }
    loadCaseTypeProperties();
  }, [caseTypesPropsDataPage, selectedCaseType, context]);


  const setBack = () => {
    setActiveStep((prev) => prev - 1);
  }

  const submit = () => {
    setActiveStep((prev) => prev + 1);
  };

  const mappingSubmit = (flows: RowType[]) => {
    console.log('in index');
    setActiveStep((prev) => prev + 1);
    setFlowData(flows);
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

          { activeStep === 0 && (
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

                  tables={tables}
                  primaryTableColumns={columns}

                   primaryColumnKey={primaryColumnKey}
                   setprimaryColumnKey={setprimaryColumnKey}

                   primaryTable={primaryTable}
                   setprimaryTable={setprimaryTable}

                  onSubmit={submit}
                />
              </div>
            </>
          )}

          { activeStep === 1 && (
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

                flowData={flowData}
                setFlowData={setFlowData}
                onSubmit={mappingSubmit}
                setBack={setBack}
              />
            </>
          )}

          { activeStep === 2 && (
            <>
              <div className="json-box">
                <pre>{JSON.stringify(flowData, null, 2)}</pre>
              </div>
              <Button onClick={setBack}> Back </Button>
              <Button variant="primary"> Submit </Button>
            </>
          )}

        </div>
      </div>
    </DashboardWrapper>
  );
}

export default withConfiguration(DataMigAccelComponent);
