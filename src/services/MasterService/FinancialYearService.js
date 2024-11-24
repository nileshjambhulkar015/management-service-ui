import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API + "/financial-year";


class FinancialYearService {

    saveFinancialYearDetails(financialYearCreateRequest) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, financialYearCreateRequest)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    deleteFinancialYearById(finYearId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/?finYearId=${finYearId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }   

    updateFinancialYearDetails(financialYearUpdateRequest) {
        if (null != Cookies.get('empId')) {
            console.log("financialYearUpdateRequest ", financialYearUpdateRequest)
            return axios.put(BASE_URL, financialYearUpdateRequest)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
    getFinancialYearDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

     //when click on view button of UI
     getFinancialYearById(finYearId) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL + `/by-finyear?finYearId=${finYearId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //Get all roles present in department table for designation form
    ddEmployeeType() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/employee-type?statusCd=A")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

}


export default new FinancialYearService();