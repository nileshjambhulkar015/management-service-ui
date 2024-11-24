import React from 'react';
import { Form, Formik } from 'formik'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
//import EmployeeKppsService from '../../services/EmployeeKppsService';
import EmployeeKppsService from '../../services/EmployeeKppsService'
import AllHodKppService from '../../services/AllHodKppService';
import { BASE_URL_API } from '../../services/URLConstants';
const EmplyeeUpdateKppRatingsComponent = () => {

    const navigate = useNavigate();
    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [ekppMonth, setEkppMonth] = useState('');
    const [empName, setEmpName] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigName, setDesigName] = useState('');

    const [gmRemark, setGmRemark] = useState('');
    const [gmKppStatus, setGmKppStatus] = useState('Approved');

    const [totalAchivedWeight, setTotalAchivedWeight] = useState('');
    const [totalOverAllAchive, setTotalOverAllAchive] = useState('');
    const [totalOverallTaskComp, setTotalOverallTaskComp] = useState('');

    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])

    const [totalOverallRatings, setTotalOverallRatings] = useState();
    const [totalOverallPercentage, setTotalOverallPercentage] = useState();



    //for gm approved or reject status selection
    const onHodStatusChangeHandler = (event) => {
        setGmKppStatus(event);
    };

    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }

    const getAvgTotalOverallRatings = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.overallRatings || 0), 0).toFixed(1);
        const totalKpps = kppDetailsResponses?.length || 1;
        setTotalOverallRatings((sum / totalKpps).toFixed(1))
        return (sum / totalKpps).toFixed(1);
    }

    const getAvgTotalOverallPercetage = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.overallPercentage || 0), 0).toFixed(1);
        const totalKpps = kppDetailsResponses?.length || 1;
        setTotalOverallPercentage((sum / totalKpps).toFixed(1))
        return (sum / totalKpps).toFixed(1);
    }


    const sumOfGmAchivedWeight = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.gmAchivedWeight), 0).toFixed(1);
        setTotalAchivedWeight(sum)
        return sum;
    }

    const sumGmOverallAchieve = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.gmOverallAchieve), 0);
        const totalKpps = kppDetailsResponses?.length || 1;
        setTotalOverAllAchive((sum / totalKpps).toFixed(1))
        return (sum / totalKpps).toFixed(1);
    }
    const sumGmOverallTaskComp = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.gmOverallTaskComp), 0);
        const totalKpps = kppDetailsResponses?.length || 1;
        setTotalOverallTaskComp((sum / totalKpps).toFixed(1))
        return (sum / totalKpps).toFixed(1);

    }
    useEffect(() => {
        EmployeeKppsService.getKPPDetails().then((res) => {
            setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
            setEmpId(res.data.empId);
            setEmpEId(res.data.empEId);
            setEmpName(res.data.empName);
            setDeptName(res.data.deptName);
            setDesigName(res.data.desigName);

            setKppMasterResponses(res.data);
            setGmRemark(res.data.gmRemark)
            setKppDetailsResponses(res.data.kppStatusDetails)
        });
    }, []);



    const navigateBack = () => {
        navigate(`/allEmployeeKppStatus`, { replace: true })
    }

    //when GM click on finish button
    const completeEmpKpp = (e) => {
        AllHodKppService.completeEmpKppGM(e).then(res => {
            navigate(`/allEmployeeKppStatus`, { replace: true })
        }
        );
    }
    return (
        <div className='container-fluid'>
            <div className="row">
                <Formik initialValues={{
                    fields: kppDetailsResponses,
                    totalGmAchivedWeight: 0,
                    totalGmOverallAchieve: 0,
                    totalGmOverallTaskComp: 0,

                    totalOverallRatings: 0,
                    totalOverallPercentage: 0,
                }}
                    enableReinitialize={true}
                    onSubmit={(values) => {

                        const payload = { "kppUpdateRequests": values?.fields, "gmTotalAchivedWeight": totalAchivedWeight, "gmTotalOverallAchieve": totalOverAllAchive, "gmTotalOverallTaskComp": totalOverallTaskComp, "totalOverallRatings": totalOverallRatings, "totalOverallPercentage": totalOverallPercentage, gmKppStatus, gmRemark };
                        EmployeeKppsService.updateEmpApproveOrRejectByHod(payload).then(res => {
                            alert("GM KPP Ratings added");
                        });
                    }}>
                    {({ values, setFieldValue }) => {

                        const handleTodoChange = (e, i, kppId, kppOverallWeightage, empOverallAchieve, hodOverallAchieve) => {

                            const field = e.target.name?.split(".")[1];


                            kppDetailsResponses[i] = {

                                ...kppDetailsResponses[i],


                                "kppId": kppId,
                                "empId": Cookies.get('empIdForKppRatings'),

                                "gmOverallTaskComp": field === "gmOverallAchieve" && !!e.target.value ? (Number(e.target.value) / 5 * 100).toFixed(1) : 0,
                                "gmAchivedWeight": field === "gmOverallAchieve" && !!e.target.value ? ((kppOverallWeightage * (Number(e.target.value) / 5 * 100).toFixed(1)) / 100).toFixed(1) : 0,

                                "overallRatings": field === "gmOverallAchieve" && !!e.target.value ? ((Number(empOverallAchieve) + Number(hodOverallAchieve) + (Number(e.target.value))) / 3).toFixed(1) : 0,
                                "overallPercentage": field === "gmOverallAchieve" && !!e.target.value ? ((((Number(empOverallAchieve) + Number(hodOverallAchieve) + (Number(e.target.value))) / 3) / 5) * 100).toFixed(1) : 0,

                                "ekppMonth": ekppMonth,
                                [field]: parseInt(e.target.value || 0),
                            }
                            setFieldValue("totalGmOverallTaskComp", sumGmOverallTaskComp(kppDetailsResponses));
                            setFieldValue("totalGmOverallAchieve", sumGmOverallAchieve(kppDetailsResponses));
                            setFieldValue("totalGmAchivedWeight", sumOfGmAchivedWeight(kppDetailsResponses));

                            setFieldValue("totalOverallRatings", getAvgTotalOverallRatings(kppDetailsResponses));
                            setFieldValue("totalOverallPercentage", getAvgTotalOverallPercetage(kppDetailsResponses));

                            setFieldValue("fields", kppDetailsResponses)
                        };
                        return (
                            <Form className="form-horizontal">

                                <div className="form-group">
                                    <label className="control-label col-sm-1"  >Employee Name :</label>
                                    <div className="col-sm-2">
                                        {empName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-1"  >Employee Id :</label>
                                    <div className="col-sm-2">
                                        {empEId}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-1"  >Department :</label>
                                    <div className="col-sm-2">
                                        {deptName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-1"  >Designation:</label>
                                    <div className="col-sm-2">
                                        {desigName}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-1 "  >Kpp Added Date:</label>
                                    <div className="col-sm-2">
                                        {ekppMonth}
                                    </div>

                                    <button type="button" className="btn btn-success col-sm-offset-7" disabled={kppMasterResponses?.empKppStatus === "Pending"}
                                        onClick={() => { navigateBack() }}> Back</button>

                                </div>
                                <table className="table table-bordered" >

                                    <thead>
                                        <tr>
                                            <td colSpan={21} className="text-center"><b>EMPLOYEE-WISE KEY PERFORMANCE INDICATORS (KPIs) FY 2022-2023</b></td>
                                        </tr>
                                        <tr>
                                            <th rowSpan={2} className="text-center">Sr No</th>
                                            <th rowSpan={2} className="text-center">INDIVIDUAL KPI / OBJECTIVES</th>
                                            <th rowSpan={2} className="text-center">PERFORMANCE INDICATOR</th>
                                            <th rowSpan={2} colSpan={2} className="text-center">OVERALL TARGET</th>
                                            <th rowSpan={2} className="text-center">UOM</th>
                                            <th colSpan={2} className="text-center">OVERALL WEIGHTAGE TO BE 100%</th>
                                            <th rowSpan={2} className="text-center">OVERALL ACHIEVEMENT</th>
                                            <th rowSpan={2} className="text-center">% OF TOTAL TASK COMPLETED</th>

                                            <th rowSpan={2} className="text-center">Hod Achived Weightage</th>
                                            <th rowSpan={2} className="text-center">Hod Ratings</th>
                                            <th rowSpan={2} className="text-center">Hod Overall Task Completed</th>
                                            <th rowSpan={2} className="text-center">GM Achived Weightage</th>
                                            <th rowSpan={2} className="text-center">GM Ratings</th>
                                            <th rowSpan={2} className="text-center">GM Overall Task Completed</th>

                                            <th rowSpan={2} className="text-center">Overall Ratings</th>
                                            <th rowSpan={2} className="text-center">Overall Rating in %</th>
                                            <th colSpan={5} className="text-center">RATING RATIO COULD BE CHANGED AS PER TARGETS</th>
                                        </tr>
                                        <tr className="text-center">
                                            <th className="text-center">OVERALL WEIGHTAGE IN % </th>
                                            <th className="text-center">ACHIEVED WEIGHTAGE IN % </th>
                                            <th className="text-center">Rating 1</th>
                                            <th className="text-center">Rating 2</th>
                                            <th className="text-center">Rating 3</th>
                                            <th className="text-center">Rating 4</th>
                                            <th className="text-center">Rating 5</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {values?.fields?.map(
                                            (kppResponse, index) =>
                                                <tr key={kppResponse.kppId} className="text-justify">
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{kppResponse.kppObjective}</td>
                                                    <td>{kppResponse.kppPerformanceIndi}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallTarget}</td>
                                                    <td className='text-center'>{kppResponse.kppTargetPeriod}</td>
                                                    <td>{kppResponse.uomName}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallWeightage}</td>

                                                    <td className='text-center'>{kppResponse.empAchivedWeight}</td>
                                                    <td className='text-center'>{kppResponse.empOverallAchieve}</td>
                                                    <td className='text-center'>{kppResponse.empOverallTaskComp}</td>

                                                    <td className='text-center'>{kppResponse.hodAchivedWeight}</td>
                                                    <td className='text-center'>{kppResponse.hodOverallAchieve}</td>
                                                    <td className='text-center'>{kppResponse.hodOverallTaskComp}</td>

                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.gmAchivedWeight`} value={values?.fields?.[index]?.gmAchivedWeight} disabled />
                                                    </td>

                                                    <td>
                                                        <input type="number" className="form-control"
                                                            name={`${index}.gmOverallAchieve`}
                                                            min={0}
                                                            max={5}
                                                            defaultValue={values?.fields?.[index]?.gmOverallAchieve}

                                                            onKeyDown={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallWeightage, kppResponse.empOverallAchieve, kppResponse.hodOverallAchieve)}
                                                            onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallWeightage, kppResponse.empOverallAchieve, kppResponse.hodOverallAchieve)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.gmOverallTaskComp`} value={values?.fields?.[index]?.gmOverallTaskComp} disabled />
                                                    </td>


                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.overallRatings`} value={values?.fields?.[index]?.overallRatings} disabled />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.overallPercentage`} value={values?.fields?.[index]?.overallPercentage} disabled />
                                                    </td>
                                                    <td className='text-center'>{kppResponse.kppRating1}</td>
                                                    <td className='text-center'>{kppResponse.kppRating2}</td>
                                                    <td className='text-center'>{kppResponse.kppRating3}</td>
                                                    <td className='text-center'>{kppResponse.kppRating4}</td>
                                                    <td className='text-center'>{kppResponse.kppRating5}</td>

                                                </tr>
                                        )}
                                        <tr className="text-justify">
                                            <td></td>
                                            <td></td>
                                            <td className='text-right'> <label className="control-label text-right" htmlFor="reamrk">Total</label></td>
                                            <td className='text-center'></td>
                                            <td className='text-center'> </td>
                                            <td></td>
                                            <td className='text-center'></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpOverallTaskComp}</label></td>

                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodOverallTaskComp}</label></td>

                                            <td className='text-center'> <label className="control-label text-right">{values?.totalGmAchivedWeight === 0 ? sumOfGmAchivedWeight(values?.fields) : values?.totalGmAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalGmOverallAchieve === 0 ? sumGmOverallAchieve(values?.fields) : values?.totalGmOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalGmOverallTaskComp === 0 ? sumGmOverallTaskComp(values?.fields) : values?.totalGmOverallTaskComp}</label></td>

                                            <td className='text-center'> <label className="control-label text-right">{values?.totalOverallRatings === 0 ? getAvgTotalOverallRatings(values?.fields) : values?.totalOverallRatings}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalOverallPercentage === 0 ? getAvgTotalOverallPercetage(values?.fields) : values?.totalOverallPercentage}</label></td>

                                        </tr>
                                    </tbody>
                                </table>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">View Evidence:</label>
                                    <div className="col-sm-3">Download evidence
                                        <a href={BASE_URL_API + `/evidence?empId=${Cookies.get('empIdForKppRatings')}`}>
                                            Click here</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="empRemark">Enter Remark:</label>
                                    <div className="col-sm-6">
                                        <textarea row="5" className="form-control" id="gmRemark" name="gmRemark" defaultValue={gmRemark} placeholder="Enter Remark here" onChange={(e) => setGmRemark(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="hodKppStatus">Hod Status:</label>
                                    <div className="col-sm-2">
                                        <select className="form-control" id="gmKppStatus" onChange={(e) => onHodStatusChangeHandler(e.target.value)} defaultValue={gmKppStatus} >
                                            <option value="Approved">Approved</option>
                                            <option value="Reject">Reject</option>
                                        </select>
                                    </div>
                                </div>




                                <div className="row">
                                    <div className="col-sm-8"></div>
                                    <div className="col-sm-4">
                                        <button type="submit" className="btn btn-success"> Submit</button>
                                        <a href={BASE_URL_API + `/report/in-progress-employee-kpp-status?empId=${Cookies.get('empIdForKppRatings')}`}>
                                            <button type="button" className="btn btn-success col-sm-offset-1 " disabled={kppMasterResponses?.empKppStatus === "Pending"}> Download</button>
                                        </a>
                                        <button type="submit" className="btn col-sm-offset-1 btn-success" onClick={() => completeEmpKpp(empId)} >Finish</button>


                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

        </div>
    );
}
export default EmplyeeUpdateKppRatingsComponent;