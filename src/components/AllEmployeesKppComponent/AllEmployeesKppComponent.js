import React, { useEffect, useState } from 'react';

import AllEmployeesKppService from '../../services/AllEmployeesKppService';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import PaginationComponent from '../PaginationComponent/PaginationComponent';
export default function AllEmployeesKppComponent() {

  
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(true)
    const [empKppStatus, setEmpKppStatus] = useState('In-Progress')
    const [empResponses, setEmpResponses] = useState([])

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
        AllEmployeesKppService.getEmployeeDetailsByPagination(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
            setEmpResponses(res.data.responseData.content);
            setDataPageable(res.data.responseData);

        }
        else {
            setIsSuccess(false);
        }
        });
    }, [currentPage, itemsPerPage]);

    const onOptionChangeHandler = (event) => {
        setEmpKppStatus(event);
    };

    const searchByEKpp = (e) => {
        const data = {
            currentPage,
            itemsPerPage,
            empKppStatus
        }
        console.log("Data ", data)
    
        AllEmployeesKppService.getEmployeeByStatusByPagination(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
            setEmpResponses(res.data.responseData.content);      
            setDataPageable(res.data.responseData);

        }
        else {
            setIsSuccess(false);
        }    
        }, [currentPage, itemsPerPage]);
    }

    const navigateToUpdateRating=(empId)=>{
        Cookies.set('empIdForKppRatings', empId);
        navigate(`/addEmployeeKppRating`, { replace: true })       
    }

    const completeEmpKpp = (e) => {
        AllEmployeesKppService.completeEmpKppGM(e).then(res => {            
        }
        );
    }

    return (
        <div className='container-fluid'>
            <div className="row">

                <div className="form-group">

                    <div className="row">
                        <form className="form-horizontal">
                            <label className="control-label col-sm-2" htmlFor="empKppStatus">KPP Status:</label>
                            <div className="col-sm-2">
                                <select className="form-control" name="empKppStatus" id="empKppStatus" onChange={(e) => onOptionChangeHandler(e.target.value)} defaultValue={empKppStatus} >
                                    <option value="All">All</option>
                                    <option value="In-Progress">In-Progress</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                </select>
                            </div>
                        </form>
                        <button type="submit" className="btn btn-success" onClick={(e) => searchByEKpp(e)} > Submit</button>
                    </div>
                </div>

                <form className="form-horizontal">
                {isSuccess ?
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className='text-center'>Sr No</th>
                                <th className='text-center'>Employee Name</th>
                                <th className='text-center'>Employee Id</th>
                                <th className='text-center'>Department Name</th>
                                <th className='text-center'>Designation Name</th>
                                <th className='text-center'>Employee Rating</th>
                                <th className='text-center'>Hod Rating</th>
                                <th className='text-center'>GM Rating</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empResponses.map(
                                    (empResponse, index) =>
                                        <tr key={empResponse.empId} className="text-justify">
                                            <td className='text-center'>{index + 1}</td>
                                            <td>{empResponse.empFirstName + ' ' + empResponse.empMiddleName + ' ' + empResponse.empLastName}</td>
                                            <td className='text-center'>{empResponse.empEId}</td>
                                            <td className='text-center'>{empResponse.deptName}</td>
                                            <td className='text-center' >{empResponse.desigName}</td>
                                            <td className='text-center'>{empResponse.empOverallAchive}</td>
                                            <td className='text-center'>{empResponse.hodOverallAchieve}</td>
                                            <td className='text-center'>{empResponse.gmOverallAchieve}</td>
                                            <td className='text-center'>{empResponse.gmKppStatus}</td>
                                            <td>
                                            <button type="submit" className="btn btn-success" disabled={empResponse.empEKppStatus === "Pending"} onClick={() => navigateToUpdateRating(empResponse.empId)} >View</button> 
                                            <button type="submit" className="btn col-sm-offset-1 btn-success" disabled={empResponse.gmKppStatus === "Pending" || empResponse.gmKppStatus !== "Approved"}  onClick={() => completeEmpKpp(empResponse.empId)} >Finish</button>
                                            </td>
                                            </tr>
                                )
                            }
                        </tbody>
                    </table>
                    : <h4>Employee KPP is not available</h4>}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={dataPageable.totalPages || 10}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />

                </form>

            </div>

        </div>


    );
}