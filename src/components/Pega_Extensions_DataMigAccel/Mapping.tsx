import { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Button, EmptyState, Icon, registerIcon } from '@pega/cosmos-react-core';
import { fetchListDataPage } from './apiUtils';
import type { RowType, MappingType, MappingProps } from "./types";

import * as eyeIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/eye.icon';
import * as trashIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/trash.icon';

registerIcon(trashIcon, eyeIcon);

const Form = styled.form`
  width: 100%;
`;

const Popup = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const PopupInner = styled.div`
  background: #fff;
  padding: 20px;
  width: 800px;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
    border: 1px solid #dee2e6;
  }

  th {
    background: #f8f9fa;
    text-align: left;
  }

  select {
    width: 100%;
  }
`;

const Mapping = (props: MappingProps) => {
  const {
    context,
    tables,
    schemaName,
    selectedDatabase,
    tableDetailsDataPage,
    selectedMigrationType,
    caseTypeProperties,
    sourceTypes,
    onSubmit,
    flowData,
    setFlowData,
    setBack
  } = props;

  // const [showJson, setshowJson] = useState(false);
  // const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeRow, setActiveRow] = useState<RowType | null>(null);

  const [isPrimary, setIsPrimary] = useState(false);
  const flowformRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log('flowData after render:', flowData);
  }, [flowData]);

  const addRow = () => {
    setFlowData([
      ...flowData,
      {
        id: crypto.randomUUID(),
        type: '',
        targetProperty: '',
        targetPropertyChilds: [],
        sourceTableName: '',
        sourceTableColumns: [],
        mappings: []
      }
    ]);
  };

  const updateRowWithChild = (id: string, key: string, value: string) => {
    const childProps = propertyNodeMap[value]?.ChildProperties ?? [];
    setFlowData((prev: RowType[]) => {
      const updated = prev.map((r: RowType) =>
        r.id === id
          ? {
              ...r,
              [key]: value,
              targetPropertyChilds: childProps
            }
          : r
      );
      return updated;
    });
  }

  // const updateRow = (id: number, key: string, value: string) => {
  //   setFlowData((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  // };

  const updateRow = (id: string, key: string, value: string) => {
    setFlowData( (prev : RowType[]) =>
      prev.map((r : RowType) => r.id === id ? { ...r, [key]: value } : r)
    );
  };

  const deleteRow = (id: string) => {
    setFlowData(flowData.filter(r => !(r.id === id && r.type !== 'primary')));
  };

  const openMapPopup = (row: RowType) => {
    if (!row.sourceTableName) {
      alert('Please select Source Table first');
      return;
    }
    setActiveRow(row);
    setIsPrimary(row.type === 'primary');
    setShowPopup(true);
  };

  const closePopup = () => {
    if (hasErrors) return;
    setShowPopup(false);
    setActiveRow(null);
  };

  const hasPrimary = flowData.some((r) => r.type === 'primary');
  const currentRow = flowData.find(r => r.id === activeRow?.id);
  const targetOptions = isPrimary
    ? caseTypeProperties
    : currentRow?.targetPropertyChilds ?? [];

  const updateMappingField = (rowId : string, mappingId : string, field : string, value : string) => {
    setFlowData( (prev : RowType[]) =>
      prev.map((row: RowType) =>
        row.id === rowId
          ? {
              ...row,
              mappings: row.mappings.map((m: MappingType) =>
                m.id === mappingId ? { ...m, [field]: value } : m
              )
            }
          : row
      )
    );
  };

  const addCaseTypeMapping = (rowId: string) => {
    setFlowData((prev: RowType[]) =>
      prev.map((row : RowType) =>
        row.id === rowId
          ? {
              ...row,
              mappings: [
                ...row.mappings,
                {
                  id: crypto.randomUUID(),
                  targetProperty: '',
                  sourceTableName: row.sourceTableName,
                  sourceProperty: ''
                },
              ],
            }
          : row
      )
    );
  };

  const deleteMapping = (rowId: string, mappingId: string) => {
    setFlowData((prev : RowType[]) =>
      prev.map((row : RowType) =>
        row.id === rowId
          ? {
              ...row,
              mappings: row.mappings.filter((m) => m.id !== mappingId)
            }
          : row
      )
    );
  };


  // const logJson = () => {
  //   setshowJson((prev) => !prev);
  // }
  //
  // const test = () => {
  //   setshowJson((prev) => !prev);
  // }

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

  const handleSourceTableChange = async (rowId: string, column: string, value: string) => {
    if (!value) return;

    updateRow(rowId, column, value);
    const res = await fetchTableColumns(value);
    const columns = (res?.data || []).map((c: any) => c.column_name);

    setFlowData((prev : RowType[]) =>
      prev.map((r : RowType) =>
        r.id === rowId
          ? { ...r, sourceTableColumns: columns }
          : r
      )
    );
  };

  const propertyNodeMap = useMemo(() => {
    const buildNodeMap = (
      nodes: any[] = [],
      map: Record<string, any> = {}
    ) => {
      nodes.forEach(node => {
        map[node.pyPropertyName] = node;
      });
      return map;
    };
    return buildNodeMap(caseTypeProperties);
  }, [caseTypeProperties]);

  const getIncompleteMappings = (mappings: any[]) => {
    return mappings.filter(m =>
      !m.sourceProperty ||
      !m.targetProperty ||
      m.sourceProperty.trim() === '' ||
      m.targetProperty.trim() === ''
    );
  };

  const incompleteMappings = currentRow
    ? getIncompleteMappings(currentRow.mappings)
    : [];

  const hasErrors = incompleteMappings.length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setSubmitted(true);
    if (flowformRef.current?.checkValidity()) {
      onSubmit?.(flowData);
    } else {
      console.log('here');
      flowformRef.current?.reportValidity();
    }
  };

  return (
    <>
      {flowData.length === 0 && (
        <>
          <EmptyState style={{ marginTop: '12px', marginBottom: '12px' }} />
          <Button compact={true} onClick={addRow}>
            Add Flow
          </Button>
        </>
      )}

      {
        flowData.length !== 0 &&
        <Form id='flow-form' ref={flowformRef} onSubmit={handleSubmit}>
          <div style={{ marginTop: '16px' }}>
            <Table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Source Table</th>
                  <th>Target Property</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flowData.map((row) => (
                  <tr key={row.id}>
                    <td>
                    {
                      row.type === 'primary' &&
                      <p>Primary</p>
                    }
                    {
                      row.type !== 'primary' &&
                      <select name='flowType' value={row.type} onChange={(e) => updateRow(row.id, 'type', e.target.value)}>
                        <option value=''>Select</option>
                        {sourceTypes.map((t) => (
                          <option key={t} value={t} disabled={t === 'primary' && row.type !== 'primary' && hasPrimary}>
                            {t}
                          </option>
                        ))}
                      </select>
                    }
                    </td>

                    <td>
                      <select name='flowSourceTable' required value={row.sourceTableName} onChange={(e) => handleSourceTableChange(row.id, 'sourceTableName', e.target.value)}>
                        <option value=''>Select</option>
                        {tables.map((t) => (
                          <option key={t.table_name} value={t.table_name}>
                            {t.table_name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      {row.type !== 'primary' && (
                        <select
                          name='flowtargetProperty'
                          required
                          value={row.targetProperty}
                          onChange={(e) =>
                            updateRowWithChild(
                              row.id,
                              'targetProperty',
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select</option>
                          {caseTypeProperties.map((t: any) => (
                            <option key={t.pyPropertyName} value={t.pyPropertyName}>
                              { t.pyPropertyName }
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    <td>
                      <Button onClick={() => openMapPopup(row)}>
                        Mappings
                      </Button>
                      <Button icon style={{ marginLeft: 8 }} onClick={() => deleteRow(row.id)} disabled={row.type === 'primary'}>
                        <Icon name='trash' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            { /* popup */ }

              { showPopup && currentRow && selectedMigrationType === 'caseType' && (
                <Popup>
                  <PopupInner>
                    <h4 style={{ marginTop: 12, marginBottom: 12 }}>
                      Source Mapping
                    </h4>

                    { currentRow.mappings.length === 0 ? (
                      <>
                        <EmptyState style={{ marginTop: 12, marginBottom: 12 }} />
                        <Button variant="primary" onClick={() => addCaseTypeMapping(currentRow.id)}>
                          Add Mapping
                        </Button>
                        <Button variant="secondary" onClick={closePopup}>
                          Close
                        </Button>
                      </>
                    ) : (
                      <>
                        <Table>
                          <thead>
                            <tr>
                              <th>Source Table Name</th>
                              <th>Source Property</th>
                              <th>Target Property</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            { currentRow.mappings.map((mapping : MappingType) => (
                              <tr key={mapping.id}>
                                <td>
                                  <select
                                    className={!mapping.sourceTableName ? 'invalid' : ''}
                                    value={mapping.sourceTableName}
                                    onChange={e =>
                                      updateMappingField(
                                        currentRow.id,
                                        mapping.id,
                                        'sourceTableName',
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select</option>
                                    { tables.map(t => (
                                      <option key={t.table_name} value={t.table_name}>
                                        { t.table_name }
                                      </option>
                                    ))}
                                  </select>

                                </td>

                                <td>
                                  <select
                                    className={!mapping.sourceProperty ? 'invalid' : ''}
                                    value={mapping.sourceProperty}
                                    onChange={e =>
                                      updateMappingField(
                                        currentRow.id,
                                        mapping.id,
                                        'sourceProperty',
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select</option>
                                    {currentRow.sourceTableColumns.map(t => (
                                      <option key={t} value={t}>
                                        {t}
                                      </option>
                                    ))}
                                  </select>
                                </td>

                                <td>
                                  <select
                                    className={!mapping.targetProperty ? 'invalid' : ''}
                                    value={mapping.targetProperty}
                                    onChange={e =>
                                      updateMappingField(
                                        currentRow.id,
                                        mapping.id,
                                        'targetProperty',
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select</option>
                                    {targetOptions.map((t : any) => (
                                      <option key={t.pyPropertyName} value={t.pyPropertyName}>
                                        {t.pyPropertyName}
                                      </option>
                                    ))}
                                  </select>
                                </td>

                                <td>
                                  <Button
                                    icon
                                    style={{ marginLeft: 8 }}
                                    onClick={() => deleteMapping(currentRow.id, mapping.id)}
                                  >
                                    <Icon name="trash" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>

                        {hasErrors && (
                          <div className="popup-error">
                            Please complete all mapping rows before closing. Fields marked in red are required. Remove rows which are not required.
                          </div>
                        )}

                        <br />
                        <Button variant="primary" onClick={() => addCaseTypeMapping(currentRow.id)}>
                          Add Mapping
                        </Button>

                        <Button variant="secondary" onClick={closePopup} disabled={hasErrors}>
                          Close
                        </Button>
                      </>
                    )}
                  </PopupInner>
                </Popup>
              )}
            { /* popup end */ }

            <br />
            <Button variant="primary" onClick={addRow}>
              Add Flow
            </Button>
            <Button onClick={setBack}> Back </Button>
            <Button type='submit'>Next</Button>
          </div>
        </Form>
      }

    </>
  );
};

export default Mapping;
