import LoadingAnim from "../components/LoadingAnim";
import Navbar from "../components/Navbar";
import convertToBase64 from "../helper/convert";
import { useFetch } from "../hooks/fetch.hook";
import { profileValidation } from "../helper/validate";
import { updateUser } from "../helper/axios";

import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBriefcase,
	faEnvelope,
	faUnlock,
	faLock,
	faUser,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
	const [reveal, setReveal] = useState(true);
	const [file, setFile] = useState();
	const [{ isLoading, apiData, serverError }] = useFetch();

	// useFormik Hook
	const formik = useFormik({
		initialValues: {
			// empty string for initial value
			firstName: apiData?.firstName || "",
			lastName: apiData?.lastName || "",
			email: apiData?.email || "",
			phoneNumber: apiData?.phoneNumber || "",
			about: apiData?.about || "",
			jobTitle: apiData?.jobTitle || "",
		},
		validate: profileValidation,
		enableReinitialize: true,
		// only validate on submit instead of:
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			values = await Object.assign(values, {
				profile: file || apiData?.profile || "",
			});
			let updatePromise = updateUser(values);

			toast.promise(updatePromise, {
				loading: "Updating",
				success: <b>Update Succesful!</b>,
				error: <b>Unable to update, try again.</b>,
			});

			setReveal(!reveal);
		},
	});

	const onUpload = async (e) => {
		// using [0] to grab the first file in the array
		const base64 = await convertToBase64(e.target.files[0]);
		setFile(base64);
	};

	const handleReveal = () => {
		setReveal(!reveal);
	};

	if (isLoading) return <LoadingAnim />;
	if (serverError)
		return <h3 className="text-xl text-red-600">{serverError.message}</h3>;

	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
				}}
			/>

			{/* NAVBAR components */}
			<Navbar file={file} />

			<div className="max-w-[2520px] px-4 sm:px-20 pb-[4rem] sm:pb-[8rem] bg-gray-100">
				{/* container */}
				<h1
					delay={0}
					easing="anticipate"
					className="flex pt-[7rem] text-xl font-black"
				>
					Settings
				</h1>
				<hr />
				<div className="flex pt-4">
					<div className="flex flex-col justify-start h-[70rem] sm:h-[55rem] p-10 bg-white w-full rounded">
						{/* FIRST ROW CONTAINER */}
						<div className="flex justify-start w-full ">
							<div delay={0.3} easing="anticipate" className="relative">
								<label>
									{/* to hide the defautl input style look at css file */}
									<Avatar
										// conditional render depending on what data exist
										img={file || apiData?.profile}
										alt="avatar"
										size="xl"
									/>
								</label>
							</div>

							<div className="flex flex-col justify-start w-full">
								<div className="flex flex-col">
									<h2
										delay={0.6}
										easing="anticipate"
										className="ml-10 text-lg font-semibold w-0"
									>
										{apiData?.username}										
									</h2>
									<h3 className="ml-10 mt-4">
										Avatar
									</h3>
									<p
										delay={0.6}
										easing="anticipate"
										className="ml-10 text-sm text-gray-500"
									>
										600x600 or larger recommended
									</p>
									<div
										htmlFor="profile"
										delay={0.6}
										easing="anticipate"
										className="profile"
									>
										<label htmlFor="profile">
											<div
												className={`${
													reveal
														? "text-center shrink-0 ml-9 p-2 mt-2 bg-gray-500 hover:bg-gray-600 rounded-md text-white text-sm w-[60%] md:w-[30%] lg:w-[20%] cursor-not-allowed"
														: "text-center shrink-0 ml-9 p-2 mt-2 bg-indigo-500 hover:bg-[#ff6a6a] rounded-md text-white text-sm w-[60%] md:w-[30%] lg:w-[20%] cursor-pointer"
												}`}
											>
												Upload
											</div>
											<input
												onChange={onUpload}
												type="file"
												id="profile"
												name="profile"
												accept="image/*"
												hidden
												disabled={reveal ? true : false}
											/>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="pt-10 font-extrabold">
							<h3>Personal details</h3>
							<p className="text-red-600 text-xs italic">
								* Please fill out all required fields to populate your profile correctly!
							</p>
							<hr />

							<button
								className="flex justify-end w-full duration-100 rounded-md text-white p-2"
								onClick={handleReveal}
							>
								<h2 className="p-1 w-20 font-bold text-md text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg">
									{reveal 
										? <FontAwesomeIcon icon={faLock} size="sm" className="mr-2" />
										: <FontAwesomeIcon icon={faUnlock} size="sm" className="mr-2" />
									}
									Edit
								</h2>
							</button>
						</div>

						{/* FORM */}
						<form onSubmit={formik.handleSubmit}>
							<div className="mt-8 grid grid-cols-6 gap-6 mx-5">
								<div className="col-span-6 relative">
									<label className="block text-sm font-medium text-gray-700">
										Job Title <span className="text-red-600">*</span>
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faBriefcase}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>
									<input
										{...formik.getFieldProps("jobTitle")}
										type="text"
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
										disabled={reveal ? true : false}
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 relative">
									<label className="block text-sm font-medium text-gray-700">
										First Name <span className="text-red-600">*</span>
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faUser}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>
									<input
										{...formik.getFieldProps("firstName")}
										type="text"
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
										disabled={reveal ? true : false}
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 relative">
									<label className="block text-sm font-medium text-gray-700">
										Last Name <span className="text-red-600">*</span>
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faUser}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>

									<input
										{...formik.getFieldProps("lastName")}
										type="text"
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
										disabled={reveal ? true : false}
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 relative">
									<label className="block text-sm font-medium text-gray-700">
										Email
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faEnvelope}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>

									<input
										type={`${reveal ? "password" : "email"}`}
										{...formik.getFieldProps("email")}
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
										disabled={reveal ? true : false}
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 relative">
									<label className="block text-sm font-medium text-gray-700">
										Phone Number
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faPhone}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>
									<input
										{...formik.getFieldProps("phoneNumber")}
										type={`${reveal ? "password" : "tel"}`}
										disabled={reveal ? true : false}
										maxLength={10}
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
									/>
								</div>

								<div className="col-span-6 sm:col-span-6">
									<label className="block text-sm font-medium text-gray-700">
										Tell us about you! <span className="text-red-600">*</span>
									</label>
									<textarea
										{...formik.getFieldProps("about")}
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer"
										placeholder="Ex: Software Engineer? | Product Manager ? | Student? "
										disabled={reveal ? true : false}
										rows={5}
									/>
								</div>
							</div>
							<button
								type="submit"
								className={`${
									reveal
										? "hidden"
										: "border bg-indigo-500 w-full py-2 mt-5 rounded-lg text-gray-50 text-md shadow-xl text-center hover:bg-[#ff6a6a]"
								}`}
							>
								Save
							</button>
						</form>
						<div className="flex flex-row pt-5 font-extrabold">
							<FontAwesomeIcon
								icon={faLock}
								className="text-gray-500 pr-2 pt-1"
							/>
							<h4>Password</h4>
						</div>
						<hr />
						<Link to={"/recovery"}>
							<button className="bg-gray-500 hover:bg-gray-400 duration-150 p-2 my-3 rounded-md text-white">
								Reset Password
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
