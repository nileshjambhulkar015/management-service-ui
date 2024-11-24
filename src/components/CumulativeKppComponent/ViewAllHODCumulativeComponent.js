import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CumulativeService from '../../services/CumulativeService';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
export default function ViewAllHODCumulativeComponent() {

    const navigate = useNavigate();

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [isSuccess, setIsSuccess] = useState(true)
    const [employees, setEmployees] = useState([])
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

    function clearDates() {
        document.getElementById("fromDate").value = "";
        document.getElementById("toDate").value = "";
    }
    const loadCumulativeData = () => {
        const data = {
            currentPage,
            itemsPerPage
        }
        CumulativeService.getOverallHODCumulative(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setEmployees(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                //  alert("Kpp is not approved for month");
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }

        }).catch((err) => {
            alert(err.response.data.details)
        });
    }

    useEffect(() => {
        loadCumulativeData();
    }, [currentPage, itemsPerPage]);


    const getKPPDetailsByDate = (e) => {
        const data = {
            currentPage,
            itemsPerPage,
            fromDate,
            toDate
        }
        CumulativeService.getOverallHODCumulativeByDates_ADMIN(data).then((res) => {
            if (res.data.success) {
                setEmployees(res.data.responseData.content);
                setDataPageable(res.data.responseData);
                setIsSuccess(true);
            } else {
                //  alert("Kpp is not found for month");
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }


        }, [currentPage, itemsPerPage]);

    }

    const navigateToViewEmployeeRating = (empId) => {

        Cookies.set('viewSingleHODIdForKppRatings', empId);
        navigate(`/viewSingleHODRatings`, { replace: true })
    }

    function clearDates() {
        document.getElementById("fromDate").value = "";
        document.getElementById("toDate").value = "";
    }


    return (
        <div className="row">
            <h3 className="text-center">View HOD KPP Cumulative</h3>
            <div className="form-group">
                <form className="form-horizontal" encType="multipart/form-data">
                    <label className="control-label col-sm-1" htmlFor="deptNameSearch"> From Date:</label>
                    <div className="col-sm-2">
                        <input type="date" className="form-control" id="fromDate" defaultValue={fromDate} name="fromDate" onChange={(e) => setFromDate(e.target.value)} />
                    </div>

                    <label className="control-label col-sm-1" htmlFor="deptNameSearch"> To Date:</label>
                    <div className="col-sm-2">
                        <input type="date" className="form-control" id="toDate" defaultValue={toDate} name="toDate" onChange={(e) => setToDate(e.target.value)} />
                    </div>
                </form>
                <button type="submit" className="btn btn-primary" onClick={(e) => getKPPDetailsByDate(fromDate, toDate)}>Search</button>
                <button type="submit" className="btn btn-primary col-sm-offset-1" onClick={(e) => {
                    loadCumulativeData();
                    clearDates();
                }}>Clear</button>
            </div>


            <div className="col-sm-8">
                {isSuccess ?
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">Sr No</th>
                                <th className="text-center">Employee Name</th>
                                <th className="text-center">Employee Id</th>
                                <th className="text-center">Department Name</th>
                                <th className="text-center">Employee Designation</th>
                                <th className="text-center">Total Ratings</th>
                                <th className="text-center">Total Month</th>
                                <th className="text-center">Average Cumulative</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(
                                    (employee, index) =>   //index is inbuilt variable of map started with 0
                                        <tr key={employee.empId}>
                                            <td className="text-center">{index + 1}</td>

                                            <td className="text-center">{employee.empName}</td>
                                            <td className="text-center">{employee.empEId}</td>
                                            <td className="text-center">{employee.deptName}</td>
                                            <td className="text-center">{employee.desigName}</td>
                                            <td className="text-center">{employee.totalHodKppRatings}</td>
                                            <td className="text-center">{employee.totalMonths}</td>
                                            <td className="text-center">{employee.avgTotalHodKppRatings}</td>

                                            <td className="text-center">


                                                <button type="submit" className="btn btn-info" onClick={() => navigateToViewEmployeeRating(employee.empId)}>View Details</button>

                                            </td>
                                        </tr>

                                )

                            }
                        </tbody>

                    </table>
                    : <h1>{responseMessage}</h1>}
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