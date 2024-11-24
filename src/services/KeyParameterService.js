import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const DEPARTMENT_URL = BASE_URL_API + "/designation/department";
const BASE_URL = BASE_URL_API + "/key-perform-parameter";

class KeyParameterService {


    getDpartmentDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(DEPARTMENT_URL)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    saveKPPDetails(kpp) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, kpp)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    getKPPDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    deleteKppById(kppId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/?kppId=${kppId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getKPPDetailsByPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/key-perform-parameter/search?statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=dept.dept_name`);
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    searchKPPObjectiveNoPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/key-perform-parameter/search?kppObjectiveNo=${data.kppObjectiveNo}&statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}`);
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //Assign kpp For Employee page when user click from showEmployeeKppComponent

    getKPPDetailsForAssignKppByPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp/assign-employee-kpp-search?empId=${Cookies.get('empIdForKpp')}&roleId=${Cookies.get('empKppRoleId')}&deptId=${Cookies.get('empKppDeptId')}&desigId=${Cookies.get('empKppDesigId')}&statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=dept.dept_name`);
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }



    //advance search of kpp
    advanceSearchEmployeeKPP(data) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API + `/employee-kpp/assign-employee-kpp-advance-search?empId=${Cookies.get('empIdForKpp')}&page=${data.currentPage - 1}&size=${data.itemsPerPage}`, data.advanceKppSearch)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //View kpp For Employee page when user click from showEmployeeKppComponent

    viewKPPDetailsForAssignKppByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp/assign-employee-kpp-view?empId=${Cookies.get('empIdForKpp')}&roleId=${Cookies.get('empKppRoleId')}&deptId=${Cookies.get('empKppDeptId')}&desigId=${Cookies.get('empKppDesigId')}&statusCd=A&page=0&size=40&sort=dept.dept_name`);
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getKPPDetailsByKppObjectivePaging(kppObjective) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/key-perform-parameter/search?kppObjective=${kppObjective}&statusCd=A&page=0&size=20&sort=dept.dept_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    getKPPDetailsByKppObjectiveNoPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/key-perform-parameter/search?kppObjectiveNo=${data.kppObjectiveNo}&statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=dept.dept_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    getKppById(kppId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/kppId?kppId=' + kppId)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    /*
    getDepartmentById(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/' + deptId)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }*/

    updateKppDetails(kpp) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, kpp)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    /* getAllDepartment() {
         if (null != Cookies.get('empId')) {
             return axios.get(BASE_URL_API + "/department/all-dd-dept-except-gm")
         } else {
             alert("You need to login first")
             window.location.replace(LOGIN_UI_BASE_URL);
         }
     }*/
}

export default new KeyParameterService()
