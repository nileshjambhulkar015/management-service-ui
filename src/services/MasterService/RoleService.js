import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API + "/roles";

class RoleService {




    getRolesDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/roles/search?searchEnum=BY_STATUS&statusCdEnum=A&page=0&size=20&sort=roleName")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }



    //Get all roles present in designation table 
    //second used in adding new employee
    ddRoles() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/roles")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //Get all roles present in department table for designation form
    ddRolesExceptGM() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/roles/dd-role-except-gm-role")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


}

export default new RoleService();