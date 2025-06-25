import React, { useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { RiUserCommunityLine } from "react-icons/ri";
import { HiChevronUp } from "react-icons/hi2";

const Labels = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const users = [
    {
      name: "Ajay",
      email: "ajaym.22cse@kongu.edu",
      avatar: "https://avatars.githubusercontent.com/u/127031263?v=4",
    },
    {
      name: "Dinesh",
      email: "dineshd.22cse@kongu.edu",
      avatar: "https://avatars.githubusercontent.com/u/7752572?v=4",
    },
  ];

  return (
    <div className="mt-5 relative w-56 mx-auto">
      <div
        className="flex items-center justify-center gap-4 bg-[#D9DDE5] rounded-sm py-2 cursor-pointer"
        onClick={() => setShowSuggestions(!showSuggestions)}
      >
        <FaPeopleGroup className="text-2xl" />
        <h1 className="font-light">Search for People</h1>
      </div>

      {showSuggestions && (
        <div className="absolute w-full bg-white shadow-lg border border-gray-300 rounded mt-2 z-50">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="mt-10">
          <h1 className="mb-3 text-gray-500 font-semibold">Engage</h1>
          <div className="flex items-center justify-between gap-3 text-gray-400 text-[18px] pl-5 cursor-pointer ">
            <div className="flex items-center gap-3">
              <IoPeople className="text-lg" />
              <h1>People</h1>
            </div>
            <div>
                <span className="p-1 rounded-full bg-blue-950 text-[11px] text-white">3</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-400 text-[18px] pl-5 cursor-pointer mt-5">
            <RiUserCommunityLine className="text-lg" />
            <h1>communication</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-10 flex items-center cursor-pointer">
          <img
            src="https://avatars.githubusercontent.com/u/127031263?v=4"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="pl-1 font-extralight">Ajay Muthusamy</h1>
            <h1 className="text-[9px] text-gray-500 pl-1">
              ajaym.22cse@kongu.edu
            </h1>
          </div>
          <div className="pl-4">
            <HiChevronUp className="text-[21px] text-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
