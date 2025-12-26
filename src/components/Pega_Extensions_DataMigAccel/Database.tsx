import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@pega/cosmos-react-core';

const Form = styled.form`
  width: 100%;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 12px;

  label {
    flex: 0 0 40%;
    font-weight: 600;
  }

  select {
    flex: 1;
    padding: 4px;
    border: 1px solid #ced4da;

    &:disabled {
      background-color: #e9ecef;
      cursor: not-allowed;
    }
  }

  select.invalid {
    border-color: #dc3545;
  }

  span.required {
    color: red;
  }
`;

type DatabaseProps = {
  dataBases: { pyRWDatabase: string }[];
  migrationTypes: { id: string; label: string }[];
  schemaNames: { SchemaName: string }[];
  caseTypes: { pyLabel: string, pyCaseClass: string }[];
  dataTypes: { id: string; label: string }[];
  selectedDatabase: string;
  selectedMigrationType: string;
  setSelectedDatabase: (value: string) => void;
  setselectedMigrationType: (value: string) => void;
  schemaName: string;
  setschemaName: (value: string) => void;
  selectedCaseType: string;
  setselectedCaseType: (value: string) => void;
  onSubmit?: () => void;
};

const Database = (props: DatabaseProps) => {
  const {
    dataBases,
    migrationTypes,
    schemaNames,
    caseTypes,
    dataTypes,

    selectedMigrationType,
    setselectedMigrationType,

    selectedDatabase,
    setSelectedDatabase,

    schemaName,
    setschemaName,

    selectedCaseType,
    setselectedCaseType,
    onSubmit,
  } = props;

  const [selectedDataType, setSelectedDataType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // setschemaName('dummy');
    // setselectedCaseType('BIG-GDM-Work-DataMigration');
  }, [selectedDatabase]);

  console.log('ok');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (formRef.current?.checkValidity()) {
      onSubmit?.();
    } else {
      formRef.current?.reportValidity();
    }
  };

  return (
    <Form id='database-form' ref={formRef} onSubmit={handleSubmit}>
      <FieldRow>
        <label htmlFor='dataBase'>
          DataBase name: <span className='required'>*</span>
        </label>
        <select
          className={submitted && !selectedDatabase ? 'invalid' : ''}
          id='dataBase'
          name='dataBase'
          value={selectedDatabase}
          onChange={(e) => setSelectedDatabase(e.target.value)}
          required
        >
          <option value=''>Select</option>
          {dataBases.map((item, index) => (
            <option key={index} value={item.pyRWDatabase}>
              {item.pyRWDatabase}
            </option>
          ))}
        </select>
      </FieldRow>

      <FieldRow>
        <label htmlFor='schemaName'>
          Schema name: <span className='required'>*</span>
        </label>
        <select
          className={submitted && !schemaName ? 'invalid' : ''}
          id='schemaName'
          name='schemaName'
          value={schemaName}
          onChange={(e) => setschemaName(e.target.value)}
          disabled={!selectedDatabase}
          required={!!selectedDatabase}
        >
          <option value=''>Select</option>
          {schemaNames.map((item, index) => (
            <option key={index} value={item.SchemaName}>
              {item.SchemaName}
            </option>
          ))}
        </select>
      </FieldRow>

      <FieldRow>
        <label htmlFor='migrationType'>
          Migration type: <span className='required'>*</span>
        </label>
        <select
          className={submitted && !selectedMigrationType ? 'invalid' : ''}
          id='migrationType'
          name='migrationType'
          value={selectedMigrationType}
          onChange={(e) => {
            setselectedMigrationType(e.target.value);
            // Clear conditional fields when migration type changes
            if (e.target.value !== 'caseType') {
              setselectedCaseType('');
            }
            if (e.target.value !== 'dataType') {
              setSelectedDataType('');
            }
          }}
          required
        >
          <option value=''>Select</option>
          {migrationTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </FieldRow>

      {['caseType'].includes(selectedMigrationType) && (
        <FieldRow>
          <label htmlFor='caseType'>
            Case type: <span className='required'>*</span>
          </label>
          <select
            className={submitted && !selectedCaseType ? 'invalid' : ''}
            id='caseType'
            name='caseType'
            value={selectedCaseType}
            onChange={(e) => setselectedCaseType(e.target.value)}
            required
          >
            <option value=''>Select</option>
            {caseTypes.map((item, index) => (
              <option key={index} value={item.pyCaseClass}>
                { item.pyLabel }
              </option>
            ))}
          </select>
        </FieldRow>
      )}

      {['dataType'].includes(selectedMigrationType) && (
        <FieldRow>
          <label htmlFor='dataType'>
            Data type: <span className='required'>*</span>
          </label>
          <select
            className={submitted && !selectedDataType ? 'invalid' : ''}
            id='dataType'
            name='dataType'
            value={selectedDataType}
            onChange={(e) => setSelectedDataType(e.target.value)}
            required
          >
            <option value=''>Select</option>
            {dataTypes.map((item: any, index) => (
              <option key={index} value={item.pyLabel}>
                {item.pyLabel}
              </option>
            ))}
          </select>
        </FieldRow>
      )}

      <div style={{ marginTop: '16px' }}>
        <Button type='submit'>Next</Button>
      </div>
    </Form>
  );
};

export default Database;
