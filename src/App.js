import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import KeyParameterComponent from './components/MasterComponent/KeyParameterComponent';

import MainEmployeeComponent from './components/EmployeeComponent/MainEmployeeComponent';

import DesignationComponent from './components/MasterComponent/DesignationComponent';

import Cookies from 'js-cookie';
import AddNewEmployeeComponent from './components/EmployeeComponent/AddNewEmployeeComponent';
import AllEmployeesKppComponent from "./components/AllEmployeesKppComponent/AllEmployeesKppComponent";
import AllHodKppStatusComponent from './components/AllHodKppStatusComponent/AllHodKppStatusComponent';
import AssignEmployeeKppComponent from './components/AssignEmployeeKppComponent/AssignEmployeeKppComponent';
import SingleEmployeeCumulativeComponent from "./components/CumulativeKppComponent/SingleEmployeeCumulativeComponent";
import SingleHODCumulativeComponent from "./components/CumulativeKppComponent/SingleHODCumulativeComponent";
import ViewAllEmployeeCumulativeComponent from "./components/CumulativeKppComponent/ViewAllEmployeeCumulativeComponent";
import ViewAllHODCumulativeComponent from "./components/CumulativeKppComponent/ViewAllHODCumulativeComponent";
import EmplyeeUpdateKppRatingsComponent from './components/UpdateKppRatingsComponent/EmplyeeUpdateKppRatingsComponent';
import HODUpdateKppRatingsComponent from './components/UpdateKppRatingsComponent/HODUpdateKppRatingsComponent';
import CompanyMasterComponent from './components/MasterComponent/CompanyMasterComponent';
import DepartmentComponent from './components/MasterComponent/DepartmentComponent';
import EmployeeTypeComponent from "./components/MasterComponent/EmployeeTypeComponent";
import RegionComponent from "./components/MasterComponent/RegionComponent";
import RoleComponent from "./components/MasterComponent/RoleComponent";
import SiteComponent from "./components/MasterComponent/SiteComponent";
import UoMComponent from "./components/MasterComponent/UoMComponent";
import ShowEmployeeForKppComponent from './components/AssignEmployeeKppComponent/ShowEmployeeForKppComponent';
import ViewAllEmpTransferToOtherHODComponent from "./components/ViewAllEmpTransferToOtherHODComponent/ViewAllEmpTransferToOtherHODComponent";
import ComplaintTypeComponent from "./components/MasterComponent/ComplaintTypeComponent";
import OthersPendingComplaintComponent from './components/ComplaintManagementComponent/OthersPendingComplaintComponent';
import OthersResolveComplaintComponent from './components/ComplaintManagementComponent/OthersResolveComplaintComponent';
import OthersInProgressComplaintComponent from './components/ComplaintManagementComponent/OthersInProgressComplaintComponent';



import AnnouncementTypeComponent from "./components/MasterComponent/AnnouncementTypeComponent";
import AnnouncementComponent from "./components/AnnouncementComponent/AnnouncementComponent";
import FinancialYearComponent from "./components/MasterComponent/FinancialYearComponent";

function App() {

  const removeCookies = () => {
    Cookies.remove('empId');
    Cookies.remove('roleId');
    Cookies.remove('roleName');
    Cookies.remove('deptId');
    Cookies.remove('deptName');
    Cookies.remove('desigId');
    Cookies.remove('desigName');
    Cookies.remove('empEId');
    Cookies.remove('empFirstName');
    Cookies.remove('empMiddleName');
    Cookies.remove('empLastName');
  }
  return (

    <BrowserRouter>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="http://localhost:3008" onClick={() => removeCookies()}>FutureBizops</a>
          </div>
          <ul className="nav navbar-nav">

            <li><Link to="/keyparemeter">Key Indicator Master</Link></li>


            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Employee Master
                <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/employee">Employee Master</Link></li>

                <li><Link to="/transferemployeetohod">Transfer Employee to Other HOD</Link></li>
              </ul>
            </li>


            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Employee KPP Master
                <span className="caret"></span></a>
              <ul className="dropdown-menu">

                <li><Link to="/showEmployeeForKpp">Assign Employee Kpp</Link></li>

              </ul>
            </li>

            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">KPP Rating Master
                <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/allHodKppStatus">Add Ratings for HOD KPP</Link></li>
                <li><Link to="/allEmployeeKppStatus">Add Ratings for Employee KPP</Link></li>
              </ul>
            </li>




            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Cumulative Master
                <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/viewHODCumulativeKpp">View HOD Cumulative Ratings</Link></li>
                <li><Link to="/viewEmployeeCumulativeKpp">View Employee Cumulative Ratings</Link></li>

              </ul>
            </li>

            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Complaint Management
                <span className="caret"></span></a>
              <ul className="dropdown-menu">

                <li><Link to="/othersPendingComplaint">Other's Pending Complaint</Link></li>
                <li><Link to="/othersInProgressComplaint">Other's In Progress Complaint</Link></li>
                <li><Link to="/othersResolveComplaint">Other's Resolve Complaint</Link></li>
              </ul>
            </li>
            <li><Link to="/announcement">Announcement Master</Link></li>

            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Master Records
                <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/role">Role Master</Link></li>
                <li><Link to="/financialYear">Financial Year Master</Link></li>
                <li><Link to="/department">Department Master</Link></li>
                <li><Link to="/designation">Designation Master</Link></li>
                <li><Link to="/uomMaster">UoM Master</Link></li>
                <li><Link to="/empTypeMaster">Employee Type Master</Link></li>
                <li><Link to="/complaintTypeMaster">Complaint Type Master</Link></li>
                <li><Link to="/announcementType">Announcement Type Master</Link></li>
                <li><Link to="/regionMaster">Region Master</Link></li>
                <li><Link to="/siteMaster">Sites Master</Link></li>
                <li><Link to="/companyMaster">Company Master</Link></li>


              </ul>
            </li>

          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Welcome: {Cookies.get('empEId')}</a></li>
            <li> <a href="http://localhost:3008" onClick={() => removeCookies()} >Logout </a></li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<RoleComponent />}></Route>

        <Route exact path="/newEmployee" element={<AddNewEmployeeComponent />}></Route>
        <Route exact path="/role" element={<RoleComponent />}></Route>
        <Route exact path="/financialYear" element={<FinancialYearComponent />}></Route>
        <Route exact path="/department" element={<DepartmentComponent />}></Route>
        <Route exact path="/designation" element={<DesignationComponent />}></Route>
        <Route exact path="/regionMaster" element={<RegionComponent />}></Route>
        <Route exact path="/siteMaster" element={<SiteComponent />}></Route>
        <Route exact path="/companyMaster" element={<CompanyMasterComponent />}></Route>
        <Route exact path="/uomMaster" element={<UoMComponent />}></Route>
        <Route exact path="/empTypeMaster" element={<EmployeeTypeComponent />}></Route>
        <Route exact path="/complaintTypeMaster" element={<ComplaintTypeComponent />}></Route>
        <Route exact path="/keyparemeter" element={<KeyParameterComponent />} ></Route>
        <Route exact path="/employee" element={<MainEmployeeComponent />}></Route>
        <Route exact path="/showEmployeeForKpp" element={<ShowEmployeeForKppComponent />}></Route>

        <Route exact path="/allHodKppStatus" element={<AllHodKppStatusComponent />}></Route>
        <Route exact path="/addHodKppRating" element={<HODUpdateKppRatingsComponent />}></Route>

        <Route exact path="/allEmployeeKppStatus" element={<AllEmployeesKppComponent />}></Route>
        <Route exact path="/addEmployeeKppRating" element={<EmplyeeUpdateKppRatingsComponent />}></Route>
        <Route exact path="/viewEmployeeCumulativeKpp" element={<ViewAllEmployeeCumulativeComponent />}></Route>


        <Route exact path="/assignEmployeeKpp" element={<AssignEmployeeKppComponent />}></Route>
        <Route exact path="/viewSingleEmployeeRatings" element={<SingleEmployeeCumulativeComponent />}></Route>
        <Route exact path="/viewSingleHODRatings" element={<SingleHODCumulativeComponent />}></Route>
        <Route exact path="/transferemployeetohod" element={<ViewAllEmpTransferToOtherHODComponent />}></Route>
        <Route exact path="/viewHODCumulativeKpp" element={<ViewAllHODCumulativeComponent />}></Route>

        <Route exact path="/othersPendingComplaint" element={<OthersPendingComplaintComponent />}></Route>
        <Route exact path="/othersInProgressComplaint" element={<OthersInProgressComplaintComponent />}></Route>
        <Route exact path="/othersResolveComplaint" element={<OthersResolveComplaintComponent />}></Route>


        <Route exact path="/announcementType" element={<AnnouncementTypeComponent />}></Route>
        <Route exact path="/announcement" element={<AnnouncementComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
