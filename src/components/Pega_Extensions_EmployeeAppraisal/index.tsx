import { useEffect, useState, useMemo, useCallback } from 'react';
import { withConfiguration, Card } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import Table from './Table';
import Search from './Search';
import Appraisals from './Appraisals';
import GlobalStyle from './styles';
import type { Employee } from './interfaces';
import fetchDataPage from './apiUtils';
import { debounce } from 'lodash';

interface PegaExtensionsEmployeeAppraisalProps extends PConnFieldProps {
  dataPage: string;
  loadingMessage: string;
  detailsDataPage: string;
}

function PegaExtensionsEmployeeAppraisal(props: PegaExtensionsEmployeeAppraisalProps) {

  const { getPConnect, dataPage, loadingMessage, detailsDataPage } = props;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const PConnect = getPConnect();
  const context = PConnect.getContextName();

  const [selectedEmployee, setSelectedEmployee] = useState<{ EmployeeID: string; EmployeeName: string; } | null>(null);
  const [appraisalData, setAppraisalData] = useState<any[]>([]);
  const [isAppraisalModalOpen, setIsAppraisalModalOpen] = useState(false);
  const [isAppraisalLoading, setIsAppraisalLoading] = useState(false);

  const employeeListColumnsConfig = useMemo(
    () => ([
      { key: 'EmployeeID', label: 'Employee ID' },
      { key: 'EmployeeName', label: 'Employee Name' },
      { key: 'AppraisalId', label: 'Appraisal ID' },
      { key: 'EmailAddress', label: 'Email' },
      { key: 'Department', label: 'Department' },
      { key: 'JobTitle', label: 'Job Title' },
      { key: 'Practice', label: 'Practice' },
      { key: 'Ratings', label: 'Ratings' },
      { key: 'AppraisalDate', label: 'Appraisal Date' },
      { key: 'Action', label: 'Action' }
    ]),
    []
  );

  const tableColumns = useMemo(
    () => employeeListColumnsConfig.map(col => ({ key: col.key, label: PConnect.getLocalizedValue(col.label, '', '') })),
    [employeeListColumnsConfig, PConnect]
  );

  const loadEmployees = useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log('in loadEmployees');
    setIsLoading(true);

    const payload = {
      ...(searchText.trim() && { dataViewParameters: { Query: searchText.trim() } }),
      paging: { pageNumber: 1, pageSize: 10 }
    };

    const keys = employeeListColumnsConfig.map(c => c.key);
    const res = await fetchDataPage(dataPage, context, payload);

    const formatted = (res.data || []).map((entry: any, index: number) => {
      const row: any = { id: index };
      keys.forEach((key) => {
        row[key] = entry?.[key] ?? '';
      });
      return row;
    });
    setEmployees(formatted);
    setIsLoading(false);
  }, [searchText, employeeListColumnsConfig, dataPage, context]);

  const debouncedSearch = useMemo(
    () => debounce(() => {
      // eslint-disable-next-line no-console
      console.log('in debouncedSearch');
      loadEmployees();
    }, 500),
    [loadEmployees]
  );

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('useEffect for searchText & debouncedSearch');
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchText, debouncedSearch]);

  const handleSearch = (value: string) => {
    // eslint-disable-next-line no-console
    console.log('handleSearch');
    setSearchText(value);
  };

  const handleViewDetails = async (EmployeeID: string, EmployeeName : string) => {
    setSelectedEmployee({ EmployeeID, EmployeeName });
    setIsAppraisalModalOpen(true);
    setIsAppraisalLoading(true);
    const payload = {
      dataViewParameters : { EmployeeID }
    };
    const res = await fetchDataPage(detailsDataPage, context, payload);
    setAppraisalData(res.data || []);
    setIsAppraisalLoading(false);
  };

  const closeAppraisalModal = () => {
    setIsAppraisalModalOpen(false);
    setSelectedEmployee(null);
    setAppraisalData([]);
  };

  return (
      <div className='dashboard'>
        <GlobalStyle />
        <Card className="card">
          <Search placeholder='Search by Employee ID or Name...' onChange={(value) => handleSearch(value)} />
          <Table
            columns={tableColumns}
            data={employees}
            loading={isLoading}
            loadingMessage={PConnect.getLocalizedValue(loadingMessage, '', '')}
            onClick={handleViewDetails}
          />
          {isAppraisalModalOpen && (
            <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="appraisalModalTitle">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 id="appraisalModalTitle">
                    Appraisals for {selectedEmployee?.EmployeeName} ({selectedEmployee?.EmployeeID})
                  </h2>
                  <button type="button" className="modal-close" aria-label="Close" onClick={closeAppraisalModal}>×</button>
                </div>
                <div className="modal-body">
                  {
                    isAppraisalLoading &&
                    <p className="notice">Loading...</p>
                  }
                  {
                    !isAppraisalLoading &&
                    <Appraisals appraisals={appraisalData} />
                  }
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
  );
}

export default withConfiguration(PegaExtensionsEmployeeAppraisal);
