import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const DropDown = ({ handleLogout, handleReveal }) => {

	return (
		<div className="flex justify-end w-[50%] fixed top-5 right-2 md:-left-2 z-50">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <FontAwesomeIcon icon={faGear} className="text-gray-500 h-7 w-7 hover:rotate-45 duration-150 drop-shadow-xl" />
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							<Menu.Item>
								{({ active }) => (
									<button
                                        onClick={handleReveal}
										className={`${
											active ? "bg-gray-100" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										<FontAwesomeIcon
											icon={faPenToSquare}
											className="h-3.5 w-3.5 mr-2 text-gray-600"
										/>
										Update
									</button>
								)}
							</Menu.Item>
                            <hr className="my-1"/>
							<Menu.Item>
								{({ active }) => (
									<button
                                        onClick={handleLogout}
										className={`${
											active ? "bg-red-500 text-white" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										<FontAwesomeIcon
											icon={faArrowRightFromBracket}
											className={`${ active ? "mr-2" : "h-3.5 w-3.5 mr-2 text-gray-600"}`}
										/>
										Logout
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

export default DropDown;
