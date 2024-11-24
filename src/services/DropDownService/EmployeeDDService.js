import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";


class EmployeeDDService {



    //get regions from company master
    getRegionsFromEmployee() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/employee-kpp/dd-regions-employee")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //get site from company for region id
    //Get all roles present in department table from designation for KPP
    getSitesByRegionIdFromEmployee(regionId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp/dd-sites-employee?regionId=${regionId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    // get all company from company base on regio id and site id
    getCompanyFromEmployee(data) {

        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp/dd-company-employee?regionId=${data.regionId}&siteId=${data.siteId}`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // get all company from company base on regio id and site id
    getRolesFromEmployee(data) {

        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp/dd-roles-employee?regionId=${data.regionId}&siteId=${data.siteId}&companyId=${data.companyId}`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // get all company from company base on regio id and site id
    getDeptFromEmployee(data) {

        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp/dd-dept-employee?regionId=${data.regionId}&siteId=${data.siteId}&companyId=${data.companyId}&roleId=${data.roleId}`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // get all company from company base on regio id and site id
    getDesigFromEmployee(data) {

        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/employee-kpp/dd-desig-employee?regionId=${data.regionId}&siteId=${data.siteId}&companyId=${data.companyId}&roleId=${data.roleId}&deptId=${data.deptId}`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }
}

export default new EmployeeDDService()
