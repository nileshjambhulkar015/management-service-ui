import React, { useEffect, useState } from "react";
import KeyParameterService from "../../services/KeyParameterService";
import UoMService from "../../services/MasterService/UoMService";
import { BASE_URL_API } from "../../services/URLConstants";
import AlertboxComponent from "../AlertboxComponent/AlertboxComponent";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

export default function KeyParameterComponent() {
    const [kppId, setKppId] = useState('');
    const [kppObjectiveNo, setKppObjectiveNo] = useState('');
    const [kppObjective, setKppObjective] = useState('');
    const [kppPerformanceIndi, setKppPerformanceIndi] = useState('');
    const [kppTargetPeriod, setKppTargetPeriod] = useState('');
    const [uomId, setUomId] = useState();
    const [uomName, setUomName] = useState();

    const [kppRating1, setKppRating1] = useState('');
    const [kppRating2, setKppRating2] = useState('');
    const [kppRating3, setKppRating3] = useState('');
    const [kppRating4, setKppRating4] = useState('');
    const [kppRating5, setKppRating5] = useState('');
    const [remark, setRemark] = useState('');
    const [isSuccess, setIsSuccess] = useState(true)

    const [kppObjectiveNoSearch, setKppObjectiveNoSearch] = useState('');
    const [kpps, setKpps] = useState([])
    const [uoms, setUoms] = useState([])

    const [saveKPPAlert, setSaveKPPAlert] = useState(false);
    const [deleteKPPAlert, setDeleteKPPAlert] = useState(false);
    const [updatKPPAlert, setUpdateKPPAlert] = useState(false);
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

        setSaveKPPAlert(false);
        setDeleteKPPAlert(false)
        setUpdateKPPAlert(false)

    };


    useEffect(() => {
        const data = {
            currentPage,
            itemsPerPage
        }
        KeyParameterService.getKPPDetailsByPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setKpps(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        });

        UoMService.ddAllUoM().then((res) => {
            setUoms(res.data);
            setUomId(res.data?.[0]?.uomId)
        });

    }, [currentPage, itemsPerPage]);


    const searchByKppObjectiveNo = (e) => {
        let kppObjectiveNo = e.target.value;
        const data = {
            currentPage,
            itemsPerPage,
            kppObjectiveNo
        }
        setKppObjectiveNoSearch(e.target.value)
        KeyParameterService.getKPPDetailsByKppObjectiveNoPaging(data).then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setKpps(res.data.responseData.content);
                setDataPageable(res.data.responseData);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        }, [currentPage, itemsPerPage]);
    }

    //show kpp details when click on view button
    const showKppById = (e) => {
        KeyParameterService.getKppById(e).then(res => {
            let kpp = res.data;

            setKppId(kpp.kppId)
            setKppObjectiveNo(kpp.kppObjectiveNo)
            setKppObjective(kpp.kppObjective)
            setKppPerformanceIndi(kpp.kppPerformanceIndi)
            setKppTargetPeriod(kpp.kppTargetPeriod)
            setUomId(kpp.uomId)
            setUomName(kpp.uomName)
            setKppRating1(kpp.kppRating1)
            setKppRating2(kpp.kppRating2)
            setKppRating3(kpp.kppRating3)
            setKppRating4(kpp.kppRating4)
            setKppRating5(kpp.kppRating5)
            setRemark(kpp.remark)
        }
        );
        // window.location.reload(); 
    }

    //for role , department and designation
    const handleUOMIdChange = (value) => {
        if (value == "Select UOM") {
            value = null;
        }
        setUomId(value)
    }



    const saveKPPDetails = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let kpp = { kppObjectiveNo, kppObjective, kppPerformanceIndi, kppTargetPeriod, uomId, kppRating1, kppRating2, kppRating3, kppRating4, kppRating5, remark, statusCd };
        const data = {
            currentPage,
            itemsPerPage
        }

        KeyParameterService.saveKPPDetails(kpp).then(res => {
            if (res.data.success) {

                KeyParameterService.getKPPDetailsByPaging(data).then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setKpps(res.data.responseData.content);
                        setDataPageable(res.data.responseData);
                        setKppObjectiveNo('')
                        setKppObjective('')
                        setKppPerformanceIndi('')
                        setKppTargetPeriod('')
                        setUomName('')
                        setKppRating1('')
                        setKppRating2('')
                        setKppRating3('')
                        setKppRating4('')
                        setKppRating5('')
                        setRemark('')
                    }
                    else {
                        setResponseMessage(res.data.responseMessage)
                        setIsSuccess(false);
                    }
                }, [currentPage, itemsPerPage]);
            }
            else {
                alert(kppObjectiveNo + " " + res.data.responseMessage)
            }
        }
        );
        setSaveKPPAlert(false)
    }



    const deleteKppById = (e) => {
        const data = {
            currentPage,
            itemsPerPage
        }
        if (window.confirm("Do you want to delete this KPP ?")) {

            KeyParameterService.deleteKppById(e).then(res => {
                KeyParameterService.getKPPDetailsByPaging(data).then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setKpps(res.data.responseData.content);
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
        setDeleteKPPAlert(false)
    }

    const updateKppDetails = (e) => {

        e.preventDefault()
        const data = {
            currentPage,
            itemsPerPage
        }
        let statusCd = 'A';
        let updateKpp = { kppId, kppObjectiveNo, kppObjective, kppPerformanceIndi, kppTargetPeriod, uomId, kppRating1, kppRating2, kppRating3, kppRating4, kppRating5, remark, statusCd };

        KeyParameterService.updateKppDetails(updateKpp).then(res => {
            KeyParameterService.getKPPDetailsByPaging(data).then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setKpps(res.data.responseData.content);
                    setDataPageable(res.data.responseData);
                }
                else {
                    setResponseMessage(res.data.responseMessage)
                    setIsSuccess(false);
                }
            }, [currentPage, itemsPerPage]);

        }
        );
        setUpdateKPPAlert(false)

    }

    //upload excel data for KPP
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch(BASE_URL_API + '/key-perform-parameter/upload-kpp', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                // Handle response
                alert("KPP uploaded successfully")
                KeyParameterService.getKPPDetailsByPaging().then((res) => {
                    setKpps(res.data.responseData.content);
                });
            })
            .catch(error => {
                // Handle error
                alert('An error occurred while uploading the file.');
            });
    };


    return (
        <React.Fragment>
            <div className="row">
                <h2 className="text-center">Key Parameter List</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="form-group">
                                <form className="form-horizontal">
                                    <label className="control-label col-sm-5" htmlFor="kppObjectiveSearch">Enter KPP Objective No:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" id="kppObjectiveNoSearch" placeholder="Enter Objective No" value={kppObjectiveNoSearch} onChange={(e) => searchByKppObjectiveNo(e)} />
                                    </div>
                                </form>


                            </div>
                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveKpp">Add Key Parameter</button>
                            <button type="button" className="col-sm-offset-1 btn btn-primary" data-toggle="modal" data-target="#uploadExcelKpp">Upload Excel</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>

                                        <th className="text-center">KPP Objective No</th>
                                        <th className="text-center">UoM Name</th>
                                        <th className="text-center">KPP Objective</th>
                                        <th className="text-center">Performance Indicator</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        kpps.map(
                                            (kpp, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={kpp.kppId}>
                                                    <td className="text-center">{index + 1}</td>

                                                    <td className="text-center">{kpp.kppObjectiveNo}</td>
                                                    <td className="text-center">{kpp.uomName}</td>
                                                    <td>{kpp.kppObjective}</td>
                                                    <td >{kpp.kppPerformanceIndi}</td>
                                                    <td className="col-sm-3"> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateKpp" onClick={() => showKppById(kpp.kppId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteKppById(kpp.kppId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showKpp" onClick={() => showKppById(kpp.kppId)}>View</button></td>

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
                <div className="col-md-1"></div>


                {/* Modal for upload excel of KPP details */}
                <div className="modal fade" id="uploadExcelKpp" role="dialog">
                    <form className="form-horizontal" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Upload KPP</h4>
                                </div>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="file">Select file:</label>
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

                {/** Save Kpp details */}
                <div className="modal fade" id="saveKpp" role="dialog">
                    <div className="modal-dialog modal-lg">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Key Parameter</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective No:</label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" id="kppObjectiveNo" value={kppObjectiveNo} onChange={(e) => setKppObjectiveNo(e.target.value)} placeholder="Enter KPP Objective Number here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective:</label>
                                        <div className="col-sm-8">
                                            <textarea row="4" className="form-control" id="kppObjective" value={kppObjective} onChange={(e) => setKppObjective(e.target.value)} placeholder="KPP Objective here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppPerformanceIndi">Kpp Performance Indicator:</label>
                                        <div className="col-sm-8">
                                            <textarea row="4" className="form-control" id="kppPerformanceIndi" value={kppPerformanceIndi} onChange={(e) => setKppPerformanceIndi(e.target.value)} placeholder="Enter KPP Performance Infdicator here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-4" htmlFor="kppTargetPeriod">Target Period:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppTargetPeriod" value={kppTargetPeriod} onChange={(e) => setKppTargetPeriod(e.target.value)} placeholder="Enter KPP Kpp Target Period here" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppUoM">Unit of Measurement:</label>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <select className="form-control" id="uomId" onChange={(e) => handleUOMIdChange(e.target.value)}>

                                                        {
                                                            uoms.map(
                                                                uom =>
                                                                    <option key={uom.uomId} value={uom.uomId}>{uom.uomName}</option>
                                                            )


                                                        };

                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating1">Rating 1:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating1" value={kppRating1} onChange={(e) => setKppRating1(e.target.value)} placeholder="Enter KPP Rating 5 here" />
                                            </div>
                                            <label className="control-label col-sm-3" htmlFor="kppRating1">Rating 2:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating2" value={kppRating2} onChange={(e) => setKppRating2(e.target.value)} placeholder="Enter KPP Rating 4 here" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating3">Rating 3:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating3" value={kppRating3} onChange={(e) => setKppRating3(e.target.value)} placeholder="Enter KPP Rating 3 here" />
                                            </div>
                                            <label className="control-label col-sm-3" htmlFor="kppRating1">Rating 4:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating4" value={kppRating4} onChange={(e) => setKppRating4(e.target.value)} placeholder="Enter KPP Rating 2 here" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating5">Rating 5:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating5" value={kppRating5} onChange={(e) => setKppRating5(e.target.value)} placeholder="Enter KPP Rating 1 here" />
                                            </div>

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            <textarea row="4" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here" />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveKPPAlert(true)}> Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/**Update Kpp */}
                <div className="modal fade" id="updateKpp" role="dialog">
                    <div className="modal-dialog modal-lg">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Key Parameter</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="kppId" name="kppId" value={kppId} /></div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective No:</label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" id="kppObjectiveNo" value={kppObjectiveNo} disabled placeholder="Enter KPP Objective Number here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective:</label>
                                        <div className="col-sm-8">
                                            <textarea row="4" className="form-control" id="kppObjective" value={kppObjective} onChange={(e) => setKppObjective(e.target.value)} placeholder="KPP Objective here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppPerformanceIndi">Kpp Performance Indicator:</label>
                                        <div className="col-sm-8">
                                            <textarea row="4" className="form-control" id="kppPerformanceIndi" value={kppPerformanceIndi} onChange={(e) => setKppPerformanceIndi(e.target.value)} placeholder="Enter KPP Performance Infdicator here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3" htmlFor="kppTargetPeriod">Target Period:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppTargetPeriod" value={kppTargetPeriod} onChange={(e) => setKppTargetPeriod(e.target.value)} placeholder="Enter KPP Kpp Target Period here" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating1">Rating 1:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating1" value={kppRating1} onChange={(e) => setKppRating1(e.target.value)} placeholder="Enter KPP Rating 1 here" />
                                            </div>
                                            <label className="control-label col-sm-3" htmlFor="kppRating1">Rating 2:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating2" value={kppRating2} onChange={(e) => setKppRating2(e.target.value)} placeholder="Enter KPP Rating 2 here" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating3">Rating 3:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating3" value={kppRating3} onChange={(e) => setKppRating3(e.target.value)} placeholder="Enter KPP Rating 3 here" />
                                            </div>
                                            <label className="control-label col-sm-3" htmlFor="kppRating1">Rating 4:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating4" value={kppRating4} onChange={(e) => setKppRating4(e.target.value)} placeholder="Enter KPP Rating 4 here" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating5">Rating 5:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" id="kppRating5" value={kppRating5} onChange={(e) => setKppRating5(e.target.value)} placeholder="Enter KPP Rating 5 here" />
                                            </div>

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            <textarea row="4" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here" />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateKppDetails(e)}> Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/** show KPP details */}
                <div className="modal fade" id="showKpp" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Key Parameter Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective Number:</label>
                                        <div className="col-sm-8">
                                            {kppObjectiveNo}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective:</label>
                                        <div className="col-sm-8">
                                            {kppObjective}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="kppPerformanceIndi">Kpp Performance Indicator:</label>
                                        <div className="col-sm-8">
                                            {kppPerformanceIndi}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">

                                            <label className="control-label col-sm-3" htmlFor="kppTargetPeriod">Target Period:</label>
                                            <div className="col-sm-2">
                                                {kppTargetPeriod}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="uomId">Unit of Measurement:</label>
                                            <div className="col-sm-2">
                                                {uomName}
                                            </div>

                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating1">Rating 1:</label>
                                            <div className="col-sm-2">
                                                {kppRating1}
                                            </div>
                                            <label className="control-label col-sm-3" htmlFor="kppRating2">Rating 2:</label>
                                            <div className="col-sm-2">
                                                {kppRating2}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating3">Rating 3:</label>
                                            <div className="col-sm-2">
                                                {kppRating3}
                                            </div>
                                            <label className="control-label col-sm-3" htmlFor="kppRating4">Rating 4:</label>
                                            <div className="col-sm-2">
                                                {kppRating4}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating5">Rating 5:</label>
                                            <div className="col-sm-2">
                                                {kppRating5}
                                            </div>

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

            {saveKPPAlert && (
                <AlertboxComponent
                    show={saveKPPAlert}
                    title="danger"
                    message="Do you want to save KPP details"
                    onOk={saveKPPDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {updatKPPAlert && (
                <AlertboxComponent
                    show={updatKPPAlert}
                    title="danger"
                    message="Do you want to update KPP details"
                    onOk={updateKppDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {deleteKPPAlert && (
                <AlertboxComponent
                    show={deleteKPPAlert}
                    title="danger"
                    message="Do you want to delete KPP details"
                    onOk={deleteKppById}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );
}