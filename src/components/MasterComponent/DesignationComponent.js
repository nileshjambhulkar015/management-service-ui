import React, { useEffect, useState } from "react";
import DesignationService from "../../services/MasterService/DesignationService";
import DepartmentService from "../../services/MasterService/DepartmentService";
import { BASE_URL_API } from "../../services/URLConstants";
import AlertboxComponent from "../AlertboxComponent/AlertboxComponent";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
export default function DesignationComponent() {
    const [desigId, setDesigId] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigName, setDesigName] = useState('');
    const [remark, setRemark] = useState('');

    const [desigNameSearch, setDesigNameSearch] = useState('');

    const [designations, setDesignations] = useState([])
    const [departments, setDepartments] = useState([])
    const [saveDesignationAlert, setSaveDesignationAlert] = useState(false);
    const [deleteDesignationAlert, setDeleteDesignationAlert] = useState(false);
    const [updatDesignationAlert, setUpdateDesignationAlert] = useState(false);

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

        setSaveDesignationAlert(false);
        setDeleteDesignationAlert(false)
        setUpdateDesignationAlert(false)
        setDesigName('');
        setRemark('');
    };
    useEffect(() => {

        setDesigName('')
        setRemark('')
        const data = {
            currentPage,
            itemsPerPage
        }

        DesignationService.getDesignationDetailsByPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setDesignations(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        });

        /* DepartmentService.ddAllDepartmentExceptGM().then((res) => {
             setDepartments(res.data);
             setDeptId(res.data?.[0].deptId)
 
         });*/
        DesignationService.ddAllDepartmentDetails().then((res) => {
            setDepartments(res.data);
            setDeptId(res.data?.[0].deptId)
        });
    }, [currentPage, itemsPerPage]);

    const searchDesigName = (e) => {
        let desigName = e.target.value
        setDesigNameSearch(e.target.value)
        const data = {
            currentPage,
            itemsPerPage,
            desigName
        }
        DesignationService.getDesignationDetailsByDesigNamePaging(data).then((res) => {

            if (res.data.success) {
                setIsSuccess(true);
                setDesignations(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        }, [currentPage, itemsPerPage]);
    }
    //for all department by role id


    const saveDesignationDetails = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let designation = { deptId, desigName, remark, statusCd };
        const data = {
            currentPage,
            itemsPerPage
        }
        DesignationService.saveDesignationDetails(designation).then(res => {
            DesignationService.getDesignationDetailsByPaging(data).then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setDesignations(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                    setDesigName('')
                    setRemark('')
                }
                else {
                    setResponseMessage(res.data.responseMessage)
                    setIsSuccess(false);
                }

            }, [currentPage, itemsPerPage]);

        }
        );
        setSaveDesignationAlert(false)
    }


    const showDesignationById = (e) => {

        DesignationService.getDesignationById(e).then(res => {
            let designation = res.data;


            setDesigId(designation.desigId)
            setDeptId(designation.deptId)
            setDeptName(designation.deptName)
            setDesigName(designation.desigName)
            setRemark(designation.remark)

        }
        );
        // window.location.reload(); 
    }

    const updateDesignationDetails = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let updateDesignation = { desigId, deptId, desigName, remark, statusCd };

        DesignationService.updateDesignationDetails(updateDesignation).then(res => {
            DesignationService.getDesignationDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setDesignations(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                }
                else {
                    setResponseMessage(res.data.responseMessage)
                    setIsSuccess(false);
                }
            }, [currentPage, itemsPerPage]);

        }
        );
        setUpdateDesignationAlert(false)

    }

    const deleteDesignationById = (e) => {

        if (window.confirm("Do you want to delete this Designation Name ?")) {

            DesignationService.deleteDesignationById(e).then(res => {
                DesignationService.getDesignationDetailsByPaging().then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setDesignations(res.data.responseData.content);
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
        setDeleteDesignationAlert(false)
    }


    //upload excel data for designation
    const handleSubmit = (event) => {

        event.preventDefault();
        const formData = new FormData(event.target);
        fetch(BASE_URL_API + '/designation/upload-designation', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                // Handle response
                alert("Designation uploaded successfully")
                DesignationService.getDesignationDetailsByPaging().then((res) => {
                    setDesignations(res.data.responseData.content);

                });

            })
            .catch(error => {
                // Handle error
                alert('An error occurred while uploading the file.');
            });
    };


    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Designation List</h2>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="form-group">
                                    <form className="form-horizontal">
                                        <label className="control-label col-sm-5" htmlFor="desigNameSearch">Enter Designation Name:</label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" id="desigNameSearch" placeholder="Enter Designation Name" value={desigNameSearch} onChange={(e) => searchDesigName(e)} />
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="col-sm-6" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveDesignation">Add Designation</button>
                                <button type="button" className="col-sm-offset-1 btn btn-primary" data-toggle="modal" data-target="#uploadExcelDesignation">Upload Excel</button>
                            </div>
                        </div>
                        <div className="row">
                            {isSuccess ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr No</th>

                                            <th className="text-center">Department Name</th>
                                            <th className="text-center">Designation Name</th>

                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            designations.map(
                                                (designation, index) =>   //index is inbuilt variable of map started with 0
                                                    <tr key={designation.desigId}>
                                                        <td className="text-center">{index + 1}</td>

                                                        <td>{designation.deptName}</td>
                                                        <td>{designation.desigName}</td>

                                                        <td className="col-sm-3"> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDesignation" onClick={() => showDesignationById(designation.desigId)}>Update</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteDesignationById(designation.desigId)}>Delete</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showDesignation" onClick={() => showDesignationById(designation.desigId)}>View</button></td>
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

                {/* Modal for upload excel of designation details */}
                <div className="modal fade" id="uploadExcelDesignation" role="dialog">
                    <form className="form-horizontal" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Upload Designations</h4>
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
                                    <input type="submit" value={"Upload"} className="btn btn-primary" />
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                {/**Save designation */}

                <div className="modal fade" id="saveDesignation" role="dialog">
                    <div className="modal-dialog">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Designation</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Select Department Name:</label>
                                        <div className="col-sm-8">
                                            <select className="form-control" id="deptId" onChange={(e) => setDeptId(e.target.value)}>

                                                {
                                                    departments.map(
                                                        department =>
                                                            <option key={department.deptId} value={department.deptId}>{department.deptName}</option>
                                                    )
                                                };

                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Designation Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="desigName" value={desigName} onChange={(e) => setDesigName(e.target.value)} placeholder="Enter Designation Name here" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            <textarea row="5" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here" />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveDesignationAlert(true)}> Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/**Update Designation */}

                <div className="modal fade" id="updateDesignation" role="dialog">
                    <div className="modal-dialog">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Designation</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" >

                                    <div> <input type="hidden" id="desigId" name="desigId" value={desigId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Department Name:</label>
                                        <div className="col-sm-8">
                                            {deptName}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Designation Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="desigName" value={desigName} onChange={(e) => setDesigName(e.target.value)} placeholder="Enter Designation Name here" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            <textarea row="5" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here" />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateDesignationDetails(e)}> Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>


                {/**show designations */}

                <div className="modal fade" id="showDesignation" role="dialog">
                    <div className="modal-dialog">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">View Designation</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" action="/action_page.php">

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Department Name:</label>
                                        <div className="col-sm-8">
                                            {deptName}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Designation Name:</label>
                                        <div className="col-sm-8">
                                            {desigName}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
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

            {saveDesignationAlert && (
                <AlertboxComponent
                    show={saveDesignationAlert}
                    title="danger"
                    message="Do you want to save Designation"
                    onOk={saveDesignationDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
            {updatDesignationAlert && (
                <AlertboxComponent
                    show={updatDesignationAlert}
                    title="danger"
                    message="Do you want to update Designation"
                    onOk={updateDesignationDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
            {deleteDesignationAlert && (
                <AlertboxComponent
                    show={deleteDesignationAlert}
                    title="danger"
                    message="Do you want to delete Designation"
                    onOk={deleteDesignationById}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );
}