import React from 'react';

function EditProfileScreen(props) {
    return (
        <div className="EditProfileScreen">
        <div className="page-container profile-pc">
            <div className="upper-container profile-uc">
                <div className="upper-outset profile-uo">
                    <div className="upper-inset profile-ui">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div> 
            <div className="middle-container profile-mc">
                <div className="mid-outset profile-mo">
                    <div className="mid-inset profile-mi">
                        <div className="login-container">
                            <div className="title-container">
                                <h1>FLOW</h1>
                            </div>
                            <div className="user-input-container">
                                <div className="user-input">
                                    <form>
                                        <input className="user-text" type="text" placeholder="Username"></input>
                                    </form>
                                </div>
                                <div className="user-input">
                                    <form>
                                        <input className="user-text" type="text" placeholder="Password"></input>
                                    </form>
                                </div>
                            </div>
                            <div className="bottom-filler-space"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-container profile-bc">
                <div className="useless-bars profile-ub"></div>
                <div className="useless-bars profile-ub"></div>
                <div className="useless-bars profile-ub"></div>
            </div>
        </div>
    </div>
    );
}

export default EditProfileScreen;