import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withConfiguration } from '@pega/cosmos-react-core';
import { Button } from '@pega/cosmos-react-core';
import Database from './Database';
import Mapping from './Mapping';
import TableMapping from './TableMapping';
import Stepper from './Stepper';
import type { PConnFieldProps } from './PConnProps';
import GlobalStyle from './styles';
import { fetchListDataPage } from './apiUtils';
import type { RowType, MappingRow } from './types';

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
  finalSubmissionDataPage: string;
}

function DataMigAccelComponent(props: DashboardProps) {
  const { getPConnect, dataBaseDataPage, caseTypesDataPage, tableNamesDataPage, tableDetailsDataPage, caseTypesPropsDataPage, schemaNamesDataPage, dataTypesDataPage, finalSubmissionDataPage } = props;

  const PConnect = getPConnect();
  const context = PConnect.getContextName();
  const [flowData, setFlowData] = useState<RowType[]>([]);
  const steps = ['DB', 'Map Tables for Join', 'Map Fields', 'Review'];
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
  const [sourceTypes, setSourceTypes] = useState<any[]>([]);
  const [joinCriteria, setjoinCriteria] = useState<string[]>([]);

  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedMigrationType, setselectedMigrationType] = useState('');
  const [schemaName, setschemaName] = useState('');
  const [selectedCaseType, setselectedCaseType] = useState('');

  const [primaryTable, setprimaryTable] = useState('');
  const [primaryColumnKey, setprimaryColumnKey] = useState('');

  const [columns, setColumns] = useState<any[]>([]);

  const [tableMappings, setTableMappings] = useState<MappingRow[]>([]);

  useEffect(() => {
    setFlowData([{
      id: crypto.randomUUID(),
      type: 'primary',
      targetProperty: '',
      targetPropertyClass: '',
      targetPropertyChilds: [],
      sourceTableName: '',
      sourceTableColumns: [],
      mappings: []
    }]);

    setTableMappings([{
      id: crypto.randomUUID(),
      sourceTable: '',
      sourceColumn: '',
      targetTable: '',
      join: '',
      targetColumn: '',
      sourceColumns: [],
      targetColumns: []
    }]);

  }, []);

  useEffect(() => {
    setSourceTypes([{label : 'Page', value: 'page'}, { label : 'Page list', value: 'pageList'}]);
    setjoinCriteria(['inner', 'left']);

    // for testing
    // setprimaryTable('employees');
    // setprimaryColumnKey('id');
    // setSelectedDatabase('CustomerData');
    // setselectedMigrationType('caseType');
    // setschemaName('dummy');
    // setselectedCaseType('BIG-GDM-Work-DataMigration');
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
  }, [dataBaseDataPage, context]);

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
    setprimaryTable('');
    setprimaryColumnKey('');
    setColumns([]);
  }, [selectedDatabase, schemaName]);

  useEffect(() => {
    setcaseTypes([]);
    setDataTypes([]);
  }, [selectedMigrationType]);

  useEffect(() => {
    if (!selectedDatabase || !schemaName || !primaryTable) {
      setColumns([]);
      return;
    }
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
        setColumns(columns);
      } catch (e) {
        console.log(e);
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
    if (!selectedCaseType) {
      setCaseTypeProperties([]);
      return;
    }
    async function loadCaseTypeProperties() {
      try {
        const res = await fetchListDataPage(caseTypesPropsDataPage, context, {
          dataViewParameters : {
            CaseType: selectedCaseType,
          }
        });
        const cleaned = (res?.data ?? []).map(item => {
          const result: {
            pyPageClass: string;
            pyPropertyName: string;
            pyPropertyMode: string;
            ChildProperties?: { pyPropertyName: string }[];
          } = {
            pyPageClass: item.pyPageClass,
            pyPropertyMode: item.pyPropertyMode,
            pyPropertyName: item.pyPropertyName
          };

          if (Array.isArray(item.ChildProperties)) {
            result.ChildProperties = item.ChildProperties.map((child : any) => ({
              pyPropertyName: child.pyPropertyName,
              pyPropertyMode: child.pyPropertyMode
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
    setActiveStep((prev) => prev + 1);
    setFlowData(flows);
  };

  const tableMappingSubmit = () => {
    setActiveStep((prev) => prev + 1);
    // setFlowData(flows);
  };

  const preparePayloadForSubmit = ({
    primaryTable,
    primaryColumnKey,
    tableMappings,
    flowData,
    schemaName
  }: any) => ({
    primarySourceDetails: {
      primaryTable : primaryTable
        ? `${schemaName}.${primaryTable}`
        : '',
      primaryColumnKey
    },

    dbJoinMappings: tableMappings.map((m: any) => {
      const copy = { ...m };
      delete copy.id;
      delete copy.sourceColumns;
      delete copy.targetColumns;
      copy.sourceTable = copy.sourceTable
        ? `${schemaName}.${copy.sourceTable}`
        : '';
        copy.targetTable = copy.targetTable
          ? `${schemaName}.${copy.targetTable}`
          : '';
      return copy;
    }),

    flows: flowData.map((f: any) => {
      const flowCopy = { ...f };
      delete flowCopy.id;
      delete flowCopy.sourceTableColumns;
      delete flowCopy.targetPropertyChilds;

      if (flowCopy.type === 'primary') {
        delete flowCopy.targetPropertyClass;
      }

      return {
        ...flowCopy,
        sourceTableName: f.sourceTableName
          ? `${schemaName}.${f.sourceTableName}`
          : '',
        mappings: f.mappings.map((mp: any) => {
          const mappingCopy = { ...mp };
          mappingCopy.sourceTableName = mappingCopy.sourceTableName
            ? `${schemaName}.${mappingCopy.sourceTableName}`
            : ''
          delete mappingCopy.id;
          delete mappingCopy.sourceTableColumns;
          return mappingCopy;
        })
      };
    })
  });

  const handleSubmit = async () => {
    const finalObj = preparePayloadForSubmit({
      primaryTable,
      primaryColumnKey,
      tableMappings,
      flowData,
      schemaName
    });

    try {
      const res = await PCore.getRestClient().invokeRestApi('createDataObject', {
        queryPayload: {
          data_view_ID: finalSubmissionDataPage
        },
        body: {
          data : {
            MappingJsonData: JSON.stringify(finalObj),
            MappingStatus: "new",
            ClassName: selectedCaseType,
            MigrationType: selectedMigrationType
          }
        }
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // const handleFinalSubmit = async () => {
  //   console.log('Final submission');
  //   try {
  //     const finalObj = preparePayloadForSubmit({
  //       primaryTable,
  //       primaryColumnKey,
  //       tableMappings,
  //       flowData
  //     });
  //     const res = await fetchPageDataPage(finalSubmissionDataPage, context, {
  //       dataViewParameters : {
  //         JSONMappng: finalObj,
  //       }
  //     });
  //     console.log(res);
  //   } catch (err) {
  //     console.error('Error loading data pages:', err);
  //   }
  // };

  return (
    <DashboardWrapper>
      <GlobalStyle />
      <div style={{ marginTop: '16px' }} className='wrap'>
        <h3 style={{ marginBottom: '10px' }}> Data Migration</h3>
        <div>
          {<Stepper steps={steps} activeStep={activeStep} />}

          { activeStep === 0 && (
            <>
              <div style={{ width: '80%', marginTop: '20px',  marginLeft: 'auto', marginRight: 'auto' }}>
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
              <div style={{ width: '80%', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                <TableMapping
                  rows={tableMappings}
                  setRows={setTableMappings}
                  context={context}
                  setBack={setBack}
                  tables={tables}
                  tableDetailsDataPage={tableDetailsDataPage}
                  SourceSchemaName={schemaName}
                  SourceDatabaseName={selectedDatabase}
                  onSubmit={tableMappingSubmit}
                />
              </div>
            </>
          )}

          { activeStep === 2 && (
            <>
              <div style={{ width: '80%', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Mapping
                context={context}
                tableDetailsDataPage={tableDetailsDataPage}
                selectedMigrationType={selectedMigrationType}
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
              </div>
            </>
          )}

          { activeStep === 3 && (
            <>
              <div style={{ width: '80%', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="json-box">
                  <pre>
                    {JSON.stringify(
                      preparePayloadForSubmit({
                        primaryTable,
                        primaryColumnKey,
                        tableMappings,
                        flowData,
                        schemaName
                      }),
                      null,
                      2
                    )}
                  </pre>
                </div>

                <Button type="button" onClick={setBack}>
                  Back
                </Button>

                { /* <Button variant="primary" onClick={handleFinalSubmit}>
                  Submit
                </Button> */ }

                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>

              </div>
            </>
          )}

        </div>
      </div>
    </DashboardWrapper>
  );
}

export default withConfiguration(DataMigAccelComponent);
