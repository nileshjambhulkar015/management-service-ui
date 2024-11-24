import React, { useEffect, useState } from "react";
import RoleService from "../../services/MasterService/RoleService";

export default function RoleComponent() {

    const [roles, setRoles] = useState([])

    useEffect(() => {
        RoleService.getRolesDetailsByPaging().then((res) => {
            setRoles(res.data.responseData.content?.filter((item) => item.roleId !== 1));
        });
    }, []);


    return (

        <div>
            <div className="row">
                <h2 className="text-center">Role List</h2>
                <div className="col-md-2"></div>
                <div className="col-md-8">


                    <div className="row">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Role Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roles.map(
                                        (role, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={role.roleId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{role.roleName}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>


        </div>
    );
}