import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import RegionService from "../../services/MasterService/RegionService";
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent';

export default function RegionComponent() {
    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');

    const [remark, setRemark] = useState('');

    const [regions, setRegions] = useState([])

    const [saveRegionAlert, setSaveRegionAlert] = useState(false);
    const [deleteRegionAlert, setDeleteRegionAlert] = useState(false);
    const [updatRegionAlert, setUpdateRegionAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)
    const handleClose = () => {

        setSaveRegionAlert(false);
        setDeleteRegionAlert(false)
        setUpdateRegionAlert(false)
        setRegionName('');
        setRemark('');
    };

    //loading all department and roles while page loading at first time
    useEffect(() => {
        RegionService.getRegionsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setRegions(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }
        });
    }, []);


    const saveRegion = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let createdUserId = Cookies.get('empId');
        let region = { regionName, remark, statusCd, createdUserId };

        RegionService.saveRegionDetails(region).then(res => {

            RegionService.getRegionsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setRegions(res.data.responseData.content);
                    setRegionName('');
                    setRemark('');
                }
                else {
                    setIsSuccess(false);
                }

            });

        }
        );
        setSaveRegionAlert(false);
    }

    const showRegionById = (e) => {

        RegionService.getRegionsById(e).then(res => {

            setRegionId(res.data.responseData.regionId)
            setRegionName(res.data.responseData.regionName)
            setRemark(res.data.responseData.remark)

        }
        );
        // window.location.reload(); 
    }


    const deleteRegionById = (e) => {

        if (window.confirm("Do you want to delete this Region ?")) {

            RegionService.deleteRegionById(e).then(res => {
                RegionService.getRegionsByPaging().then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setRegions(res.data.responseData.content);
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
        setDeleteRegionAlert(false);
    }

    const updateRegion = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId');
        let region = { regionId, regionName, remark, statusCd, employeeId };

        RegionService.updateRegion(region).then(res => {
            RegionService.getRegionsByPaging().then((res) => {
                setRegions(res.data.responseData.content);

            });
        }
        );
        setUpdateRegionAlert(false);
    }



    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Region List</h2>
                    <div className="col-md-2"></div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-5">

                            </div>
                            <div className="col-sm-6" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveRegion">Add Region</button>

                            </div>
                        </div>
                        <div className="row">
                            {isSuccess ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr No</th>
                                            <th className="text-center">Region Name</th>

                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            regions.map(
                                                (region, index) =>   //index is inbuilt variable of map started with 0
                                                    <tr key={region.regionId}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{region.regionName}</td>

                                                        <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => showRegionById(region.regionId)}>Update</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteRegionById(region.regionId)}>Delete</button>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                : <h4>Region name is not available</h4>}
                        </div>

                    </div>
                    <div className="col-md-2"></div>

                </div>

                {/* Modal for save department details */}
                <div className="modal fade" id="saveRegion" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Regions</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">


                                    <div> <input type="hidden" id="deptId" name="deptId" value={regionId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Enter Region Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="deptName" placeholder="Enter Region Name here" value={regionName} onChange={(e) => setRegionName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveRegionAlert(true)} > Submit</button>
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
                                <h4 className="modal-title">Update Region</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="regionId" name="regionId" value={regionId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="regionName">Enter Region Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="regionName" placeholder="Enter Region Name here" value={regionName} onChange={(e) => setRegionName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateRegion(e)} > Submit</button>
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
                                    <div> <input type="hidden" id="roleId" name="regionId" value={regionId} /></div>


                                    <div> <input type="hidden" id="regionName" name="regionName" value={regionName} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="regionName" >Region Name:</label>
                                        <div className="col-sm-8">
                                            {regionName}
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

            {saveRegionAlert && (
                <AlertboxComponent
                    show={saveRegionAlert}
                    title="danger"
                    message="Do you want to update Region?"
                    onOk={saveRegion}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {updatRegionAlert && (
                <AlertboxComponent
                    show={updatRegionAlert}
                    title="danger"
                    message="Do you want to update Region?"
                    onOk={updateRegion}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {deleteRegionAlert && (
                <AlertboxComponent
                    show={deleteRegionAlert}
                    title="danger"
                    message="Do you want to delete Region?"
                    onOk={deleteRegionById}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );
}