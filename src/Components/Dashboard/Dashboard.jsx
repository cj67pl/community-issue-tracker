
function Dashboard() {
    return (
        <div>
            <div>
                <div>
                    <h2>Dashboard</h2>
                    <span>Monitor reported issues and identify what needs attention.</span>
                </div>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                        fill="currentColor" viewBox="0 0 24 24" >
                        {/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
                        <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
                    </svg>
                    Report issue
                </button>
                <div>
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                fill="currentColor" viewBox="0 0 24 24" >
                                {/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
                                <path d="M8 13h8v2H8z"></path><path d="M19 3h-2c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 17H5V5h2v2h10V5h2z"></path>
                            </svg>
                            Total Issues
                        </div>
                        <p>38</p>
                        <span>All reported issues</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;