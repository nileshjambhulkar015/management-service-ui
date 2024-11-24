import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EmployeeDDService from '../../services/DropDownService/EmployeeDDService';
import EmployeeService from "../../services/EmployeeService";
import PaginationComponent from '../PaginationComponent/PaginationComponent';
export default function ViewAllEmpTransferToOtherHODComponent() {

    const navigate = useNavigate();

    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [companyName, setComapnyName] = useState('');


    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');

    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [roles, setRoles] = useState([])

    const [employees, setEmployees] = useState([])
    const [empEIdSearch, setEmpEIdSearch] = useState('');
    const [isSuccess, setIsSuccess] = useState(true)
    const [regions, setRegions] = useState([])
    const [sites, setSites] = useState([])
    const [companys, setCompanys] = useState([])
    const [responseMessage, setResponseMessage] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [dataPageable, setDataPageable] = useState([])

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Handle data fetching or any other logic here
    };

    // Handle items per page change
    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    useEffect(() => {
        const data = {
            currentPage,
            itemsPerPage
        }
        EmployeeService.getEmployeeDetailsByPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
            setEmployees(res.data.responseData.content);
            setDataPageable(res.data.responseData);
        }
        else {
            setResponseMessage(res.data.responseMessage)
            setIsSuccess(false);
        }
        });


    }, [currentPage, itemsPerPage]);

    const searchEmployeeEId = (e) => {
        setEmpEIdSearch(e.target.value)
        let empEId=e.target.value
        const data = {
            currentPage,
            itemsPerPage,
            empEId
        }
        EmployeeService.getEmployeeDetailsByEmpFirstNamePaging(data).then((res) => {

            if (res.data.success) {
                setIsSuccess(true);
                setEmployees(res.data.responseData.content?.filter((item) => item.roleId !== 2));
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        }, [currentPage, itemsPerPage]);
    }


    const navigateToAssignEmployee = (empId, empEId, roleId, deptId, desigId, reportingEmpId) => {

        Cookies.set('empIdForKpp', empId);
        Cookies.set('empEIdForKpp', empEId);
        Cookies.set('empKppRoleId', roleId);
        Cookies.set('empKppDeptId', deptId);
        Cookies.set('empKppDesigId', desigId);
        Cookies.set('empReportingIdForKpp', reportingEmpId);
        navigate(`/assignEmployeeKpp`, { replace: true });
    }



    return (
        <div className="row">
            <h3 className="text-center">Transfer Employee to  Other</h3>
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <form className="form-horizontal">
                                <label className="control-label col-sm-3" htmlFor="empFirstNameSearch">Enter Employee Id:</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="empEIdSearch" placeholder="Enter Employee Ide" value={empEIdSearch} onChange={(e) => searchEmployeeEId(e)} />
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
                {isSuccess ?
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">Sr No</th>
                                <th className="text-center">Employee Name</th>
                                <th className="text-center">Employee Id</th>
                                <th className="text-center">Department Name</th>
                                <th className="text-center">Designation Name</th>
                                <th className="text-center">Mobile No</th>
                                <th className="text-center">HOD Name</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(
                                    (employee, index) =>   //index is inbuilt variable of map started with 0
                                        <tr key={employee.empId}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-justify">{employee.empFirstName + ' ' + employee.empMiddleName + ' ' + employee.empLastName}</td>
                                            <td className="text-center">{employee.empEId}</td>
                                            <td className="text-center">{employee.deptName}</td>
                                            <td className="text-center">{employee.desigName}</td>
                                            <td className="text-center">{employee.empMobileNo}</td>
                                            <td className="text-center">{employee.reportingHODName}</td>

                                            <td className="text-center"> <button type="submit" className="btn btn-info" onClick={() =>
                                                navigateToAssignEmployee(employee.empId, employee.empEId, employee.roleId, employee.deptId, employee.desigId, employee.reportingEmpId)
                                            }>Transfer</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table> 
                    : <h4>{responseMessage}</h4>}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={dataPageable.totalPages || 10}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
            </div>


        </div>
    );
}