import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API + "/region";


class RegionService {


    saveRegionDetails(region) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, region)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    updateRegion(region) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, region)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    deleteRegionById(regionId) {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/?regionId=${regionId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }



    //at page load call all the region load all departments
    getRegionsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/region/search?statusCd=A&page=0&size=1200&sort=regionName asc")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getRegionsById(regionId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/region?regionId=${regionId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    ddRegions(regionId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/region/dd-regions-regions`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}


export default new RegionService();