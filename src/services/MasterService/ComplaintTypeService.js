import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API + "/complaint-type";


class ComplaintTypeService {

    saveComplaintTypeDetails(complaintType) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, complaintType)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //when click on view button of UI
    getComplaintTypeById(compTypeId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-complaint-type-id?compTypeId=${compTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateComplaintTypeDetails(complaintType) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, complaintType)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    deleteComplaintTypeById(compTypeId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/?compTypeId=${compTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //at page load call all the departments load all departments
    getComplaintTypeDetailsByPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/complaint-type/search?statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=comp.comp_type_name asc`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // search department by its name
    getComplaintTypeDetailsByDeptId(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/complaint-type/search?deptId=${deptId}&statusCd=A&page=0&size=1200&sort=comp.comp_type_name asc`)

        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //Get all department from complaint type table 
    ddAllComplaintTypeDepartments() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/complaint-type/comp-type-dd-dept")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }
}


export default new ComplaintTypeService();