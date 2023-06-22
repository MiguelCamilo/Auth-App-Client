import Navbar from "./Navbar";

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div className="h-full max-w-[2520px] mx-auto xl:px-28 md:px-20 sm:px-2 px-4 bg-gray-100">
				{/* container */}
				<h2 className="flex pt-10 text-xl font-black">Settings</h2>
				<hr />
				<div className="flex pt-[2rem]">
					{/* <div className="flex justify-center items-center h-[10rem] w-[12rem] mr-20 bg-white rounded">
						<div className="flex flex-col space-y-2">
                            <p>Dashboard</p>
                            <p>Data</p>
                            <p>Etc</p>
                        </div>
					</div> */}

					<div className="flex justify-center h-[45rem] w-full bg-white rounded">
						{/* FIRST ROW CONTAINER */}
						<div className="flex justify-start w-full p-10">
							<div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
								<svg
									className="absolute w-22 h-22 text-gray-400 -left-1"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clipRule="evenodd"
									/>
								</svg>
							</div>

							<div className="flex flex-row justify-between w-full">
								<div className="flex flex-col">
									<h2 className="ml-10 text-lg font-semibold">Avatar</h2>
									<p className="ml-10">600x600 or larger recommended</p>
                                    <button className="ml-10 bg-orange-700 rounded-xl w-20">Update</button>
								</div>
								<p className="ml-10">What makes an avatar good?</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
