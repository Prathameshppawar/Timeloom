import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { loginSuccess, loginFail, serverError } from "../utilities/Toasts";
import { ThreeCircles } from "react-loader-spinner";
import "./styles/timeloom.css";
// impo
const host = "http://localhost:5500";
const home = () => {
  const [loading, setLoading] = useState(false);
  const details = [];
  const [userdetails, setuserdetails] = useState(details);
  const Creatorsdetails = [];
  const [creatordetails, setCreatorDetails] = useState(Creatorsdetails);
  const det = [[]];
  const [eventdet, seteventdet] = useState(det);
  let a1 = 0;

  const loadfunc = async (e) => {
    //   console.log('event logging', e);
    //   e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${host}/myData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (response.status === 200) {
        a1++;
        setuserdetails(json);
        console.log("res status ok");
        console.log(a1, "user json", json);
      } else {
        console.log("failed to fetch");
        // loginFail();
        // Handle error based on response status
      }
    } catch (error) {
      console.log("caught error", error);
      // serverError();
      // Handle specific error message
    } finally {
      setLoading(false); // Ensure loading indicator disappears always
    }
  };

  

  const eventload = async (e) => {
    setLoading(true);
    console.log('in event load')

    try {
      const response = await fetch(`${host}/allEvents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const eventjson = await response.json();
      if (response.status === 200) {
        a1++;
        seteventdet(eventjson);
        // console.log("res status ok");
        console.log(a1, "event json", eventjson);
      } else {
        console.log("failed to fetch");
        // loginFail();
        // Handle error based on response status
      }
    } catch (error) {
      console.log("caught error", error);
      // serverError();
      // Handle specific error message
    } finally {
      setLoading(false); // Ensure loading indicator disappears always
    }
  };
  let endTime = String(eventdet[0].endTime).split(".")[0].split("T")[1],
    startTime = String(eventdet[0].startTime).split(".")[0].split("T")[1];
  // endTime=endTime.split('T')[1], startTime=startTime.split('T')[1];
  // const dateObject= new Date(eventdet[0]);
  // const hours = dateObject.getHours();
  // const minutes = dateObject.getMinutes();
  // const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  useEffect(() => {
    // This will run when the component is mounted
    loadfunc();
    eventload();
    
  }, []);

  
  return (
    <>
      {loading && (
        <div className="w-full h-full bg-black/60 absolute z-40">
          <div className="absolute z-50 translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2">
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperclass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor="#FFC300"
              innerCircleColor="#ffffff"
              middleCircleColor="#fe3a95"
            />
          </div>
          <div className="absolute z-50 translate-x-1/2 translate-y-1/2 bottom-60 right-1/2 text-center text-white">
            Rome wasn't built in a day, and neither was this server! <br />
            Enjoy the suspenseful wait ...
          </div>
        </div>
      )}
      <div className="main">
        <div className="timeloomheader">
          <div className="timeloom">Timeloom</div>
          <div className="addevent">
            <button className="addeventbutton">Add New Event</button>
          </div>
        </div>
        <div className="panels">
          <div className="panel1">
            <div className="user">
              <div className="profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <circle cx="25" cy="25" r="25" fill="#DFDFDF" />
                </svg>
              </div>
              <div className="userdetails">
                <div className="username">{userdetails.name}</div>
                <div className="useremailid">{userdetails.email}</div>
                <div className="userstatus">
                  {console.log("illuster value:", userdetails?.illuster)}
                  {userdetails?.illuster && (
                    <div>
                      illustor
                      {console.log(
                        "logging user details as illustor",
                        userdetails.illustor
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="following">
              <div className="followingheader">
                <div className="followingtitle">Following</div>
              </div>

              <div className="followinglist">
                {userdetails.followingClubs?.map((comcreator, index) => (
                  <div className="listbar" key={index}>
                    <div className="profile">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 50 50"
                        fill="none"
                      >
                        <circle cx="25" cy="25" r="25" fill="#DFDFDF" />
                      </svg>
                    </div>
                    <div className="listdetails">
                      <div className="groupname">Cultural Committee</div>
                      <div className="groupcreator">
                        {comcreator}
                        {console.log("this is comcreator", comcreator, index)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="followingfooter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2.66699 8.00002H13.3337M8.00033 2.66669V13.3334"
                    stroke="#9F9F9F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="member">
              <div className="memberheader">
                <div className="membertitle">Member</div>
              </div>
              <div className="memberlist">
                {userdetails.followingClubs?.map((membergroup, index) => (
                  <div className="listbar" key={index} >
                    <div className="profile">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 50 50"
                        fill="none"
                      >
                        <circle cx="25" cy="25" r="25" fill="#DFDFDF" />
                      </svg>
                    </div>
                    <div className="listdetails">
                      <div className="groupname">Technical Committee</div>
                      <div className="groupcreator">{membergroup}</div>
                    </div>
                    <button className="deletegroup">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M4 6H20M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6"
                          stroke="#9F9F9F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button className="editgroup">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
                          stroke="#9F9F9F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {userdetails?.illuster && (
                <button
                  className="memberfooter"
                  onClick={() => console.log("can create new group")}
                >
                  create group
                </button>
              )}
            </div>
          </div>
          <div className="panel2">
            <div className="rows">
              <div className="monthheader">
                <div className="month">December, 2023</div>
              </div>
              <div className="datebar">
                <div className="date">
                  8 December
                  {console.log("event details", eventdet)}
                </div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">{eventdet[0].title}</div>
                    <div className="eventtime">
                      {startTime} to {endTime}
                    </div>
                  </div>
                  <div className="eventclub">
                    By creator{" "}
                    {creatordetails?.name}
                  </div>
                </div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">Phtotography Workshop</div>
                    <div className="eventtime">4:00 p.m. to 6:00 p.m.</div>
                  </div>
                  <div className="eventclub">By Photography club</div>
                </div>
              </div>
              <div className="datebar">
                <div className="date">31 December</div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">New year party</div>
                    <div className="eventtime">8:00 p.m. to 11:00 p.m.</div>
                  </div>
                  <div className="eventclub">By 3rd year</div>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="monthheader">
                <div className="month">Janaury, 2024</div>
              </div>
              <div className="datebar">
                <div className="date">5 January</div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">App Dev Workshop</div>
                    <div className="eventtime">3:00 p.m. to 5:00 p.m.</div>
                  </div>
                  <div className="eventclub">By GDSC</div>
                </div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">Drama Workshop</div>
                    <div className="eventtime">4:00 p.m. to 6:00 p.m.</div>
                  </div>
                  <div className="eventclub">By Drama club</div>
                </div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">Placement cell meet</div>
                    <div className="eventtime">9:00 p.m. to 10:00 p.m.</div>
                  </div>
                  <div className="eventclub">By Placement cell</div>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="monthheader">
                <div className="month">December, 2023</div>
              </div>
              <div className="datebar">
                <div className="date">8 December</div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">Web Dev Workshop</div>
                    <div className="eventtime">3:00 p.m. to 5:00 p.m.</div>
                  </div>
                  <div className="eventclub">By GDSC</div>
                </div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">Phtotography Workshop</div>
                    <div className="eventtime">4:00 p.m. to 6:00 p.m.</div>
                  </div>
                  <div className="eventclub">By Photography club</div>
                </div>
              </div>
              <div className="datebar">
                <div className="date">31 December</div>
                <div className="event">
                  <div className="eventheader">
                    <div className="eventname">New year party</div>
                    <div className="eventtime">8:00 p.m. to 11:00 p.m.</div>
                  </div>
                  <div className="eventclub">By 3rd year</div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel3">
            <div className="notificationsheader">
              <div className="notifications">Notifications Panel</div>
            </div>
            <div className="noties">
              <div className="neweventbar">
                <div className="notiesheader">
                  <div className="clubname">Cultural committee</div>
                  <div className="notietype">New event</div>
                </div>
                <div className="notieinfo">
                  <div className="notieeventname">Photography workshop</div>
                  <div className="notieeventdate">
                    9 December, 5:00 p.m. to 7:00 p.m.
                  </div>
                </div>
              </div>
              <div className="neweventbar">
                <div className="notiesheader">
                  <div className="clubname">Placement cell</div>
                  <div className="notietype">added to new group</div>
                </div>
                <div className="notieinfo">
                  <div className="creator">By Rohit khandal</div>
                  <div className="newgroupdate">
                    9 December, 5:00 p.m. to 7:00 p.m.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default home;
