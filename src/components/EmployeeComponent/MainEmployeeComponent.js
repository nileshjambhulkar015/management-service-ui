import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DesignationService from "../../services/MasterService/DesignationService";
import EmployeeService from "../../services/EmployeeService";
import EmployeeTypeService from "../../services/MasterService/EmployeeTypeService";
import RegionService from "../../services/MasterService/RegionService";
import RoleService from "../../services/MasterService/RoleService";
import SiteService from "../../services/MasterService/SiteService";
import CompanyMasterService from "../../services/MasterService/CompanyMasterService";
import { BASE_URL_API } from "../../services/URLConstants";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
export default function MainEmployeeComponent() {
    const navigate = useNavigate();


    const [companyId, setCompanyId] = useState('');
    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
    const [reportingEmpId, setReportingEmpId] = useState('');
    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [empFirstName, setEmpFirstName] = useState('');
    const [empMiddleName, setEmpMiddleName] = useState('');
    const [empLastName, setEmpLastName] = useState('');
    const [empDob, setEmpDob] = useState('');
    const [empPhoto, setEmpPhoto] = useState('');
    const [empMobileNo, setEmpMobileNo] = useState('');
    const [empEmerMobileNo, setEmpEmerMobileNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [tempAddress, setTempAddress] = useState('');
    const [permAddress, setPermAddress] = useState('');
    const [empGender, setEmpGender] = useState('Male');
    const [empBloodgroup, setEmpBloodgroup] = useState('A+');
    const [remark, setRemark] = useState('');
    const [empTypeId, setEmpTypeId] = useState('');
    const [reportingHODName, setReportingHODName] = useState('');
    const [empFirstNameSearch, setEmpFirstNameSearch] = useState();
    const [compnays, setCompanys] = useState([])
    const [regions, setRegions] = useState([])
    const [sites, setSites] = useState([])
    const [employees, setEmployees] = useState([])
    const [roles, setRoles] = useState([])

    const [departments, setDepartments] = useState([])

    const [designations, setDesignations] = useState([])
    const [isSuccess, setIsSuccess] = useState(true)
    const [empEIdSearch, setEmpEIdSearch] = useState('');
    const [empTypes, setEmpTypes] = useState([])
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

    const getEmployeeDetailsByPaging = () => {
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

        }, [currentPage, itemsPerPage]);

    }

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

        RoleService.ddRoles().then((res) => {
            setRoles(res.data);
        });

        EmployeeTypeService.ddEmployeeType().then((res) => {
            setEmpTypes(res.data.responseData);
        });

        DesignationService.ddAllDepartmentDetails().then((res) => {
            setDepartments(res.data);
        });

        RegionService.ddRegions().then((res) => {
            setRegions(res.data);
        });

        SiteService.ddAllSites().then((res) => {
            setSites(res.data);
        });

        CompanyMasterService.ddAllCompanyies().then((res) => {
            setCompanys(res.data);
        });


    }, [currentPage, itemsPerPage]);


    //for role , department and designation
    const handleRoleIdChange = (value) => {
        if (value == "Select Role") {
            value = null;
        }
        setRoleId(value)
    }

    //Employee advance search

    const handleEmployeeTypeChange = (value) => {
        if (value == "Select Employee Type") {
            value = null;
        }
        setEmpTypeId(value)
    }

    const handleDepartmentChange = (value) => {
        if (value == "Select Department") {
            value = null;
        }
        setDeptId(value)
    }

    //for role change
    const onRegionChangeHandler = (value) => {
        if (value == "Select Region") {
            value = null;
        }
        setRegionId(value);
    };

    //for site change
    const onSiteChangeHandler = (value) => {
        if (value == "Select Site") {
            value = null;
        }
        setSiteId(value);
    };

    //for Company change
    const onCompanyChangeHandler = (value) => {
        if (value == "Select Company") {
            value = null;
        }
        setCompanyId(value);
    };

    // Advance search employee
    const searchEmployeeDetails = (e) => {

        e.preventDefault()
        let advEmployeeSearch = { roleId, deptId, regionId, siteId, companyId, empTypeId };
        const data = {
            currentPage,
            itemsPerPage,
            advEmployeeSearch
        }


        EmployeeService.advanceSearchEmployee(data).then(res => {
            if (res.data.success) {
                setIsSuccess(true);
                setEmployees(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }

        }, [currentPage, itemsPerPage]);
    }


    const searchEmployeeEId = (e) => {
        setEmpEIdSearch(e.target.value)
        let empEId = e.target.value;
        const data = {
            currentPage,
            itemsPerPage,
            empEId
        }
        EmployeeService.getEmployeeDetailsByEmpFirstNamePaging(data).then((res) => {

            if (res.data.success) {
                setIsSuccess(true);
                setEmployees(res.data.responseData.content?.filter((item) => item.roleId !== 1));
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        }, [currentPage, itemsPerPage]);
    }

    const showEmployeeById = (e) => {

        EmployeeService.getEmployeeById(e).then(res => {
            let employee = res.data;

            setEmpId(employee.empId)
            setEmpEId(employee.empEId)
            setRoleId(employee.roleId)
            setRoleName(employee.roleName)
            setDeptId(employee.deptId)
            setDeptName(employee.deptName)
            setDesigId(employee.desigId)
            setDesigName(employee.desigName)
            setReportingEmpId(employee.reportingEmpId)
            setReportingHODName(employee.reportingHODName)
            setRegionId(employee.regionId)
            setRegionName(employee.regionName)
            setSiteId(employee.siteId)
            setSiteName(employee.siteName)
            setEmpFirstName(employee.empFirstName)
            setEmpMiddleName(employee.empMiddleName)
            setEmpLastName(employee.empLastName)
            setEmpDob(employee.empDob)
            setEmpPhoto(employee.empPhoto || '')
            setEmpMobileNo(employee.empMobileNo)
            setEmpEmerMobileNo(employee.empEmerMobileNo)
            setEmailId(employee.emailId)
            setTempAddress(employee.tempAddress)
            setPermAddress(employee.permAddress)
            setEmpGender(employee.empGender)
            setEmpBloodgroup(employee.empBloodgroup)

            setRemark(employee.remark)
        }
        );
        // window.location.reload(); 
    }

    const deleteEmployeeById = (e) => {
        const data = {
            currentPage,
            itemsPerPage
        }
        if (window.confirm("Do you want to delete this Employee ?")) {

            EmployeeService.deleteEmployeeById(e).then(res => {
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

                }, [currentPage, itemsPerPage]);
            }
            );


        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }
    }

    const updateEmployeeDetails = (e) => {

        e.preventDefault()
        const data = {
            currentPage,
            itemsPerPage
        }
        let statusCd = 'A';
        let regionId = '1';
        let siteId = '1';
        let employeeData = { empId, empEId, roleId, deptId, desigId, reportingEmpId, regionId, siteId, empFirstName, empMiddleName, empLastName, empDob, empMobileNo, empEmerMobileNo, empPhoto, emailId, tempAddress, permAddress, empGender, empBloodgroup, remark, statusCd };

        EmployeeService.updateEmployeeDetails(employeeData).then(res => {
            EmployeeService.getEmployeeDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setEmployees(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                }
                else {
                    setResponseMessage(res.data.responseMessage)
                    setIsSuccess(false);
                }
            }, [currentPage, itemsPerPage]);

        }
        );
    }


    //upload excel data for department
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch(BASE_URL_API + '/employee/upload-employee', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                // Handle response

                alert("Employee uploaded successfully")
                EmployeeService.getEmployeeDetailsByPaging().then((res) => {
                    setEmployees(res.data.responseData.content);
                });

            })
            .catch(error => {
                // Handle error
                alert('An error occurred while uploading the file.');
            });
    };



    return (
        <div className="row">
            <h2 className="text-center">Employee List</h2>

            <div className="col-md-12">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <form className="form-horizontal">
                                <label className="control-label col-sm-3" htmlFor="empFirstNameSearch">Enter Employee Id:</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="empFirstNameSearch" placeholder="Enter First Name" value={empFirstNameSearch} onChange={(e) => searchEmployeeEId(e)} />
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="col-sm-5">
                        <button type="button" className="btn btn-primary" onClick={() => navigate(`/newEmployee`, { replace: true })} >Add New Employee</button>
                        <button type="button" className="btn btn-primary col-sm-offset-1" data-toggle="modal" data-target="#uploadExcelEmployee">Upload Excel</button>
                        <button type="button" className="btn btn-primary col-sm-offset-1" data-toggle="modal" data-target="#advanceSearchEmployee">Advance Search</button>
                        <button type="button" className="btn btn-primary col-sm-offset-1" onClick={() => getEmployeeDetailsByPaging()}>Clear Search</button>
                    </div>
                </div>
                <div className="row">
                    {isSuccess ?
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Employee Name</th>
                                    <th className="text-center">Employee Id</th>

                                    <th className="text-center">Department Name</th>
                                    <th className="text-center">Designation Name</th>
                                    <th className="text-center">Role Name</th>
                                    <th className="text-center">Mobile No</th>
                                    <th className="text-center">Reporting To</th>
                                    <th className="text-center">Reporting ID</th>
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
                                                <td className="text-center">{employee.roleName}</td>
                                                <td className="text-center">{employee.empMobileNo}</td>
                                                <td className="text-center">{employee.reportingHODName}</td>
                                                <td className="text-center">{employee.reportingHODEId}</td>
                                                <td className="col-sm-3 text-center"> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateEmployee" onClick={() => showEmployeeById(employee.empId)}>Update</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteEmployeeById(employee.empId)}>Delete</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showEmployee" onClick={() => showEmployeeById(employee.empId)}>View</button></td>
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


            {/* Modal for upload excel of employee details */}
            <div className="modal fade" id="uploadExcelEmployee" role="dialog">
                <form className="form-horizontal" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Upload Employee</h4>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="file">Select file:</label>
                                    <div className="col-sm-8">
                                        <input type="file" id="file" name="file" />
                                    </div>
                                </div>


                            </div>
                            <div className="modal-footer">
                                <input type="submit" value={"Upload"} className="btn btn-primary" />
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>


            {/* Modal for Advance search for employee details */}
            <div className="modal fade" id="advanceSearchEmployee" role="dialog">
                <form className="form-horizontal" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Advance Search Employee</h4>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Employee Type:</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="empTypeId" defaultValue={null} onChange={(e) => handleEmployeeTypeChange(e.target.value)}>
                                                    <option>Select Employee Type</option>

                                                    {

                                                        empTypes.map(
                                                            empType =>
                                                                <option key={empType.empTypeId} value={empType.empTypeId}>{empType.empTypeName}</option>
                                                        )
                                                    };

                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Role :</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="roleId" defaultValue={null} onChange={(e) => handleRoleIdChange(e.target.value)}>
                                                    <option>Select Role</option>
                                                    {
                                                        roles.map(
                                                            role =>
                                                                <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                                                        )
                                                    };
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Department:</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="deptId" defaultValue={null} onChange={(e) => handleDepartmentChange(e.target.value)}>
                                                    <option>Select Department</option>
                                                    {
                                                        departments.map(
                                                            department =>
                                                                <option key={department.deptId} value={department.deptId}>{department.deptName}</option>
                                                        )
                                                    };

                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Region:</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="regionId" defaultValue={null} onChange={(e) => onRegionChangeHandler(e.target.value)}>
                                                    <option>Select Region</option>
                                                    {
                                                        regions.map(
                                                            region =>
                                                                <option key={region.regionId} value={region.regionId}>{region.regionName}</option>
                                                        )
                                                    };

                                                </select>
                                            </div>
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="siteName">Site:</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="regionId" defaultValue={null} onChange={(e) => onSiteChangeHandler(e.target.value)}>
                                                    <option>Select Site</option>
                                                    {
                                                        sites.map(
                                                            site =>
                                                                <option key={site.siteId} value={site.siteId}>{site.siteName}</option>
                                                        )
                                                    };

                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="companyName">Company Name:</label>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <select className="form-control" id="companyId" defaultValue={null} onChange={(e) => onCompanyChangeHandler(e.target.value)}>
                                                    <option>Select Company</option>
                                                    {
                                                        compnays.map(
                                                            company =>
                                                                <option key={company.companyId} value={company.companyId}>{company.companyName}</option>
                                                        )
                                                    };

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => searchEmployeeDetails(e)}>Search</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

            {/* Update Employee Details */}


            <div className="modal fade" id="updateEmployee" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Employee</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal" action="/action_page.php">
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empFirstName">Employee Name:</label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empFirstName" value={empFirstName} onChange={(e) => setEmpFirstName(e.target.value)} placeholder="Enter First Name here" />
                                        </div>

                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empMiddleName" value={empMiddleName} onChange={(e) => setEmpMiddleName(e.target.value)} placeholder="Enter Middle Name here" />
                                        </div>

                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empLastName" value={empLastName} onChange={(e) => setEmpLastName(e.target.value)} placeholder="Enter Last Name here" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empDob">Date Of Birth:</label>
                                        <div className="col-sm-3">
                                            <input type="date" className="form-control" id="empDob" value={empDob} onChange={(e) => setEmpDob(e.target.value)} />

                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empPhoto">Upload Photo:</label>

                                        <div className="col-sm-3">
                                            <input type="file" className="form-control" id="empPhoto" value={empPhoto} onChange={(e) => setEmpPhoto(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="deptId">Department Name:</label>
                                        <div className="col-sm-3">

                                            <select className="form-control" id="deptId" onChange={(e) => setDeptId(e.target.value)}>
                                                <option>--Select Department--</option>
                                                {
                                                    departments.map(
                                                        department =>
                                                            <option key={department.deptId} value={department.deptId}>{department.deptName}</option>
                                                    )
                                                };
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="desigId"> Designation Name:</label>
                                        <div className="col-sm-3">

                                            <select className="form-control" id="desigId" onChange={(e) => setDesigId(e.target.value)}>
                                                <option>--Select Department--</option>
                                                {
                                                    departments.map(
                                                        department =>
                                                            <option key={department.deptId} value={department.deptId}>{department.deptName}</option>
                                                    )
                                                };
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empMobileNo">Mobile No 1:</label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empMobileNo" value={empMobileNo} onChange={(e) => setEmpMobileNo(e.target.value)} placeholder="Enter First Name here" />
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empEmerMobileNo">Mobile No 2:</label>

                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empEmerMobileNo" value={empEmerMobileNo} onChange={(e) => setEmpEmerMobileNo(e.target.value)} placeholder="Enter Last Name here" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="tempAddress">Temporary Address:</label>
                                        <div className="col-sm-3">
                                            <textarea row="6" className="form-control" id="tempAddress" value={tempAddress} onChange={(e) => setTempAddress(e.target.value)} placeholder="Enter First Name here" />
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="permAddress">Permenent Address:</label>

                                        <div className="col-sm-3">
                                            <textarea row="6" className="form-control" id="permAddress" value={permAddress} onChange={(e) => setPermAddress(e.target.value)} placeholder="Enter Last Name here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="emailId"> Email Id:</label>
                                        <div className="col-sm-4">

                                            <input type="text" className="form-control" id="emailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Enter Email Id here" />

                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empGender">Gender:</label>
                                        <div className="col-sm-3">
                                            <select className="form-control" id="empGender" onChange={(e) => setEmpGender(e.target.value)} >
                                                <option value={'Male'}>Male</option>
                                                <option value={'Female'}>Female</option>
                                            </select>
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="kppObjective" >Blood Group:</label>

                                        <div className="col-sm-3">
                                            <select className="form-control" id="empBloodgroup" onChange={(e) => setEmpBloodgroup(e.target.value)}>
                                                <option value={"A+"}>A+ve</option>
                                                <option value={"B+"}>B+ve</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            <textarea row="4" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateEmployeeDetails(e)}> Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

            {/** Display Employee by Id */}
            <div className="modal fade" id="showEmployee" role="dialog">
                <div className="modal-dialog modal-lg">


                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">View Employee Details</h4>
                        </div>

                        <div className="modal-body">
                            <form className="form-horizontal" action="/action_page.php">
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="deptId">Role Name:</label>
                                        <div className="col-sm-3">
                                            {roleName}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="deptId">Department Name:</label>
                                        <div className="col-sm-3">
                                            {deptName}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="desigId"> Designation Name:</label>
                                        <div className="col-sm-3">
                                            {desigName}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empFirstName">Employee Name:</label>
                                        <div className="col-sm-9">
                                            {empFirstName + ' ' + empMiddleName + ' ' + empLastName}
                                        </div>


                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empDob">Date Of Birth:</label>
                                        <div className="col-sm-3">
                                            {empDob}

                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empPhoto">Upload Photo:</label>

                                        <div className="col-sm-3">
                                            {empPhoto}
                                        </div>
                                    </div>
                                </div>



                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empMobileNo">Mobile No 1:</label>
                                        <div className="col-sm-3">
                                            {empMobileNo}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empEmerMobileNo">Mobile No 2:</label>

                                        <div className="col-sm-3">
                                            {empEmerMobileNo}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="tempAddress">Temporary Address:</label>
                                        <div className="col-sm-3">
                                            {tempAddress}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="permAddress">Permenent Address:</label>

                                        <div className="col-sm-3">
                                            {permAddress}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="emailId"> Email Id:</label>
                                        <div className="col-sm-4">
                                            {emailId}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empGender">Gender:</label>
                                        <div className="col-sm-3">
                                            {empGender}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="kppObjective" >Blood Group:</label>

                                        <div className="col-sm-3">
                                            {empBloodgroup}
                                        </div>
                                    </div>
                                </div>




                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            {remark}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal"> Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}