import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";




class EmployeeKppsService {

    //for employee, GM approved the kpp and adding rating
    getKPPDetails() {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/employee-kpp-status?empId=${Cookies.get('empIdForKppRatings')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //for employee, GM approved the kpp and adding rating
    getHodKPPDetailsForGmApproval() {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/employee-kpp-status?empId=${Cookies.get('hodEmpIdForKppRatings')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    saveEmployeeKppDetails(todos) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API + "/employee-key-perform-parameter", todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    //GM approval for employee kpp ratings
    updateEmpApproveOrRejectByHod(todos) {

        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API + "/gm-approval", todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }



    //Assign employee kpp for assign kpp page
    assignEmployeeKppDetails(emplyeeKpp) {
        if (null != Cookies.get('empId')) {

            return axios.post(BASE_URL_API + "/employee-kpp/assign-kpp", emplyeeKpp)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //Assign employee kpp for assign kpp page
    deleteEmployeeKppDetails(kppId, kppOverallTarget, kppOverallWeightage) {
        if (null != Cookies.get('empId')) {

            //  return axios.post(BASE_URL_API+"/employee-kpp/assign-kpp",emplyeeKpp)
            return axios.delete(BASE_URL_API + `/employee-kpp/assign-kpp?empId=${Cookies.get('empIdForKpp')}&kppId=${kppId}&kppOverallTarget=${kppOverallTarget}&kppOverallWeightage=${kppOverallWeightage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //show employee KPP
    getEmployeeKPPDetailsByPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp?statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=emp.emp_fname`);
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    getEmployeeKPPDetailsByEmpEIdPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp?empEId=${data.empEId}&statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=emp.emp_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}


export default new EmployeeKppsService();