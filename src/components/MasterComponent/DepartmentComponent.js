import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import DepartmentService from "../../services/MasterService/DepartmentService";
import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import PaginationComponent from '../PaginationComponent/PaginationComponent';
export default function DepartmentComponent() {


    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [deptMailId, setDeptMailId] = useState('');
    const [remark, setRemark] = useState('');

    const [deptNameSearch, setDeptNameSearch] = useState('');

    const [departments, setDepartments] = useState([])



    const updatedDept = ['Human Resource', 'General Manager'];
    const [roles, setRoles] = useState([])

    const [message, setMessage] = useState('');
    const [saveDepatmentAlert, setSaveDepatmentAlert] = useState(false);
    const [deleteDepatmentAlert, setDeleteDepatmentAlert] = useState(false);
    const [updateDeptAlert, setUpdateDeptAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)
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
    const handleClose = () => {

        setSaveDepatmentAlert(false);
        setUpdateDeptAlert(false)
        setDeleteDepatmentAlert(false)
        setDeptName('');
        setDeptMailId('')
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        const data = {
            currentPage,
            itemsPerPage
        }
        DepartmentService.getDepartmentDetailsByPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setDepartments(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }

        });
    }, [currentPage, itemsPerPage]);



    //search department by it's name
    const searchDeptName = (e) => {
        let deptName = e.target.value
        const data = {
            currentPage,
            itemsPerPage,
            deptName
        }
        setDeptNameSearch(e.target.value)
        DepartmentService.getDepartmentDetailsByDeptNamePaging(data).then((res) => {

            if (res.data.success) {
                setIsSuccess(true);
                setDepartments(res.data.responseData.content?.filter((item) => item.roleId !== 1));
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        }, [currentPage, itemsPerPage]);
    }

    const saveDepartment = (e) => {
        e.preventDefault()
        const data = {
            currentPage,
            itemsPerPage
        }
        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let department = { deptName, deptMailId, remark, statusCd, employeeId };

        DepartmentService.saveDepartmentDetails(department).then(res => {

            DepartmentService.getDepartmentDetailsByPaging(data).then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setDepartments(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                }
                else {
                    setResponseMessage(res.data.responseMessage)
                    setIsSuccess(false);
                }

            }, [currentPage, itemsPerPage]);
            setSaveDepatmentAlert(false);

        }
        );
        // window.location.reload(); 
    }

    const showDepartmentById = (e) => {

        DepartmentService.getDepartmentById(e).then(res => {
            let department = res.data;
            setDeptId(department.deptId)
            setDeptName(department.deptName)
            setDeptMailId(department.deptMailId)
            setRemark(department.remark)
        }
        );
        // window.location.reload(); 
    }



    const deleteDepartmentById = (e) => {
        const data = {
            currentPage,
            itemsPerPage
        }
        if (window.confirm("Do you want to delete this Department details ?")) {
            DepartmentService.deleteDepartmentById(e).then(res => {
                DepartmentService.getDepartmentDetailsByPaging(data).then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setDepartments(res.data.responseData.content);
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
        setUpdateDeptAlert(false);
    }


    const updateDepartment = (e) => {

        e.preventDefault()
        const data = {
            currentPage,
            itemsPerPage
        }
        let statusCd = 'A';
        let department = { deptId, deptName, deptMailId, remark, statusCd };

        DepartmentService.updateDepartmentDetails(department).then(res => {
            DepartmentService.getDepartmentDetailsByPaging(data).then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setDepartments(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                }
                else {
                    setResponseMessage(res.data.responseMessage)
                    setIsSuccess(false);
                }

            }, [currentPage, itemsPerPage]);

        }

        );
        setUpdateDeptAlert(false);
    }

    //upload excel data for department
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch(BASE_URL_API + '/department/upload-department', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                // Handle response
                alert("Department uploaded successfully")
                DepartmentService.getDepartmentDetailsByPaging().then((res) => {
                    setDepartments(res.data.responseData.content);

                });
            })
            .catch(error => {
                // Handle error
                setMessage('An error occurred while uploading the file.');
            });
    };

    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Department List</h2>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="form-group">
                                    <form className="form-horizontal" encType="multipart/form-data">
                                        <label className="control-label col-sm-4" htmlFor="deptNameSearch"> Department Name:</label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" id="deptNameSearch" placeholder="Enter Department Name" onChange={(e) => searchDeptName(e)} value={deptNameSearch} />
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="col-sm-6" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveDepartment">Add Department</button>
                                <button type="button" className="col-sm-offset-1 btn btn-primary" data-toggle="modal" data-target="#uploadExcelDepartment">Upload Excel</button>
                            </div>
                        </div>
                        <div className="row">
                            {isSuccess ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr No</th>
                                            <th className="text-center">Department Name</th>
                                            <th className="text-center">Department Mail Id</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            departments.map(
                                                (department, index) =>   //index is inbuilt variable of map started with 0
                                                    <tr key={department.deptId}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{department.deptName}</td>
                                                        <td>{department.deptMailId}</td>


                                                        <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => showDepartmentById(department.deptId)}>Update</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteDepartmentById(department.deptId)}>Delete</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showDepartmentById(department.deptId)}>View</button></td>
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
                    <div className="col-md-2"></div>

                </div>



                {/* Modal for upload excel of department details */}
                <div className="modal fade" id="uploadExcelDepartment" role="dialog">
                    <form className="form-horizontal" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Upload Department</h4>
                                </div>
                                <div className="modal-body">
                                    <div> <input type="hidden" id="deptId" name="deptId" value={deptId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Select file:</label>
                                        <div className="col-sm-8">
                                            <input type="file" id="file" name="file" />
                                        </div>
                                    </div>


                                </div>
                                <div className="modal-footer">
                                    <input type="submit" id="file" name="file" value={"Upload"} className="btn btn-primary" />
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>



                {/* Modal for save department details */}
                <div className="modal fade" id="saveDepartment" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Department</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">

                                    <div> <input type="hidden" id="deptId" name="deptId" value={deptId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Enter Department Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="deptName" placeholder="Enter Department Name here" value={deptName} onChange={(e) => setDeptName(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptMailId">Enter Department Mail Id:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="deptMailId" placeholder="Enter Department Mail id here" value={deptMailId} onChange={(e) => setDeptMailId(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveDepatmentAlert(true)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Modal for update user details */}
                <div className="modal fade" id="updateDepartment" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Department</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="deptId" name="deptId" value={deptId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Enter Department Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="deptName" placeholder="Enter Department Name here" value={deptName} onChange={(e) => setDeptName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptMailId">Enter Department Mail Id:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="deptMailId" placeholder="Enter Department Name here" value={deptMailId} onChange={(e) => setDeptMailId(e.target.value)} />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setUpdateDeptAlert(true)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Modal for show data when user click on view button */}
                <div className="modal fade" id="showData" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Department Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">


                                    <div> <input type="hidden" id="deptId" name="deptId" value={deptId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Department Name:</label>
                                        <div className="col-sm-8">
                                            {deptName}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Department Mail Id:</label>
                                        <div className="col-sm-8">
                                            {deptMailId}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk" >Remark :</label>
                                        <div className="col-sm-8">
                                            {remark}
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {saveDepatmentAlert && (
                <AlertboxComponent
                    show={saveDepatmentAlert}
                    title="danger"
                    message="Do you want to save department"
                    onOk={saveDepartment}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}


            {updateDeptAlert && (
                <AlertboxComponent
                    show={updateDeptAlert}
                    title="danger"
                    message="Do you want to update department"
                    onOk={updateDepartment}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );
}