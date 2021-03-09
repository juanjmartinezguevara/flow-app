import React from 'react';
import EditProfile from './EditProfile'

function EditProfileScreen(props) {
    return (
        <div className="EditProfileScreen">
            <div className="page-container profile-pc">
                <div className="upper-container profile-uc">
                    <div className="upper-outset profile-uo">
                        <div className="upper-inset profile-ui">
                            <h2>Edit Profile</h2>
                        </div>
                    </div>
                </div> 
                <div className="middle-container profile-mc">
                    <div className="mid-outset profile-mo">
                        <EditProfile />
                    </div>
                </div>
                <div className="bottom-container profile-bc">
                    <div className="useless-bars profile-ub"></div>
                    <div className="useless-bars profile-ub"></div>
                </div>
            </div>
        </div>
    );
}
export default EditProfileScreen;