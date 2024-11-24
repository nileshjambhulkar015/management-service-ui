import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import UoMService from '../../services/MasterService/UoMService'
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent';
import PaginationComponent from '../PaginationComponent/PaginationComponent';


export default function UoMComponent() {
    const [uomId, setUomId] = useState('');
    const [uomName, setUomName] = useState('');
    const [remark, setRemark] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(true)
    const [uoms, setUoms] = useState([])

    const [saveUOMAlert, setSaveUOMAlert] = useState(false);
    const [deleteUOMAlert, setDeleteUOMAlert] = useState(false);
    const [updatUOMAlert, setUpdateUOMAlert] = useState(false);

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

        setSaveUOMAlert(false);
        setDeleteUOMAlert(false)
        setUpdateUOMAlert(false)
        setUomName('');
        setRemark('');
    };


    //loading all department and roles while page loading at first time
    useEffect(() => {
        const data = {
            currentPage,
            itemsPerPage
        }
        UoMService.getUoMByPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setUoms(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        });
    }, [currentPage, itemsPerPage]);


    const saveUoM = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId');
        let uom = { uomName, remark, statusCd, employeeId };

        const data = {
            currentPage,
            itemsPerPage
        }
        UoMService.saveUoMDetails(uom).then(res => {

            UoMService.getUoMByPaging(data).then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setUoms(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                    setUomName('')
                    setRemark('')
                }
                else {
                    setIsSuccess(false);
                    setResponseMessage(res.data.responseMessage)
                }
            });

        }
        );
        setUomName('');
        setRemark('');
        setSaveUOMAlert(false);
    }

    const showUoMById = (e) => {

        UoMService.getUoMById(e).then(res => {

            setUomId(res.data.responseData.uomId)
            setUomName(res.data.responseData.uomName)
            setRemark(res.data.responseData.remark)

        }
        );
        // window.location.reload(); 
    }


    const deleteUOMById = (e) => {
        if (window.confirm("Do you want to delete this UOM name ?")) {

            const data = {
                currentPage,
                itemsPerPage
            }
            UoMService.deleteUOMById(e).then(res => {
                UoMService.getUoMByPaging(data).then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setUoms(res.data.responseData.content);
                        setDataPageable(res.data.responseData);
                    }
                    else {
                        setResponseMessage(res.data.responseMessage)
                        setIsSuccess(false);
                    }
                });
            }
            );

        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }
        setDeleteUOMAlert(false);
    }

    const updateUOMDetails = (e) => {

        e.preventDefault()
        const data = {
            currentPage,
            itemsPerPage
        }
        let statusCd = 'A';
        let employeeId = Cookies.get('empId');
        let region = { uomId, uomName, remark, statusCd, employeeId };

        UoMService.updateUoM(region).then(res => {
            UoMService.getUoMByPaging(data).then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setUoms(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                    setUomName('')
                    setRemark('')
                }
                else {
                    setResponseMessage(res.data.responseMessage)
                    setIsSuccess(false);
                }
            });

        }
        );

        setUpdateUOMAlert(false)

    }



    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Unit of Measure List</h2>
                    <div className="col-md-2"></div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-5">

                            </div>
                            <div className="col-sm-6" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveUoM">Add UoM</button>

                            </div>
                        </div>
                        <div className="row">
                            {isSuccess ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr No</th>
                                            <th className="text-center">UoM Name</th>

                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            uoms.map(
                                                (uom, index) =>   //index is inbuilt variable of map started with 0
                                                    <tr key={uom.uomId}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{uom.uomName}</td>

                                                        <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => showUoMById(uom.uomId)}>Update</button>
                                                            <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteUOMById(uom.uomId)}>Delete</button>
                                                        </td>
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

                {/* Modal for save UoM details */}
                <div className="modal fade" id="saveUoM" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add UoM</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Enter UoM Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="uomName" placeholder="Enter UoM Name here" value={uomName} onChange={(e) => setUomName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveUOMAlert(true)} > Submit</button>
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
                                <h4 className="modal-title">Update UoM</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="uomId" name="uomId" value={uomId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="uomName">Enter UoM Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="uomName" placeholder="Enter UoM Name here" value={uomName} onChange={(e) => setUomName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateUOMDetails(e)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {saveUOMAlert && (
                <AlertboxComponent
                    show={saveUOMAlert}
                    title="danger"
                    message="Do you want to save UOM"
                    onOk={saveUoM}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {updatUOMAlert && (
                <AlertboxComponent
                    show={updatUOMAlert}
                    title="danger"
                    message="Do you want to update UOM"
                    onOk={updateUOMDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {deleteUOMAlert && (
                <AlertboxComponent
                    show={deleteUOMAlert}
                    title="danger"
                    message="Do you want to delete UOM"
                    onOk={deleteUOMById}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

        </React.Fragment>
    );
}