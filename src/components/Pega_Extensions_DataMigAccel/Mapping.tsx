import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, EmptyState, Icon } from '@pega/cosmos-react-core';
import Autocomplete from './Autocomplete';
import { fetchListDataPage } from './apiUtils';

const Form = styled.form`
  width: 100%;
`;

// component
type MappingProps = {
  context: any;
  activeStep: number;
  tableDetailsDataPage: string;
  selectedMigrationType: string;
  schemaName: string;
  selectedDatabase: string;
  caseTypeProperties: string[];
  tables: Record<string, any>[];
  sourceTypes: string[];
  joinCriteria: string[];
  onSubmit?: () => void;
};

//flow
type RowType = {
  id: number;
  type: string;
  targetProperty: string;
  sourceTableName: string;
  sourceTableColumns: string[];
  mappings: Record<string, any>[];
};

//mapping
type MappingType = {
  id: number;
  targetProperty: string;
  sourceTableName: string;
  sourceProperty: string;
  joinType: string;
};


const Mapping = (props: MappingProps) => {
  const {
    activeStep,
    context,
    tables,
    schemaName,
    selectedDatabase,
    tableDetailsDataPage,
    selectedMigrationType,
    caseTypeProperties,
    sourceTypes,
    joinCriteria
  } = props;

  console.log(tables);
  console.log(joinCriteria);


  const [flows, setFlows] = useState<RowType[]>([]);
  const [showJson, setshowJson] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeRow, setActiveRow] = useState<RowType | null>(null);
  const mockFields = ['pyID', 'pyLabel', 'pyStatus'];

  useEffect(() => {
    setFlows([{
      id: Date.now(),
      type: 'primary',
      targetProperty: '',
      sourceTableName: '',
      sourceTableColumns: [],
      mappings: []
    }]);
  }, []);

  useEffect(() => {
  }, []);

  const addRow = () => {
    setFlows((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: '',
        targetProperty: '',
        sourceTableName: '',
        sourceTableColumns: [],
        mappings: []
      },
    ]);
  };

  const updateRow = (id: number, key: string, value: string) => {
    setFlows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  };

  const deleteRow = (id: number) => {
    setFlows((prev) => {
      const row = prev.find((r) => r.id === id);
      if (row?.type === 'primary') return prev;
      return prev.filter((r) => r.id !== id);
    });
  };

  const openMapPopup = (row: RowType) => {
    setActiveRow(row);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setActiveRow(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (formRef.current?.checkValidity()) {
    //   onSubmit?.();
    // } else {
    //   formRef.current?.reportValidity();
    // }
  };

  const hasPrimary = flows.some((r) => r.type === 'primary');
  const currentRow = flows.find(r => r.id === activeRow?.id);

  const updateMappingField = (
    rowId: number,
    mappingId: number,
    field: keyof MappingType,
    value: string
  ) => {
    setFlows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              mappings: row.mappings.map((m) =>
                m.id === mappingId ? { ...m, [field]: value } : m
              ),
            }
          : row
      )
    );
  };

  const addCaseTypeMapping = (rowId: number) => {
    setFlows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              mappings: [
                ...row.mappings,
                {
                  id: Date.now(),
                  targetProperty: '',
                  sourceTableName: '',
                  sourceProperty: '',
                  joinType: '',
                },
              ],
            }
          : row
      )
    );
  };

  const deleteMapping = (rowId: number, mappingId: number) => {
    setFlows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              mappings: row.mappings.filter((m) => m.id !== mappingId),
            }
          : row
      )
    );
  };


  const test = () => {
    setshowJson((prev) => !prev);
  }

  const fetchTableColumns = async (table: any) => {
    const res = await fetchListDataPage(tableDetailsDataPage, context, {
      dataViewParameters : {
        Scenario: 3,
        SourceSchemaName: schemaName,
        SourceDatabaseName: selectedDatabase,
        SourceTableName: table
      }
    });
    return res;
  }

  const handleSourceTableChange = async (rowId: number, column: string, value: string) => {
    await updateRow(rowId, column, value);
    const res = await fetchTableColumns(value);
    const columns = (res?.data || []).map((c: any) => c.column_name);
    console.log(columns);

    setFlows(prev =>
      prev.map(r =>
        r.id === rowId
          ? { ...r, sourceTableColumns: columns }
          : r
      )
    );
  };

  return (
    <>
      {activeStep === 1 && flows.length === 0 && (
        <>
          <EmptyState style={{ marginTop: '12px', marginBottom: '12px' }} />
          <Button compact={true} onClick={addRow}>
            Add Flow
          </Button>
        </>
      )}

      <Form id='database-form' onSubmit={handleSubmit}>
        <div style={{ marginTop: '16px' }}>
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
                <th>Source Table</th>
                <th>Target Property</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {flows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <select value={row.type} onChange={(e) => updateRow(row.id, 'type', e.target.value)} disabled={row.type === 'primary'}>
                      <option value=''>Select</option>
                      {sourceTypes.map((t) => (
                        <option key={t} value={t} disabled={t === 'primary' && row.type !== 'primary' && hasPrimary}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select value={row.sourceTableName} onChange={(e) => handleSourceTableChange(row.id, 'sourceTableName', e.target.value)}>
                      <option value=''>Select</option>
                      {tables.map((t) => (
                        <option key={t.table_name} value={t.table_name}>
                          {t.table_name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    {
                      row.type !== 'primary' &&
                      <Autocomplete
                        disabled={row.type === 'primary'}
                        options={caseTypeProperties}
                        onSelect={(val) => updateRow(row.id, 'targetProperty', val)}
                      />
                    }
                  </td>

                  <td>
                    <Button icon onClick={() => openMapPopup(row)}>
                      <Icon name='eye' />
                    </Button>
                    <Button icon style={{ marginLeft: 8 }} onClick={() => deleteRow(row.id)} disabled={row.type === 'primary'}>
                      <Icon name='trash' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          { /* caseType & primary starts */ }
          { showPopup &&
           currentRow &&
           selectedMigrationType === 'caseType' &&
           currentRow.type === 'primary' && (

            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '9999'
              }}
            >
              <div
                style={{
                  background: '#fff',
                  padding: 20,
                  width: 800,
                  borderRadius: 8,
                }}
              >
                <h4>Source Mapping</h4>

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
                      <th>Target Property</th>
                      <th>Source Table Name</th>
                      <th>Source Property</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentRow.mappings.map((mapping) => (
                      <tr key={mapping.id}>
                        <td>
                          <select value={row.targetProperty} onChange={(e) => updateMappingField(currentRow.id, mapping.id, 'targetProperty', val)}>
                            <option value=''>Select</option>
                            { mockFields.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td>
                          {
                            <input value={currentRow.sourceTableName} disabled />
                          }
                        </td>

                        <td>
                          {
                            <Autocomplete
                              options={currentRow.sourceTableColumns}
                              onSelect={(val) => updateMappingField(currentRow.id, mapping.id, 'sourceProperty', val)}
                            />
                          }
                        </td>

                        <td>
                          <Button icon style={{ marginLeft: 8 }} onClick={() => deleteMapping(currentRow.id, mapping.id)}>
                            <Icon name='trash' />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Button
                  primary
                  compact
                  onClick={() => addCaseTypeMapping(currentRow.id)}
                >
                  Add Mapping
                </Button>

                <Button
                  primary
                  compact
                  onClick={() => test()}
                >
                  Show Json
                </Button>


                <Button compact={true} onClick={closePopup}>
                  Close
                </Button>

                {showJson && (
                  <pre>{JSON.stringify(flows, null, 2)}</pre>
                )}

              </div>
            </div>
          )}
          { /* caseType & primary end */ }

          <Button compact={true} onClick={addRow}>
            Add Flow
          </Button>

          <br/>

          <Button type='submit'>Next</Button>
        </div>
      </Form>
    </>
  );
};

export default Mapping;
