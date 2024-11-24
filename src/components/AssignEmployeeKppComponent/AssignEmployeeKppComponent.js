import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyParameterService from "../../services/KeyParameterService";
import Cookies from 'js-cookie';
import EmployeeKppsService from "../../services/EmployeeKppsService";
import EmployeeService from "../../services/EmployeeService";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
export default function AssignEmployeeKppComponent() {

    const navigate = useNavigate();
    const [empKppOverallTargetCount, setEmpKppOverallTargetCount] = useState('')
    const [isSuccess, setIsSuccess] = useState(true)
    const [kppIsSuccess, setKppIsSuccess] = useState(true)
    const [kpps, setKpps] = useState([])
    const [viewEmpKpps, setViewEmpKpps] = useState([])

    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [empName, setEmpName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
    const [kppObjectiveNo, setKppObjectiveNo] = useState('');

    const [kppObjective, setKppObjective] = useState('');
    const [kppPerformanceIndica, setKppPerformanceIndica] = useState('');
    const [responseMessage, setResponseMessage] = useState('')


    const [overallTarget, setOverallTarget] = useState(0);
    const [overallWeightage, setOverallWeightage] = useState(0);
    const [kppObjectiveNoSearch, setKppObjectiveNoSearch] = useState('');

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
        KeyParameterService.getKPPDetailsForAssignKppByPaging(data).then((res) => {
            if (res.data.success) {
                setKppIsSuccess(true);
                setKpps(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setKppIsSuccess(false);
            }

        });

        KeyParameterService.viewKPPDetailsForAssignKppByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setEmpKppOverallTargetCount(res.data.responseData.empKppOverallTargetCount)
                setViewEmpKpps(res.data.responseData.kppResponses.content);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }


        });

        EmployeeService.searchEmployeeById(Cookies.get('empIdForKpp')).then((res) => {
            setEmpId(res.data.empId)
            setEmpEId(res.data.empEId)
            setEmpName(res.data.empFirstName + ' ' + res.data.empMiddleName + ' ' + res.data.empLastName)
            setRoleName(res.data.roleName)
            setDeptName(res.data.deptName)
            setDesigName(res.data.desigName)
        });
    }, [currentPage, itemsPerPage]);

    // Advance search employee
    const advanceSearchEmployeeKpp = (e) => {
        setKppObjectiveNo(e.target.value)
        e.preventDefault()
        let advanceKppSearch = { kppObjectiveNo, kppObjective, kppPerformanceIndica };

        const data = {
            currentPage,
            itemsPerPage,
            advanceKppSearch
        }
        KeyParameterService.advanceSearchEmployeeKPP(data).then(res => {
            if (res.data.success) {
                setKppIsSuccess(true);
                setKpps(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setKppIsSuccess(false);
            }
        }, [currentPage, itemsPerPage]);
    }

    const searchKPPObjectiveNoPaging = (e) => {
        setKppObjectiveNo(e.target.value)
        let kppObjectiveNo = e.target.value;
        console.log("Assign kppObjectiveNo :", kppObjectiveNo)
        const data = {
            currentPage,
            itemsPerPage,
            kppObjectiveNo
        }
        KeyParameterService.searchKPPObjectiveNoPaging(data).then((res) => {

            if (res.data.success) {
                console.log("Assign KPP : ", res.data.responseData.content)
                setKppIsSuccess(true);
                setKpps(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setKppIsSuccess(false);
            }
        }, [currentPage, itemsPerPage]);
    }


    const clearSearchAssignKpp = (e) => {
        setKppObjectiveNo('')
        const data = {
            currentPage,
            itemsPerPage
        }
        KeyParameterService.getKPPDetailsForAssignKppByPaging(data).then((res) => {
            if (res.data.success) {
                setKppIsSuccess(true);
                setKpps(res.data.responseData.content);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setKppIsSuccess(false);
            }

        }, [currentPage, itemsPerPage]);

    }


    const removeCookies = () => {
        Cookies.remove('empIdForKpp');
        Cookies.remove('empEIdForKpp');
        Cookies.remove('empKppRoleId');
        Cookies.remove('empKppDeptId');
        Cookies.remove('empKppDesigId');
        Cookies.remove('empReportingIdForKpp');

        navigate(`/showEmployeeForKpp`, { replace: true })
    }



    const saveKPPDetailsForEmployee = (e, newKppId) => {
        const data = {
            currentPage,
            itemsPerPage
        }
        if (window.confirm("Do you want to assign this Employee KPP ?")) {
            e.preventDefault()

            let statusCd = 'A';
            let kppId = newKppId;
            let empId = Cookies.get('empIdForKpp');
            let empEId = Cookies.get('empEIdForKpp');

            let roleId = Cookies.get('empKppRoleId');
            let deptId = Cookies.get('empKppDeptId');
            let desigId = Cookies.get('empKppDesigId');
            let reportingEmpId = Cookies.get('empReportingIdForKpp');
            let employeeId = Cookies.get('empId');

            //TODO: read value from dynamic textbox
            let kppOverallTarget = overallTarget;
            let kppOverallWeightage = overallWeightage;
            let kpp = { kppId, kppOverallTarget, kppOverallWeightage, empId, empEId, roleId, deptId, desigId, reportingEmpId, statusCd, employeeId };


            EmployeeKppsService.assignEmployeeKppDetails(kpp).then(res => {

                KeyParameterService.getKPPDetailsForAssignKppByPaging(data).then((res) => {
                    if (res.data.success) {
                        setKppIsSuccess(true);
                        setKpps(res.data.responseData.content);
                        setDataPageable(res.data.responseData);
                        setOverallTarget(0);
                        setOverallWeightage(0);
                        setDataPageable(res.data.responseData);

                    }
                    else {
                        setResponseMessage(res.data.responseMessage)
                        setKppIsSuccess(false);
                    }

                }, [currentPage, itemsPerPage]);

                KeyParameterService.viewKPPDetailsForAssignKppByPaging().then((res) => {

                    if (res.data.success) {
                        setIsSuccess(true);
                        setEmpKppOverallTargetCount(res.data.responseData.empKppOverallTargetCount)
                        setViewEmpKpps(res.data.responseData.kppResponses.content);

                    }
                    else {

                        setIsSuccess(false);
                    }

                });
            }
            );
        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }
    }

    const deleteKPPDetailsForEmployee = (kppId, kppOverallTarget, kppOverallWeightage) => {
        const data = {
            currentPage,
            itemsPerPage
        }
        if (window.confirm("Do you want to delete this Employee KPP ?")) {
            EmployeeKppsService.deleteEmployeeKppDetails(kppId, kppOverallTarget, kppOverallWeightage).then(res => {
                KeyParameterService.getKPPDetailsForAssignKppByPaging(data).then((res) => {
                    if (res.data.success) {
                        setKppIsSuccess(true);
                        setKpps(res.data.responseData.content);
                        setDataPageable(res.data.responseData);
                    }
                    else {
                        setResponseMessage(res.data.responseMessage)
                        setKppIsSuccess(false);
                    }
                }, [currentPage, itemsPerPage]);

                KeyParameterService.viewKPPDetailsForAssignKppByPaging().then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setEmpKppOverallTargetCount(res.data.responseData.empKppOverallTargetCount)
                        setViewEmpKpps(res.data.responseData.kppResponses.content);
                    }
                    else {

                        setIsSuccess(false);
                    }

                });
            }
            );
        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }
    }


    return (
        <div className="row container-fluid">

            <div className="row">
                <div className="col-md-12">

                </div>
            </div>

            <div className="row" >
                <form className="form-horizontal">
                    <div className="col-md-10">

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Name :</label>
                            <div className="col-sm-5">
                                {empName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Employee Id :</label>
                            <div className="col-sm-5">
                                {empEId}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Role :</label>
                            <div className="col-sm-5">
                                {roleName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Department :</label>
                            <div className="col-sm-5">
                                {deptName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Designation:</label>
                            <div className="col-sm-5">
                                {desigName}
                            </div>
                        </div>




                    </div>
                </form>
            </div>

            <div className="row">


                <div className="col-md-11">
                    <div className="col-sm-5">
                        <div className="form-group">
                            <form className="form-horizontal">
                                <label className="control-label col-sm-5" htmlFor="kppObjectiveSearch">Enter KPP Objective No:</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="kppObjectiveNo" placeholder="Enter Objective No" value={kppObjectiveNo} onChange={(e) => searchKPPObjectiveNoPaging(e)} />
                                </div>
                            </form>


                        </div>
                    </div>
                    <div className="col-sm-2"><h4 className="text-center">Key Parameter List</h4></div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary col-sm-offset-1" data-toggle="modal" data-target="#advanceSearchKPP">Advance Search</button>
                        <button type="button" className="btn btn-primary col-sm-offset-1" onClick={(e) => clearSearchAssignKpp(e)}>Clear Search</button>
                        <button type="submit" className="btn btn-success col-sm-offset-1 " onClick={() => removeCookies()}> Back</button>
                    </div>

                    {kppIsSuccess ?
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr No</th>
                                    <th>Action</th>
                                    <th>Overall Target</th>
                                    <th>Overall Weightage</th>
                                    <th>KPP Objective No</th>
                                    <th>KPP Objective</th>
                                    <th>Performance Indicator</th>


                                    <th>Target Period</th>
                                    <th>UOM</th>

                                    <th className="text-center">Rating 5</th>
                                    <th className="text-center">Rating 4</th>
                                    <th className="text-center">Rating 3</th>
                                    <th className="text-center">Rating 2</th>
                                    <th className="text-center">Rating 1</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    kpps.map(
                                        (kpp, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={kpp.kppId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center"> <button type="submit" className="btn btn-info" onClick={(e) => saveKPPDetailsForEmployee(e, kpp.kppId)}>Assign</button></td>
                                                <td className="text-center">

                                                    <input type="number" className="form-control" defaultValue={0} max={100} min={0} onChange={(e) => setOverallTarget(e.target.value)} />
                                                </td>
                                                <td className="text-center">
                                                    <input type="number" className="form-control" defaultValue={0} max={100} min={0} onChange={(e) => setOverallWeightage(e.target.value)} />
                                                </td>
                                                <td className="text-justify">{kpp.kppObjectiveNo}</td>
                                                <td className="text-justify">{kpp.kppObjective}</td>
                                                <td className="text-justify">{kpp.kppPerformanceIndi}</td>
                                                <td className="text-center">{kpp.kppTargetPeriod}</td>

                                                <td className="text-center">{kpp.kppUoM}</td>

                                                <td className="text-center">{kpp.kppRating1}</td>
                                                <td className="text-center">{kpp.kppRating2}</td>
                                                <td className="text-center">{kpp.kppRating3}</td>
                                                <td className="text-center">{kpp.kppRating4}</td>
                                                <td className="text-center">{kpp.kppRating5}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        : <h3>{responseMessage}</h3>}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={dataPageable.totalPages || 10}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>

            </div>


            <div className="col-md-10">
                <div className="row">

                    <h4>View Assign Employee KPP</h4>
                    {isSuccess ?
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr No</th>
                                    <th>Action</th>
                                    <th>KPP Objective No</th>
                                    <th>KPP Objective</th>
                                    <th>Performance Indicator</th>

                                    <th>Overall Target</th>
                                    <th>Target Period</th>
                                    <th>UOM</th>
                                    <th>Overall Weightage</th>
                                    <th className="text-center">Rating 5</th>
                                    <th className="text-center">Rating 4</th>
                                    <th className="text-center">Rating 3</th>
                                    <th className="text-center">Rating 2</th>
                                    <th className="text-center">Rating 1</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    viewEmpKpps.map(
                                        (kpp, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={kpp.kppId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center"> <button type="submit" className="btn btn-info" onClick={(e) => deleteKPPDetailsForEmployee(kpp.kppId, kpp.kppOverallTarget, kpp.kppOverallWeightage)}>Remove</button></td>
                                                <td className="text-justify">{kpp.kppObjectiveNo}</td>
                                                <td className="text-justify">{kpp.kppObjective}</td>
                                                <td className="text-justify">{kpp.kppPerformanceIndi}</td>
                                                <td className="text-center">{kpp.kppOverallTarget}</td>
                                                <td className="text-center">{kpp.kppTargetPeriod}</td>
                                                <td className="text-center">{kpp.kppUoM}</td>
                                                <td className="text-center">{kpp.kppOverallWeightage}</td>
                                                <td className="text-center">{kpp.kppRating1}</td>
                                                <td className="text-center">{kpp.kppRating2}</td>
                                                <td className="text-center">{kpp.kppRating3}</td>
                                                <td className="text-center">{kpp.kppRating4}</td>
                                                <td className="text-center">{kpp.kppRating5}</td>
                                            </tr>


                                    )
                                }


                            </tbody>
                        </table>
                        : <h3>No KPP Set to Employee</h3>}
                    <h3>Total Kpp Target assign : {empKppOverallTargetCount}</h3>
                </div>

            </div>


            {/* Modal for Advance search for employee details */}
            <div className="modal fade" id="advanceSearchKPP" role="dialog">
                <form className="form-horizontal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Advance Search KPP</h4>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Objevtive No :</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="kppObjectiveNo" placeholder="Enter Objective No" value={kppObjectiveNo} onChange={(e) => setKppObjectiveNo(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Objevtive Name :</label>
                                        <div className="col-sm-8">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="kppObjective" placeholder="Enter Objective No" value={kppObjective} onChange={(e) => setKppObjective(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Objevtive Indicator :</label>
                                        <div className="col-sm-8">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="kppPerformanceIndica" placeholder="Enter Objective No" value={kppPerformanceIndica} onChange={(e) => setKppPerformanceIndica(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => advanceSearchEmployeeKpp(e)}>Search</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
}