import React, { useEffect, useState } from "react";
import DepartmentService from "../../services/MasterService/DepartmentService";

import SiteService from "../../services/MasterService/SiteService";
import RegionService from "../../services/MasterService/RegionService";
import AlertboxComponent from "../AlertboxComponent/AlertboxComponent";

export default function SiteComponent() {
    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [remark, setRemark] = useState('');

    const [siteSeaech, setSiteSearch] = useState('');

    const [sites, setSites] = useState([])

    const [regions, setRegions] = useState([])

    const [saveSiteAlert, setSaveSiteAlert] = useState(false);
    const [deleteSiteAlert, setDeleteSiteAlert] = useState(false);
    const [updatSiteAlert, setUpdateSiteAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true)
    const handleClose = () => {

        setSaveSiteAlert(false);
        setDeleteSiteAlert(false)
        setUpdateSiteAlert(false)
        setSiteName('');
        setRemark('');
    };


    //loading all department and roles while page loading at first time
    useEffect(() => {
        SiteService.getSiteDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setSites(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }

        });

        RegionService.ddRegions().then((res) => {
            setRegions(res.data);
            setRegionId(res.data?.[0].regionId)
        });
    }, []);

    //for role change
    const onRegionChangeHandler = (value) => {
        let regionId = value

        setRegionId(regionId);
    };

    const saveSite = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let site = { regionId, siteName, remark, statusCd };

        SiteService.saveSiteDetails(site).then(res => {
            SiteService.getSiteDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setSites(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setSiteName('');
            setRemark('');
        }
        );
        setSaveSiteAlert(false);
    }

    const showSiteById = (e) => {

        SiteService.getSiteById(e).then(res => {
            let site = res.data;
            setSiteId(site.siteId)
            setSiteName(site.siteName)
            setRegionId(site.regionId)
            setRegionName(site.regionName)
            setRemark(site.remark)
        }
        );
    }


    const deleteSiteById = (e) => {

        if (window.confirm("Do you want to delete this Site Name ?")) {

            SiteService.deleteSiteById(e).then(res => {
                SiteService.getSiteDetailsByPaging().then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setSites(res.data.responseData.content);
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
        setUpdateSiteAlert(false);

    }

    const updateSiteDetails = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let site = { siteId, regionId, siteName, remark, statusCd };

        SiteService.updateSiteDetails(site).then(res => {
            SiteService.getSiteDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setSites(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });

        }
        );
        setUpdateSiteAlert(false);
    }

    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Site List</h2>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="row">

                            <div className="col-sm-6 col-sm-offset-5" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveSite">Add Site</button>
                            </div>
                        </div>
                        <div className="row">
                            {isSuccess ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr No</th>
                                            <th className="text-center">Region Name</th>
                                            <th className="text-center">Site Name</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sites.map(
                                                (site, index) =>   //index is inbuilt variable of map started with 0
                                                    <tr key={site.siteId}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{site.regionName}</td>
                                                        <td>{site.siteName}</td>

                                                        <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => showSiteById(site.siteId)}>Update</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteSiteById(site.siteId)}>Delete</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showSiteById(site.siteId)}>View</button></td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                : <h4>Site name is not available</h4>}
                        </div>

                    </div>
                    <div className="col-md-2"></div>

                </div>

                {/* Modal for save department details */}
                <div className="modal fade" id="saveSite" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Site</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="regionId">Select Region Name:</label>
                                        <div className="col-sm-8">
                                            <select className="form-control" id="regionId" onChange={(e) => onRegionChangeHandler(e.target.value)}>
                                                {
                                                    regions.map(
                                                        region =>
                                                            <option key={region.regionId} value={region.regionId}>{region.regionName}</option>
                                                    )
                                                };

                                            </select>
                                        </div>
                                    </div>

                                    <div> <input type="hidden" id="siteId" name="siteId" value={siteId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="siteName">Enter Site Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="siteName" placeholder="Enter Site Name here" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveSiteAlert(true)} > Submit</button>
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
                                <h4 className="modal-title">Update Site Information</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="siteId" name="siteId" value={siteId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="siteName">Enter Site Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="siteName" placeholder="Enter Site Name here" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateSiteDetails(e)} > Submit</button>
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
                                    <div> <input type="hidden" id="regionId" name="regionId" value={regionId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="siteName" >Region Name:</label>
                                        <div className="col-sm-8">
                                            {regionName}
                                        </div>
                                    </div>

                                    <div> <input type="hidden" id="deptId" name="siteId" value={siteId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="siteName" >Site Name:</label>
                                        <div className="col-sm-8">
                                            {siteName}
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

            {saveSiteAlert && (
                <AlertboxComponent
                    show={saveSiteAlert}
                    title="danger"
                    message="Do you want to save Site"
                    onOk={saveSite}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



            {updatSiteAlert && (
                <AlertboxComponent
                    show={updatSiteAlert}
                    title="danger"
                    message="Do you want to update Site"
                    onOk={updateSiteDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {deleteSiteAlert && (
                <AlertboxComponent
                    show={deleteSiteAlert}
                    title="danger"
                    message="Do you want to Delete Site"
                    onOk={deleteSiteById}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );
}