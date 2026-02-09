//mapping
export type MappingType = {
  id: string;
  pyPropertyMode: string;
  targetProperty: string;
  sourceTableName: string;
  sourceTableColumns: string[];
  sourceProperty: string;
};


//flow
export type RowType = {
  id: string;
  type: string;
  targetProperty: string;
  targetPropertyClass: string;
  targetPropertyChilds: Record<string, any>[];
  sourceTableName: string;
  sourceTableColumns: string[];
  mappings: MappingType[];
};


export type TableMappingRow = {
  id: string;
  sourceTable: string;
  sourceColumn: string;
  targetTable: string;
  join: string;
  targetColumn: string;
  sourceColumns: string[];
  targetColumns: string[];
};

export type MappingRow = {
  id: string;
  sourceTable: string;
  sourceColumn: string;
  join: string;
  targetTable: string;
  targetColumn: string;
  sourceColumns: string[];
  targetColumns: string[];
};
// component
export type MappingProps = {
  context: any;
  setBack?: () => void;
  tableDetailsDataPage: string;
  selectedMigrationType: string;
  schemaName: string;
  selectedDatabase: string;
  caseTypeProperties: string[];
  tables: Record<string, any>[];
  sourceTypes: Record<string, any>[];
  joinCriteria: string[];
  onSubmit?: (data: RowType[]) => void;
  flowData: RowType[];
  // setFlowData: (data: RowType[]) => void;
  setFlowData: (data: RowType[] | ((prev: RowType[]) => RowType[])) => void;
};

export type StepperProps = {
  steps: string[];
  activeStep: number;
};

export type TableMappingProps = {
  context: any;
  tableDetailsDataPage: string;
  SourceSchemaName: string;
  SourceDatabaseName: string;
  tables: { table_name: string }[];
  rows: TableMappingRow[];
  setRows: React.Dispatch<React.SetStateAction<TableMappingRow[]>>;
  setBack?: () => void;
  onSubmit?: () => void;
};

export type DatabaseProps = {
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

  primaryColumnKey: string;
  setprimaryColumnKey: (value: string) => void;

  primaryTable: string;
  setprimaryTable: (value: string) => void;

  tables: Record<string, any>[];
  primaryTableColumns: string[];

  setselectedCaseType: (value: string) => void;
  onSubmit?: () => void;
};
