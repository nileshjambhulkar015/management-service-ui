import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import FinancialYearService from '../../services/MasterService/FinancialYearService';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent';

export default function FinancialYearComponent() {


    const [finYearId, setFinYearId] = useState('');
    const [finYearName, setFinYearName] = useState('');

    const [remark, setRemark] = useState('');


    const [financialYears, setFinancialYears] = useState([])

    const [saveFinancialYearAlert, setSaveFinancialYearAlert] = useState(false);
    const [deleteFinancialYearAlert, setDeleteFinancialYearAlert] = useState(false);
    const [updatFinancialYearAlert, setUpdateFinancialYearAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)
    const handleClose = () => {

        setSaveFinancialYearAlert(false);
        setDeleteFinancialYearAlert(false)
        setUpdateFinancialYearAlert(false)
        setFinYearName('');

        setRemark('');
    };

    //loading all department and roles while page loading at first time
    useEffect(() => {
        FinancialYearService.getFinancialYearDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setFinancialYears(res.data.responseData);

            }
            else {
                setIsSuccess(false);
            }

        });
    }, []);






    const getFinancialYearById = (e) => {

        FinancialYearService.getFinancialYearById(e).then(res => {
            let financeYear = res.data;


            setFinYearId(financeYear.finYearId)
            setFinYearName(financeYear.finYearName)
            setRemark(financeYear.remark)


        }
        );
        // window.location.reload(); 
    }

    const updateFinancialYearDetails = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let financialYearUpdateRequest = { finYearId, finYearName, remark, statusCd };

        FinancialYearService.updateFinancialYearDetails(financialYearUpdateRequest).then(res => {
            FinancialYearService.getFinancialYearDetailsByPaging(e).then((res) => {
                setFinancialYears(res.data.responseData);

            });

        }
        );
        setUpdateFinancialYearAlert(false)
    }


    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Financial Year</h2>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="row">

                        </div>
                        <div className="row">
                            {isSuccess ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr No</th>
                                            <th className="text-center">Financial Year</th>

                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            financialYears.map(
                                                (financialYear, index) =>   //index is inbuilt variable of map started with 0
                                                    <tr key={financialYear.finYearId}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{financialYear.finYearName}</td>


                                                        <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateFinancialYearModal" onClick={() => getFinancialYearById(financialYear.finYearId)}>Update</button>

                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                : <h4>Financial Year is not available</h4>}
                        </div>

                    </div>
                    <div className="col-md-2"></div>

                </div>



                {/* Modal for update user details */}
                <div className="modal fade" id="updateFinancialYearModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Employee Type</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="deptId" name="finYearId" value={finYearId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="finYearName">Enter Financial Year:</label>
                                        <div className="col-sm-8">

                                            <input type="text" className="form-control" id="finYearName" placeholder="Enter Financial Year here" value={finYearName} onChange={(e) => setFinYearName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateFinancialYearDetails(e)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {updatFinancialYearAlert && (
                <AlertboxComponent
                    show={updatFinancialYearAlert}
                    title="danger"
                    message="Do you want to update Financial Year"
                    onOk={updateFinancialYearDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

        </React.Fragment>
    );
}