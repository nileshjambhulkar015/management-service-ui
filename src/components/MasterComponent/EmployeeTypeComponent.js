import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import EmployeeTypeService from '../../services/MasterService/EmployeeTypeService';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent';

export default function EmployeeTypeComponent() {


    const [empTypeId, setEmpTypeId] = useState('');
    const [empTypeName, setEmpTypeName] = useState('');
    const [remark, setRemark] = useState('');

    const [deptNameSearch, setDeptNameSearch] = useState('');

    const [empTypes, setEmpTypes] = useState([])

    const [saveEmployeeTypeAlert, setSaveEmployeeTypeAlert] = useState(false);
    const [deleteEmployeeTypeAlert, setDeleteEmployeeTypeAlert] = useState(false);
    const [updatEmployeeTypeAlert, setUpdateEmployeeTypeAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)
    const handleClose = () => {

        setSaveEmployeeTypeAlert(false);
        setDeleteEmployeeTypeAlert(false)
        setUpdateEmployeeTypeAlert(false)
        setEmpTypeName('');
        setRemark('');
    };

    //loading all department and roles while page loading at first time
    useEffect(() => {
        EmployeeTypeService.getEmployeeTypeDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setEmpTypes(res.data.responseData);
            }
            else {
                setIsSuccess(false);
            }

        });
    }, []);



    //search department by it's name
    const searchDeptName = (e) => {
        EmployeeTypeService.getEmployeeTypeDetailsByPaging(e).then((res) => {
            setEmpTypes(res.data.responseData);

        });
    }

    const saveEmployeeType = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let employeeTypes = { empTypeName, remark, statusCd, employeeId };

        EmployeeTypeService.saveEmployeeTypeDetails(employeeTypes).then(res => {

            EmployeeTypeService.getEmployeeTypeDetailsByPaging(e).then((res) => {
                setEmpTypes(res.data.responseData);
                setEmpTypeName('');
                setRemark('');
            });
        }
        );
        setSaveEmployeeTypeAlert(false)
    }

    const showEmployeeTypeById = (e) => {

        EmployeeTypeService.getEmployeeTypeById(e).then(res => {
            let employeeType = res.data;
            console.log("employeeType :", employeeType)

            setEmpTypeId(employeeType.empTypeId)
            setEmpTypeName(employeeType.empTypeName)
            setRemark(employeeType.remark)


        }
        );
        // window.location.reload(); 
    }


    const deleteEmployeeTypeById = (e) => {

        if (window.confirm("Do you want to delete this Employee Type ?")) {

            EmployeeTypeService.deleteEmployeeTypeById(e).then(res => {
                EmployeeTypeService.getEmployeeTypeDetailsByPaging().then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setEmpTypes(res.data.responseData);
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
        setDeleteEmployeeTypeAlert(false)
    }

    const updateEmployeeType = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let employeeType = { empTypeId, empTypeName, remark, statusCd };

        EmployeeTypeComponent.updateDepartment(employeeType).then(res => {
            EmployeeTypeService.getEmployeeTypeDetailsByPaging(e).then((res) => {
                setEmpTypes(res.data.responseData);

            });

        }
        );
        setUpdateEmployeeTypeAlert(false)
    }
    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Employee Type List</h2>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="form-group">
                                    <form className="form-horizontal" encType="multipart/form-data">
                                        <label className="control-label col-sm-5" htmlFor="deptNameSearch"> Employee Type Name:</label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" id="deptNameSearch" placeholder="Enter Employee Type Name" value={deptNameSearch} onChange={(e) => setDeptNameSearch(e.target.value)} />
                                        </div>
                                    </form>
                                    <button type="submit" className="btn btn-primary" onClick={() => searchDeptName(deptNameSearch)}>Search</button>
                                </div>
                            </div>
                            <div className="col-sm-6" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveEmployeeType">Add Employee Type</button>
                            </div>
                        </div>
                        <div className="row">
                            {isSuccess ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr No</th>
                                            <th className="text-center">Employee Type Name</th>

                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            empTypes.map(
                                                (employeeType, index) =>   //index is inbuilt variable of map started with 0
                                                    <tr key={employeeType.empTypeId}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{employeeType.empTypeName}</td>


                                                        <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateEmployeeType" onClick={() => showEmployeeTypeById(employeeType.empTypeId)}>Update</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteEmployeeTypeById(employeeType.empTypeId)}>Delete</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showEmployeeType" onClick={() => showEmployeeTypeById(employeeType.empTypeId)}>View</button></td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                : <h4>Employee Type name is not available</h4>}
                        </div>

                    </div>
                    <div className="col-md-2"></div>

                </div>




                {/* Modal for save department details */}
                <div className="modal fade" id="saveEmployeeType" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Employee Type</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">

                                    <div> <input type="hidden" id="deptId" name="empTypeId" value={empTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="empTypeName">Enter Employee Type Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="empTypeName" placeholder="Enter Employee Type Name here" value={empTypeName} onChange={(e) => setEmpTypeName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveEmployeeTypeAlert(true)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Modal for update user details */}
                <div className="modal fade" id="updateEmployeeType" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Employee Type</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="deptId" name="empTypeId" value={empTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="empTypeName">Enter Employee Type Name:</label>
                                        <div className="col-sm-8">

                                            <input type="text" className="form-control" id="empTypeName" placeholder="Enter Employee Type Name here" value={empTypeName} onChange={(e) => setEmpTypeName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateEmployeeType(e)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Modal for show data when user click on view button */}
                <div className="modal fade" id="showEmployeeType" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Employee Type Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">


                                    <div> <input type="hidden" id="deptId" name="empTypeId" value={empTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="empTypeName" >Employee Type Name:</label>
                                        <div className="col-sm-8">
                                            {empTypeName}
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

            {saveEmployeeTypeAlert && (
                <AlertboxComponent
                    show={saveEmployeeTypeAlert}
                    title="danger"
                    message="Do you want to save Employee Type"
                    onOk={saveEmployeeType}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {updatEmployeeTypeAlert && (
                <AlertboxComponent
                    show={updatEmployeeTypeAlert}
                    title="danger"
                    message="Do you want to update Employee Type"
                    onOk={updateEmployeeType}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {deleteEmployeeTypeAlert && (
                <AlertboxComponent
                    show={deleteEmployeeTypeAlert}
                    title="danger"
                    message="Do you want to delete Employee Type"
                    onOk={deleteEmployeeTypeById}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );
}