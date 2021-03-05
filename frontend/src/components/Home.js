import React, { useEffect } from 'react';

function Home(props) {
    // useEffect(() => {
    //     document.querySelector('.dr-1').style.transform = 'none'
    //     document.querySelector('.route-o2').style.transform = 'none'
    //     document.querySelector('.dr-3').style.transform = 'none'

    // }, [])
    return (
        <div className="Home">
            <div className="img-panel-container">

            </div>
            <div className="bottom-directories">
                <div className="bm-dir-container bdc-1">
                    <div className="dir-icon di-1">
                        <div className="icon-outset io-1">
                            <div className="icon-inset ii-1">
                                <div className="icon-double-inset idi-1">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dir-route dr-1">
                        <div className="route-outset">
                            <div className="route-inset">
                                <div className="route-double-inset">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bm-dir-container bdc-2">
                    <div className="dir-icon di-2">
                        <div className="icon-outset io-2">
                            <div className="icon-inset ii-2">
                                <div className="icon-double-inset idi-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dir-route dr-2">
                        <div className="route-outset route-o2">
                            <div className="route-inset route-i2">
                                <div className="route-double-inset route-di2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bm-dir-container bdc-3">
                    <div className="dir-icon di-3">
                        <div className="icon-outset io-3">
                            <div className="icon-inset ii-3">
                                <div className="icon-double-inset idi-3">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dir-route dr-3">
                        <div className="route-outset">
                            <div className="route-inset">
                                <div className="route-double-inset">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
