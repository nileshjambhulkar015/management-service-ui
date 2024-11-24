import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";



class CompanyMasterService {

    saveCompanyDetails(company) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API + "/company-master", company)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    deleteCompanyById(companyId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL_API + `/company-master?companyId=${companyId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getCompanyById(companyId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/company-master/by-comp-id?companyId=${companyId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getCompanyDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/company-master/search?statusCd=A&page=0&size=20&sort=region_id")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    updateCompanyDetails(company) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API + "/company-master", company)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    ddAllCompanyies() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/company-master/dd-all-company")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}

export default new CompanyMasterService()