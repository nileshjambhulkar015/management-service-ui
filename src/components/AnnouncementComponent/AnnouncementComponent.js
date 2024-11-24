import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import DepartmentService from "../../services/MasterService/DepartmentService";

import AnnouncementService from '../../services/AnnouncementService';
import AnnouncementTypeService from '../../services/MasterService/AnnouncementTypeService';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
export default function AnnouncementComponent() {

    const [announId, setAnnounId] = useState('');
    const [announStartDate, setAnnounStartDate] = useState('');
    const [announEndDate, setAnnounEndDate] = useState('');
    const [announCreatedByEmpId, setAnnounCreatedByEmpId] = useState('');
    const [announCreatedByEmpEId, setAnnounCreatedByEmpEId] = useState('');
    const [announCreatedByEmpName, setAnnounCreatedByEmpName] = useState('');

    const [announCreatedByRoleId, setAnnounCreatedByRoleId] = useState('');
    const [announCreatedByRoleName, setAnnounCreatedByRoleName] = useState('');
    const [announCreatedByDeptId, setAnnounCreatedByDeptId] = useState('');
    const [announCreatedByDeptName, setAnnounCreatedByDeptName] = useState('');
    const [announCreatedByDesigId, setAnnounCreatedByDesigId] = useState('');
    const [announCreatedByDesigName, setAnnounCreatedByDesigName] = useState('');
    const [announVenue, setAnnounVenue] = useState('');
    const [announTitle, setAnnounTitle] = useState('');
    const [announDescription, setAnnounDescription] = useState('');
    const [announStatus, setAnnounStatus] = useState('');

    const [announTypeId, setAnnounTypeId] = useState('');
    const [announTypeName, setAnnounTypeName] = useState('');
    const [announTypes, setAnnounTypes] = useState([])

    const [asAnnounTypeId, setAsAnnounTypeId] = useState('');
    const [asAnnounStatus, setAsAnnounStatus] = useState('');

    const [asAnnounFromDate, setAsAnnounFromDate] = useState('');
    const [asAnnounToDate, setAsAnnounToDate] = useState('');
    const [asAnnounTypes, setAsAnnounTypes] = useState([])
    const [isSuccess, setIsSuccess] = useState(true)
    const [remark, setRemark] = useState('');


    const [responseMessage, setResponseMessage] = useState('')
    const [announcements, setAnnouncements] = useState([])

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
    //loading all department and roles while page loading at first time
    useEffect(() => {
        const data = {
            currentPage,
            itemsPerPage
        }
        AnnouncementService.getAnnouncementByPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setAnnouncements(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }

        });

        AnnouncementTypeService.getAllAnnouncementType().then((res) => {
            setAnnounTypes(res.data);
            setAnnounTypeId(res.data?.[0].announTypeId)
        });

        AnnouncementService.ddAllAnnouncementTypeFromAnnoun().then((res) => {
            setAsAnnounTypes(res.data);
            setAsAnnounTypeId(res.data?.[0]?.announTypeId)
        });


    }, [currentPage, itemsPerPage]);


    // Advance search employee
    const advSearchAnnouncement = (e) => {

        e.preventDefault()
        let statusCd = 'A'
        if (asAnnounTypeId == "Select Announcement Type") {
            asAnnounTypeId = null;
        }

        if (asAnnounStatus == "Select Announcement Status") {
            asAnnounStatus = 'null';
        }
        let announcementAdvSearch = { asAnnounFromDate, asAnnounToDate, asAnnounStatus, asAnnounTypeId, statusCd };
        const data = {
            currentPage,
            itemsPerPage,
            announcementAdvSearch
        }

        AnnouncementService.advanceSearchAnnouncementDetails(data).then(res => {
            if (res.data.success) {
                setIsSuccess(true);
                setAnnouncements(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        }
        );
    }

    const onAsAnnouncementStatusChangeHandler = (event) => {

        setAsAnnounStatus(event);
    };

    const showAnnouncementById = (e) => {

        AnnouncementService.getAnnouncementById(e).then(res => {
            let announcement = res.data;
            setAnnounId(announcement.announId)
            setAnnounTypeId(announTypeId)
            setAnnounTypeName(announTypeName)
            setAnnounStartDate(announcement.announStartDate)
            setAnnounEndDate(announcement.announEndDate)
            setAnnounCreatedByEmpId(announcement.announCreatedByEmpId)
            setAnnounCreatedByEmpEId(announcement.announCreatedByEmpEId)
            setAnnounCreatedByEmpName(announcement.announCreatedByEmpName)
            setAnnounCreatedByRoleId(announcement.announCreatedByRoleId)
            setAnnounCreatedByRoleName(announcement.announCreatedByRoleName)
            setAnnounCreatedByDeptId(announcement.announCreatedByDeptId)
            setAnnounCreatedByDeptName(announcement.announCreatedByDeptName)
            setAnnounCreatedByDesigId(announcement.announCreatedByDesigId)
            setAnnounCreatedByDesigName(announcement.announCreatedByDesigName)
            setAnnounVenue(announcement.announVenue)
            setAnnounTitle(announcement.announTitle)
            setAnnounDescription(announcement.announDescription)
            setAnnounStatus(announcement.announStatus)


        }
        );
    }

    const cancelAnnouncement = (e) => {
        const data = {
            currentPage,
            itemsPerPage
        }
        if (window.confirm("Do you want to cancel this Announcement ?")) {
            AnnouncementService.getAnnouncementById(e).then(res => {

                let exsitingAnnouncement = res.data;
                let announId = exsitingAnnouncement.announId;
                let announStatus = 'Cancel'
                let statusCd = 'I';
                let announcement = { announId, announStatus, statusCd };

                AnnouncementService.cancelAnnouncement(announcement).then(res => {
                    AnnouncementService.getAnnouncementByPaging().then((res) => {
                        if (res.data.success) {
                            setIsSuccess(true);
                            setAnnouncements(res.data.responseData.content);
                            setDataPageable(res.data.responseData);
                        }
                        else {
                            setResponseMessage(res.data.responseMessage)
                            setIsSuccess(false);
                        }
                    }, [currentPage, itemsPerPage]);

                }
                );
            });

        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }

    }


    const saveAnnouncement = (e) => {
        e.preventDefault()
        const data = {
            currentPage,
            itemsPerPage
        }
        let statusCd = 'A';
        let announStatus = 'Pending'
        let employeeId = Cookies.get('empId');
        let announCreatedByEmpId = Cookies.get('empId')
        let announCreatedByEmpEId = Cookies.get('empEId')
        let announCreatedByEmpName = Cookies.get('empFirstName') + ' ' + Cookies.get('empMiddleName') + ' ' + Cookies.get('empLastName')
        let announCreatedByRoleId = Cookies.get('roleId')
        let announCreatedByRoleName = Cookies.get('roleName')
        let announCreatedByDeptId = Cookies.get('deptId')
        let announCreatedByDeptName = Cookies.get('deptName')
        let announCreatedByDesigId = Cookies.get('desigId')
        let announCreatedByDesigName = Cookies.get('desigName')

        let announcement = { announTypeId, announStartDate, announEndDate, announCreatedByEmpId, announCreatedByEmpEId, announCreatedByEmpName, announCreatedByRoleId, announCreatedByRoleName, announCreatedByDeptId, announCreatedByDeptName, announCreatedByDesigId, announCreatedByDesigName, announVenue, announTitle, announDescription, announStatus, remark, statusCd, employeeId };

        AnnouncementService.saveAnnouncementDetails(announcement).then(res => {

            AnnouncementService.getAnnouncementByPaging(data).then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setAnnouncements(res.data.responseData.content);
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


    const clearSearchData = () => {
        const data = {
            currentPage,
            itemsPerPage
        }
        AnnouncementService.getAnnouncementByPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setAnnouncements(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }

        }, [currentPage, itemsPerPage]);

    }
    return (

        <div>
            <div className="row">
                <h2 className="text-center">Announcement List</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-11" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveAnnouncement">Add Announcement</button>
                            <button type="button" className="btn btn-primary col-sm-offset-1" data-toggle="modal" data-target="#advanceSearchEmployee">Advance Search</button>
                            <button type="button" className="btn btn-primary col-sm-offset-1" onClick={() => clearSearchData()}>Clear Search</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Announcement Type</th>
                                        <th className="text-center">Organiser Name</th>
                                        <th className="text-center">Organiser Department</th>
                                        <th className="text-center">Organiser Designation</th>

                                        <th className="text-center">Start DateTime</th>
                                        <th className="text-center">End DateTime</th>
                                        <th className="text-center">Announcement Venue</th>
                                        <th className="text-center">Announcement Title</th>


                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        announcements.map(
                                            (announcement, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={announcement.announId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{announcement.announTypeName}</td>
                                                    <td>{announcement.announCreatedByEmpName}</td>
                                                    <td>{announcement.announCreatedByDeptName}</td>
                                                    <td>{announcement.announCreatedByDesigName}</td>

                                                    <td>{announcement.announStartDate}</td>
                                                    <td>{announcement.announEndDate}</td>
                                                    <td>{announcement.announVenue}</td>
                                                    <td>{announcement.announTitle}</td>

                                                    <td>

                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showAnnouncementById(announcement.announId)}>View</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" disabled={announcement?.announStatus === "Cancel"} onClick={() => cancelAnnouncement(announcement.announId)}>Cancel</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            : <h1>No Data Found</h1>}
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={dataPageable.totalPages || 10}
                            onPageChange={handlePageChange}
                            onItemsPerPageChange={handleItemsPerPageChange}
                        />
                    </div>

                </div>



                {/* Modal for Advance search for employe comlaint details */}
                <div className="modal fade" id="advanceSearchEmployee" role="dialog">
                    <form className="form-horizontal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Advance Search Complaint</h4>
                                </div>
                                <div className="modal-body">

                                    <div className="form-group">

                                        <div className="row">
                                            <label className="control-label col-sm-4" htmlFor="asAnnounFromDate">Announcement Statrt Date:</label>
                                            <div className="col-sm-5">
                                                <div className="form-group">
                                                    <input type="date" className="form-control" id="asAnnounFromDate" defaultValue={asAnnounFromDate} name="asAnnounFromDate" onChange={(e) => setAsAnnounFromDate(e.target.value)} />                                 </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label className="control-label col-sm-4" htmlFor="asAnnounToDate">Announcement End Date:</label>
                                            <div className="col-sm-5">
                                                <div className="form-group">
                                                    <input type="date" className="form-control" id="asAnnounToDate" defaultValue={asAnnounToDate} name="asAnnounToDate" onChange={(e) => setAsAnnounToDate(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>





                                        <div className="row">
                                            <label className="control-label col-sm-4" htmlFor="regionName">Announcement Type Name:</label>
                                            <div className="col-sm-5">
                                                <div className="form-group">
                                                    <select className="form-control" id="asDeptId" onChange={(e) => setAsAnnounTypeId(e.target.value)}>
                                                        <option>Select Announcement Type</option>
                                                        {
                                                            asAnnounTypes.map(
                                                                announType =>
                                                                    <option key={announType.announTypeId} value={announType.announTypeId}>{announType.announTypeName}</option>
                                                            )
                                                        };

                                                    </select>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="row">
                                            <label className="control-label col-sm-4" htmlFor="companyName">Announcement Status:</label>
                                            <div className="col-sm-5">
                                                <div className="form-group">
                                                    <select className="form-control" id="asAnnounStatus" onChange={(e) => onAsAnnouncementStatusChangeHandler(e.target.value)} defaultValue={asAnnounStatus}>
                                                        <option>Select Announcement Status</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Cancel">Cancel</option>
                                                        <option value="Resolved">Resolved</option>
                                                        <option value="Reject">Reject</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="modal-footer">

                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => advSearchAnnouncement(e)}>Search</button>



                                    <button type="button" className="btn btn-danger  col-sm-offset-1" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>


                {/* Modal for save Announcement details */}
                <div className="modal fade" id="saveAnnouncement" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Announcement</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Select Announcement Type:</label>
                                        <div className="col-sm-4">
                                            <select className="form-control" id="announTypeId" onChange={(e) => setAnnounTypeId(e.target.value)}>

                                                {
                                                    announTypes.map(
                                                        announType =>
                                                            <option key={announType.announTypeId} value={announType.announTypeId}>{announType.announTypeName}</option>
                                                    )
                                                };

                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Announcement Start Date Time:</label>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" className="form-control" defaultValue={announStartDate} name="announStartDate" onChange={(e) => setAnnounStartDate(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Announcement End Date Time:</label>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" className="form-control" id="announEndDate" defaultValue={announEndDate} name="announ" onChange={(e) => setAnnounEndDate(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Location:</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" id="announVenue" placeholder="Enter  Location here" value={announVenue} onChange={(e) => setAnnounVenue(e.target.value)} />

                                        </div>
                                    </div>





                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Title:</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" id="announTitle" placeholder="Enter  Title here" value={announTitle} onChange={(e) => setAnnounTitle(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Description:</label>
                                        <div className="col-sm-8">
                                            <textarea rows="5" className="form-control" id="announDescription" placeholder="Enter Description here" value={announDescription} onChange={(e) => setAnnounDescription(e.target.value)} />

                                        </div>
                                    </div>



                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveAnnouncement(e)} > Submit</button>
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
                                <h4 className="modal-title">Announcement Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Announcement Start Date Time:</label>
                                        <div className="col-sm-8">
                                            {announStartDate}
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Announcement End Date Time:</label>
                                        <div className="col-sm-8">
                                            {announEndDate}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Name:</label>
                                        <div className="col-sm-8">
                                            {announCreatedByEmpName}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Employee Id:</label>
                                        <div className="col-sm-8">
                                            {announCreatedByEmpEId}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organisser Department Name:</label>
                                        <div className="col-sm-8">
                                            {announCreatedByDeptName}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Designation:</label>
                                        <div className="col-sm-8">
                                            {announCreatedByDesigName}
                                        </div>
                                    </div>




                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Location:</label>
                                        <div className="col-sm-8">
                                            {announVenue}
                                        </div>
                                    </div>





                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Title:</label>
                                        <div className="col-sm-8">
                                            {announTitle}
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Description:</label>
                                        <div className="col-sm-8">
                                            {announDescription}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Status:</label>
                                        <div className="col-sm-8">
                                            {announStatus}
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


        </div>
    );
}