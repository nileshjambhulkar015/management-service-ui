import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";


const BASE_URL = BASE_URL_API + "/employee-meeting";

class MeetingMasterService {


    getEmployeeMeetingByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/employee-meeting/search?page=0&size=1220");
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //when click on view button of UI
    getMeetingById(meetingId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-meeting-id?meetingId=${meetingId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //Save employee meeting
    saveEmployeeMeetingDetails(meeting) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, meeting)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    cancelEmployeeMeeting(meeting) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL + "/cancel-meeting", meeting)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

}

export default new MeetingMasterService()
