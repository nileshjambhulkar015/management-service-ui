import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";



class AllHodKppService {

    getEmployeeDetailsByPagination(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee/employee-kpp-status?empKppStatus=In-Progress&roleId=2&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getEmployeeByStatusByPagination(data) {
        if (null != Cookies.get('empId')) {
            //for admin we need to fetch all in progress kpp request
            return axios.get(BASE_URL_API + `/employee/employee-kpp-status?roleId=2&empKppStatus=${data.empKppStatus}&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=desig.desig.name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    completeEmpKppGM(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/gm-approval/finish?empId=${empId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

}


export default new AllHodKppService();