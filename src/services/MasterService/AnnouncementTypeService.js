import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API + "/announcement-type";


class AnnouncementTypeService {

    //at page load call all the departments load all departments
    getAnnouncementTypeDetailsByPaging(data) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/search?statusCd=A&page=${data.currentPage - 1}&size=${data.itemsPerPage}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    deleteAnnouncementTypeById(announTypeId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/?announTypeId=${announTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    saveAnnouncementTypeDetails(announcementType) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, announcementType)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getAnnouncementTypeById(announTypeId) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL + `/by-announcement-type-id?announTypeId=${announTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateAnnouncementType(announType) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, announType)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    getAllAnnouncementType() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/announcement-type")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }



}


export default new AnnouncementTypeService();