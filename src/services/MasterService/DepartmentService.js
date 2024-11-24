import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API + "/department";


class DepartmentService {

    saveDepartmentDetails(department) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, department)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    deleteDepartmentById(deptId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/?deptId=${deptId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //when click on view button of UI
    getDepartmentById(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-dept-id?deptId=${deptId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateDepartmentDetails(department) {
        if (null != Cookies.get('empId')) {
            console.log("department : ", department)
            return axios.put(BASE_URL, department)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
    getDepartmentDetailsByPaging(data) {

        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/department/search?statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=dept.dept_name asc`)
        } else {
            alert("You need to login first")

            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // search department by its name
    getDepartmentDetailsByDeptNamePaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/department/search?deptName=${data.deptName}&statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}&sort=dept.dept_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //Upload department
    uploadExcelDept(formData) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API + "/department/upload-department", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    ddAllDepartmentExceptGM() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/designation/department-except-gm")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}


export default new DepartmentService();