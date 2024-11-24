import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API + "/employee-type";


class EmployeeTypeService {

    saveEmployeeTypeDetails(employeeType) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, employeeType)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    deleteEmployeeTypeById(empTypeId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/?empTypeId=${empTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //when click on view button of UI
    getEmployeeTypeById(empTypeId) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL + `/by-emptypeid?empTypeId=${empTypeId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateEmployeeTypeDetails(employeeType) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, employeeType)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
    getEmployeeTypeDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/employee-type?statusCd=A")
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


export default new EmployeeTypeService();