
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";

import { BASE_URL_API } from '../../services/URLConstants';
import AnnouncementTypeService from '../../services/MasterService/AnnouncementTypeService';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
export default function AnnouncementComponent() {


    const [announTypeId, setAnnounTypeId] = useState('');
    const [announTypeName, setAnnounTypeName] = useState('');
    const [remark, setRemark] = useState('');

    const [deptNameSearch, setDeptNameSearch] = useState('');

    const [annonTypes, setAnnonTypes] = useState([])

    const updatedDept = ['Human Resource', 'General Manager'];
    const [roles, setRoles] = useState([])

    const [message, setMessage] = useState('');

    const [saveAnnTypeAlert, setSaveAnnTypeAlert] = useState(false);
    const [deleteAnnTypeAlert, setDeleteAnnTypeAlert] = useState(false);
    const [updatAnnTypeAlert, setUpdateAnnTypeAlert] = useState(false);
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

        setSaveAnnTypeAlert(false);
        setDeleteAnnTypeAlert(false)
        setUpdateAnnTypeAlert(false)
        setAnnounTypeName('');
        setRemark('');
    };

    //loading all department and roles while page loading at first time
    useEffect(() => {
        const data = {
            currentPage,
            itemsPerPage
        }
        AnnouncementTypeService.getAnnouncementTypeDetailsByPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setAnnonTypes(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }

        });
    }, [currentPage, itemsPerPage]);

    const saveAnnouncementType = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let department = { announTypeName, remark, statusCd, employeeId };

        const data = {
            currentPage,
            itemsPerPage
        }
        AnnouncementTypeService.saveAnnouncementTypeDetails(department).then(res => {
            if (res.data.success) {
                AnnouncementTypeService.getAnnouncementTypeDetailsByPaging(data).then((res) => {
                    if (res.data.success) {
                        setAnnonTypes(res.data.responseData.content);
                        setDataPageable(res.data.responseData);
                        setAnnounTypeName('');
                        setRemark('');
                    }
                    else {
                        setResponseMessage(res.data.responseMessage)
                        setIsSuccess(false);
                    }

                }, [currentPage, itemsPerPage]);
            }
            else {
                alert(res.data.responseMessage)
            }

        }
        );
        setSaveAnnTypeAlert(false);
    }

    const showAnnouncementTypeById = (e) => {

        AnnouncementTypeService.getAnnouncementTypeById(e).then(res => {

            let announcementType = res.data;
            setAnnounTypeId(announcementType.announTypeId)
            setAnnounTypeName(announcementType.announTypeName)
            setRemark(announcementType.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteAnnouncementTypeById = (e) => {
        const data = {
            currentPage,
            itemsPerPage
        }
        if (window.confirm("Do you want to delete this Announcement Type name ?")) {
            AnnouncementTypeService.deleteAnnouncementTypeById(e).then(res => {
                AnnouncementTypeService.getAnnouncementTypeDetailsByPaging(data).then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setAnnonTypes(res.data.responseData.content);
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
        setDeleteAnnTypeAlert(false)
    }

    const updateAnnouncementType = (e) => {

        e.preventDefault()
        const data = {
            currentPage,
            itemsPerPage
        }
        let statusCd = 'A';
        let department = { announTypeId, announTypeName, remark, statusCd };

        AnnouncementTypeService.updateDepartmentDetails(department).then(res => {
            AnnouncementTypeService.getDepartmentDetailsByPaging(data).then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setAnnonTypes(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                    setDataPageable(res.data.responseData);
                }
                else {
                    setResponseMessage(res.data.responseMessage)
                    setIsSuccess(false);
                }

            }, [currentPage, itemsPerPage]);

        }
        );
        setUpdateAnnTypeAlert(false)
    }


    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Announcement Type List</h2>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-sm-5">

                            </div>
                            <div className="col-sm-6" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveAnnouncementType">Add Announcement Type</button>

                            </div>
                        </div>
                        <div className="row">
                            {isSuccess ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr No</th>
                                            <th className="text-center">Announcement Type Name</th>

                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            annonTypes.map(
                                                (annonType, index) =>   //index is inbuilt variable of map started with 0
                                                    <tr key={annonType.announTypeId}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{annonType.announTypeName}</td>


                                                        <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => showAnnouncementTypeById(annonType.announTypeId)}>Update</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteAnnouncementTypeById(annonType.announTypeId)}>Delete</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showAnnouncementTypeById(annonType.announTypeId)} >View</button></td>
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




                {/* Modal for save department details */}
                <div className="modal fade" id="saveAnnouncementType" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Announcement Type</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">

                                    <div> <input type="hidden" id="annonTypeId" name="annonTypeId" value={announTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="announTypeName">Enter Announcement Type Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="announTypeName" placeholder="Enter Announcement Type here" value={announTypeName} onChange={(e) => setAnnounTypeName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveAnnTypeAlert(true)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Modal for update user details */}
                <div className="modal fade" id="updateAnnouncementType" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Announcement Type</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="annonTypeId" name="annonTypeId" value={announTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="announTypeName">Enter Announcement Type Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="announTypeName" placeholder="Enter Announcement Type Name here" value={announTypeName} onChange={(e) => setAnnounTypeName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateAnnouncementType(e)} > Submit</button>
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
                                <h4 className="modal-title">Announcement Type Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">


                                    <div> <input type="hidden" id="announTypeId" name="announTypeId" value={announTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="annonTypeName" >Announcement Type Name:</label>
                                        <div className="col-sm-8">
                                            {announTypeName}
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

            {saveAnnTypeAlert && (
                <AlertboxComponent
                    show={saveAnnTypeAlert}
                    title="danger"
                    message="Do you want to save Announcement Type"
                    onOk={saveAnnouncementType}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {updatAnnTypeAlert && (
                <AlertboxComponent
                    show={updatAnnTypeAlert}
                    title="danger"
                    message="Do you want to update Announcement Type"
                    onOk={updateAnnouncementType}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {deleteAnnTypeAlert && (
                <AlertboxComponent
                    show={deleteAnnTypeAlert}
                    title="danger"
                    message="Do you want to delete Announcement Type"
                    onOk={deleteAnnouncementTypeById}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );
}