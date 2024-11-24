import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";


class CumulativeService {

    // view previous months kpp 
    getEmployeeKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/employee-kpp-cumulative?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // view previous months kpp  bt from date and to date
    getEmployeeKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('empId')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //For All Employee

    // view previous months kpp 
    getOverallEmployeeCumulative(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/cumulative/hod-cummulatve?roleId=3&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)
            //  return axios.get(BASE_URL_API+`/cumulative/hod-cummulatve?gmEmpId=${Cookies.get('empId')}&roleId=3`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getOverallEmployeeCumulativeByDates(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/hod-cummulatve?fromDate=${data.fromDate}&toDate=${data.toDate}&gmEmpId=${Cookies.get('empId')}&roleId=3&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    getOverallEmployeeCumulativeByDates_ADMIN(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/hod-cummulatve?fromDate=${data.fromDate}&toDate=${data.toDate}&roleId=3&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    //for all HOD


    // view previous months kpp 
    getOverallHODCumulative(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/cumulative/hod-cummulatve?roleId=2&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)
            //return axios.get(BASE_URL_API+`/cumulative/hod-cummulatve?gmEmpId=${Cookies.get('empId')}&roleId=2`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getOverallHODCumulativeByDates(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/hod-cummulatve?fromDate=${data.fromDate}&toDate=${data.toDate}&gmEmpId=${Cookies.get('empId')}&roleId=2&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    getOverallHODCumulativeByDates_ADMIN(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/hod-cummulatve?fromDate=${data.fromDate}&toDate=${data.toDate}&roleId=2&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }



    //when HOD want to view single employee kpp ratings

    // view previous months kpp 
    getSingleEmployeeKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/employee-kpp-cumulative?empId=${Cookies.get('viewSingleEmpIdForKppRatings')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // view previous months kpp  bt from date and to date
    getSingleEmployeeKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('viewSingleEmpIdForKppRatings')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // view previous months kpp  bt from date and to date
    getSingleEmployeeKppReportByDates_ADMIN(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/employee-kpp-cumulative?fromDate=${data.fromDate}&toDate=${data.toDate}&empId=${Cookies.get('viewSingleEmpIdForKppRatings')}&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    //for HOD flow

    // view previous months kpp 
    getSingleHODKppReportDetailsByPaging(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/employee-kpp-cumulative?empId=${Cookies.get('viewSingleHODIdForKppRatings')}&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // view previous months kpp  bt from date and to date
    getSingleHODKppReportByDates(data) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/cumulative/employee-kpp-cumulative?fromDate=${data.fromDate}&toDate=${data.toDate}&empId=${Cookies.get('viewSingleHODIdForKppRatings')}&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


}


export default new CumulativeService();