import React, { useEffect, useState } from "react";
import CompanyMasterService from "../../services/MasterService/CompanyMasterService";
import SiteService from "../../services/MasterService/SiteService";
import AlertboxComponent from "../AlertboxComponent/AlertboxComponent";
export default function CompanyMasterComponent() {
    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyMbNo, setCompanyMbNo] = useState('')
    const [companyFinYear, setCompanyFinYear] = useState('')
    const [remark, setRemark] = useState('');
    const [responseMessage, setResponseMessage] = useState('')

    const [regions, setRegions] = useState([])
    const [sites, setSites] = useState([])
    const [compnays, setCompanys] = useState([])

    const [saveCompanyAlert, setSaveCompanyAlert] = useState(false);
    const [deleteCompanyAlert, setDeleteCompanyAlert] = useState(false);
    const [updateCompanyAlert, setUpdateCompanyAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true)
    const handleClose = () => {

        setSaveCompanyAlert(false);
        setDeleteCompanyAlert(false)
        setUpdateCompanyAlert(false)
        setCompanyName('');
        setCompanyAddress('')
        setCompanyFinYear('')
        setCompanyMbNo('')

        setRemark('');
    };

    useEffect(() => {
        CompanyMasterService.getCompanyDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setCompanys(res.data.responseData.content);
            }
            else {
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }
        });

        SiteService.getAllRegions().then((res) => {
            setRegions(res.data);
            setRegionId(res.data?.[0]?.regionId)

            let regionId = res.data?.[0]?.regionId;

            SiteService.getSiteDetailsByRegionId(regionId).then((res1) => {
                setSites(res1.data);
                setSiteId(res1.data?.[0]?.siteId)


            });
        });
    }, []);


    //for region  change
    const regionIdChangeHandler = (value) => {
        let regionId = value;
        setRegionId(regionId);
        SiteService.getSiteDetailsByRegionId(regionId).then((res1) => {
            setSites(res1.data);
            setSiteId(res1.data?.[0]?.siteId)

        });

    };

    const siteIdChangeHandler = (value) => {
        setSiteId(value);
    };

    //for all department by role id
    useEffect((e) => {
        /* roleId && DepartmentService.getDepartmentByRoleId(roleId).then((res) => {
             setDepartments(res.data);
         });*/
    }, []);

    const saveComapnyDetails = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let company = { regionId, siteId, companyName, companyAddress, companyMbNo, companyFinYear, remark, statusCd };

        CompanyMasterService.saveCompanyDetails(company).then(res => {
            CompanyMasterService.getCompanyDetailsByPaging().then((res) => {
                setCompanys(res.data.responseData.content);

            });

        }
        );
        setCompanyName('');
        setCompanyAddress('')
        setCompanyFinYear('')
        setCompanyMbNo('')
        setSaveCompanyAlert(false)
    }


    const showCompanyById = (e) => {

        CompanyMasterService.getCompanyById(e).then(res => {
            let company = res.data;

            setRegionId(company.regionId)
            setRegionName(company.regionName)
            setSiteId(company.siteId)
            setSiteName(company.siteName)
            setCompanyId(company.companyId)
            setCompanyName(company.companyName)
            setCompanyMbNo(company.companyMbNo)
            setCompanyAddress(company.companyAddress)
            setCompanyFinYear(company.companyFinYear)
            setRemark(company.remark)

        }
        );

    }

    const updateComapnyDetails = (e) => {
        e.preventDefault()

        CompanyMasterService.getCompanyById(e).then(res => {
            let company = res.data;
            let companyId = company.companyId;
            let regionId = company.regionId;
            let siteId = company.siteId;


            let companyName = company.companyName;
            let companyAddress = company.companyAddress;
            let companyMbNo = company.companyMbNo;
            let companyFinYear = company.companyFinYear;
            let remark = company.remark;


            let statusCd = 'A';
            let updateCompany = { companyId, regionId, siteId, companyName, companyAddress, companyMbNo, companyFinYear, remark, statusCd };

            CompanyMasterService.updateCompanyDetails(updateCompany).then(res => {
                CompanyMasterService.getCompanyDetailsByPaging().then((res) => {
                    setCompanys(res.data.responseData.content);
                });
            }
            );
        }
        );
        setCompanyName('');
        setCompanyAddress('')
        setCompanyFinYear('')
        setCompanyMbNo('')
        setSaveCompanyAlert(false)

    }

    const deleteCompanyById = (e) => {

        if (window.confirm("Do you want to delete this Company ?")) {


            CompanyMasterService.deleteCompanyById(e).then(res => {
                CompanyMasterService.getCompanyDetailsByPaging().then((res) => {
                    if (res.data.success) {
                        setIsSuccess(true);
                        setCompanys(res.data.responseData.content);
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


    }


    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Company List</h2>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-sm-5">

                            </div>
                            <div className="col-sm-6" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveCompany">Add Company</button>

                            </div>
                        </div>
                        <div className="row">

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>

                                        <th>Region Name</th>
                                        <th>Site Name</th>
                                        <th>Company Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        compnays.map(
                                            (company, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={company.companyId}>
                                                    <td>{index + 1}</td>

                                                    <td>{company.regionName}</td>
                                                    <td>{company.siteName}</td>
                                                    <td>{company.companyName}</td>
                                                    <td className="col-sm-3"> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateCompany" onClick={() => showCompanyById(company.companyId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteCompanyById(company.companyId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showCompany" onClick={() => showCompanyById(company.companyId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="col-md-2"></div>

                </div>


                {/**Save designation */}
                <div className="modal fade" id="saveCompany" role="dialog">
                    <div className="modal-dialog">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Company</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="regionName">Select Region Name:</label>
                                        <div className="col-sm-8">
                                            <select className="form-control" id="regionId" onChange={(e) => regionIdChangeHandler(e.target.value)}>

                                                {
                                                    regions.map(
                                                        region =>
                                                            <option key={region.regionId} value={region.regionId}>{region.regionName}</option>
                                                    )
                                                };

                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="siteName">Select Site Name:</label>
                                        <div className="col-sm-8">
                                            <select className="form-control" id="siteId" onChange={(e) => siteIdChangeHandler(e.target.value)}>

                                                {
                                                    sites.map(
                                                        site =>
                                                            <option key={site.siteId} value={site.siteId}>{site.siteName}</option>
                                                    )
                                                };

                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyName">Company Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter Designation Name here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Company Address:</label>
                                        <div className="col-sm-8">
                                            <textarea row="5" className="form-control" id="companyAddress" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} placeholder="Enter Address here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyMbNo">Mobile Number :</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="companyMbNo" value={companyMbNo} onChange={(e) => setCompanyMbNo(e.target.value)} placeholder="Enter Mobile number here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyFinYear">Finanical Year :</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="companyFinYear" value={companyFinYear} onChange={(e) => setCompanyFinYear(e.target.value)} placeholder="Enter Designation Name here" />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveCompanyAlert(true)}> Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/**Update Company */}

                <div className="modal fade" id="updateCompany" role="dialog">
                    <div className="modal-dialog">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Company</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" >
                                    <div> <input type="hidden" id="regionId" name="regionId" value={regionId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="roleName">Region Name:</label>
                                        <div className="col-sm-8">
                                            {regionName}
                                        </div>
                                    </div>
                                    <div> <input type="hidden" id="siteId" name="siteId" value={siteId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="siteName">Site Name:</label>
                                        <div className="col-sm-8">
                                            {siteName}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Company Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter Company Name here" />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Company Address:</label>
                                        <div className="col-sm-8">
                                            <textarea row="5" className="form-control" id="companyAddress" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} placeholder="Enter Address here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyMbNo">Mobile Number :</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="companyMbNo" value={companyMbNo} onChange={(e) => setCompanyMbNo(e.target.value)} placeholder="Enter Mobile number here" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyFinYear">Finanical Year :</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="companyFinYear" value={companyFinYear} onChange={(e) => setCompanyFinYear(e.target.value)} placeholder="Enter Designation Name here" />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateComapnyDetails(e)}> Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>


                {/**show designations */}

                <div className="modal fade" id="showCompany" role="dialog">
                    <div className="modal-dialog">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">View Company</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" action="/action_page.php">
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="regionName">Region Name:</label>
                                        <div className="col-sm-8">
                                            {regionName}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="siteName">Site Name:</label>
                                        <div className="col-sm-8">
                                            {siteName}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyName">Company Name:</label>
                                        <div className="col-sm-8">
                                            {companyName}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyName">Company Address:</label>
                                        <div className="col-sm-8">
                                            {companyAddress}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyName">Mobile No:</label>
                                        <div className="col-sm-8">
                                            {companyMbNo}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="companyName">Financial Year :</label>
                                        <div className="col-sm-8">
                                            {companyFinYear}
                                        </div>


                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk">Remark:</label>
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
            {saveCompanyAlert && (
                <AlertboxComponent
                    show={saveCompanyAlert}
                    title="danger"
                    message="Do you want to save company details"
                    onOk={saveComapnyDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>

    );
}