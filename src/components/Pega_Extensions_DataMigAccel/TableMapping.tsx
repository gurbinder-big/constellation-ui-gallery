import { useRef } from 'react';
import styled from 'styled-components';
import { Button, Icon, registerIcon } from '@pega/cosmos-react-core';
import { fetchListDataPage } from './apiUtils';
import * as trashIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/trash.icon';
import  type { TableMappingProps } from './types';

registerIcon(trashIcon);

const TableWrapper = styled.div`
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
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

const TableMapping = ({
  SourceSchemaName,
  SourceDatabaseName,
  tableDetailsDataPage,
  tables,
  context,
  setBack,
  rows,
  setRows,
  onSubmit
}: TableMappingProps) => {

  const formRef = useRef<HTMLFormElement>(null);

  const addRow = () => {
    setRows(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sourceTable: '',
        sourceColumn: '',
        targetTable: '',
        join: '',
        targetColumn: '',
        sourceColumns: [],
        targetColumns: []
      }
    ]);
  };

  const deleteRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const handleSourceTableChange = async (id: string, table: string) => {
    const res = await fetchListDataPage(tableDetailsDataPage, context, {
      dataViewParameters : {
        Scenario: 3,
        SourceSchemaName,
        SourceDatabaseName,
        SourceTableName: table
      }
    });
    const cols = (res?.data || []).map((c: any) => c.column_name);

    setRows(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, sourceTable: table, sourceColumn: '', sourceColumns: cols }
          : r
      )
    );
  };

  const handleTargetTableChange = async (id: string, table: string) => {
    const res = await fetchListDataPage(tableDetailsDataPage, context, {
      dataViewParameters : {
        Scenario: 3,
        SourceSchemaName,
        SourceDatabaseName,
        SourceTableName: table
      }
    });
    const cols = (res?.data || []).map((c: any) => c.column_name);

    setRows(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, targetTable: table, targetColumn: '', targetColumns: cols }
          : r
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current?.checkValidity()) {
      onSubmit?.();
    } else {
      formRef.current?.reportValidity();
    }
  };

  return (
    <TableWrapper>
      <Form id='table-mapping-form' ref={formRef} onSubmit={handleSubmit}>
        <h3>Define Table Relationships/<h3>
        <Table>
          <thead>
            <tr>
              <th>Left Table</th>
              <th>Left Column</th>
              <th>Join</th>
              <th>Joined Table</th>
              <th>Joined Column</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                {/* Source Table */}
                <td>
                  <select
                    required
                    value={row.sourceTable}
                    onChange={e =>
                      handleSourceTableChange(row.id, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    {tables.map(t => (
                      <option key={t.table_name} value={t.table_name}>
                        {t.table_name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Source Column */}
                <td>
                  <select
                    required
                    value={row.sourceColumn}
                    disabled={!row.sourceTable}
                    onChange={e =>
                      setRows(prev =>
                        prev.map(r =>
                          r.id === row.id
                            ? { ...r, sourceColumn: e.target.value }
                            : r
                        )
                      )
                    }
                  >
                    <option value="">Select</option>
                    {row.sourceColumns.map(col => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <select
                    required
                    value={row.join}
                    disabled={!row.sourceTable}
                    onChange={e =>
                      setRows(prev =>
                        prev.map(r =>
                          r.id === row.id
                            ? { ...r, join: e.target.value }
                            : r
                        )
                      )
                    }
                  >
                    <option value="">Select</option>
                    <option value="left">left</option>
                  </select>
                </td>

                {/* Target Table */}
                <td>
                  <select
                    required
                    value={row.targetTable}
                    onChange={e =>
                      handleTargetTableChange(row.id, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    {tables.map(t => (
                      <option key={t.table_name} value={t.table_name}>
                        {t.table_name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Target Column */}
                <td>
                  <select
                    required
                    value={row.targetColumn}
                    disabled={!row.targetTable}
                    onChange={e =>
                      setRows(prev =>
                        prev.map(r =>
                          r.id === row.id
                            ? { ...r, targetColumn: e.target.value }
                            : r
                        )
                      )
                    }
                  >
                    <option value="">Select</option>
                    {row.targetColumns.map(col => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Delete */}
                <td>
                  <Button variant="secondary" onClick={() => deleteRow(row.id)}>
                    <Icon name='trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div style={{ marginTop: 16 }}>
          <Button type='button' onClick={addRow}>Add Mapping</Button>
          <Button type='button' onClick={setBack}> Back </Button>
          <Button type='submit'>Next</Button>
        </div>
      </Form>
    </TableWrapper>
  );
};

export default TableMapping;
