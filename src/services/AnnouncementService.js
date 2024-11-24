import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";


const BASE_URL = BASE_URL_API + "/announcement";

class AnnouncementService {


    getAnnouncementByPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/announcement/search?statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}`);
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //when click on view button of UI
    getAnnouncementById(meetingId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-announ-id?announId=${meetingId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //Save employee meeting
    saveAnnouncementDetails(meeting) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, meeting)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    cancelAnnouncement(meeting) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL + "/cancel-announ", meeting)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //advance search of employee
    advanceSearchAnnouncementDetails(data) {
        if (null != Cookies.get('empId')) {
            console.log("dd ", data)
            return axios.post(BASE_URL + `/announ-adv-search?page=${data.currentPage - 1}&size=${data.itemsPerPage}`, data.announcementAdvSearch)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    ddAllAnnouncementTypeFromAnnoun() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + "/dd-announ-all?statusCd=A")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //announcement type from 


}

export default new AnnouncementService()
