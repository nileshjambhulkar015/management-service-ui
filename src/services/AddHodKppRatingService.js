import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

class AddHodKppRatingService {


    getKPPDetails(empId) {

        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API + `/hod-approval/employee-kpp?empId=${empId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    saveEmployeeKppDetails(todos) {

        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API + "/employee-key-perform-parameter", todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    completeEmpKppGM(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/gm-approval/report?empId=${empId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


}


export default new AddHodKppRatingService();