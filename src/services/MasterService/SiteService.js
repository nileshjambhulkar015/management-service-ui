import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API + "/site";


class SiteService {


    saveSiteDetails(site) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, site)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //when click on view button of UI
    getSiteById(siteId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-site-id?siteId=${siteId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    deleteSiteById(siteId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/?siteId=${siteId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateSiteDetails(site) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, site)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
    getSiteDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/site/search?statusCd=A&page=0&size=20&sort=site_name")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }



    //Get all regions present in site table for site form
    getRegionInDept() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/roles/department/role")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //Get all roles present in department table for designation form
    getAllRegions() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/site/dd-regions-sites")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //Get all sites present in department table from designation for KPP
    getSiteDetailsByRegionId(regionId) {

        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/site/dd-sites-sites?regionId=${regionId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    ddAllSites() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/site/dd-all-sites")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}


export default new SiteService();