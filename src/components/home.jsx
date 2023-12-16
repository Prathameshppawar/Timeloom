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
  const clubdet=[[]];
  const [clubdetails, setclubdetails] = useState(clubdet);
  const [clubcreator, setclubcreator] = useState('')
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
        // console.log("res status ok");
        // console.log(a1, "user json", json);
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
  // console.log(userdetails.user?.followingClubs)
  const eventload = async (e) => {
    setLoading(true);
    // console.log('in event load')

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

  const clubload= async (e) =>{
    setLoading(true);
    try{
      const response=await fetch(`${host}/allClubs`, {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const clubsjson=await response.json();
      if(response.status===200){
        // console.log(clubsjson.creatorsNameList[0])
        setclubdetails(clubsjson.allClubs);
        setclubcreator(clubsjson.creatorsNameList)
      }
      else{
        console.log('failed to fetch');
      }
    }catch(error){
      console.log('caught error', error);
    } finally{
      setLoading(false);
    }
  };

  // let endTime = String(eventdet[0].endTime).split(".")[0].split("T")[1], startTime = String(eventdet[0].startTime).split(".")[0].split("T")[1];
  // endTime=endTime.split('T')[1], startTime=startTime.split('T')[1];
  // const dateObject= new Date(eventdet[0]);
  // const hours = dateObject.getHours();
  // const minutes = dateObject.getMinutes();
  // const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const eventsByMonth = {};
  eventdet.allEvents?.forEach((event, eventindex) => {
    const monthYearKey = `${String(event.startTime).slice(0, 7)}`;
    const dateKey = String(event.startTime).split("T")[0];

    if (!eventsByMonth[monthYearKey]) {
      eventsByMonth[monthYearKey] = {};
    }

    if (!eventsByMonth[monthYearKey][dateKey]) {
      eventsByMonth[monthYearKey][dateKey] = [];
    }

    eventsByMonth[monthYearKey][dateKey].push({ ...event, index: eventindex });
  });

  useEffect(() => {
    // console.log('Effect 1: Fetching user data');
    loadfunc();
  }, []);

  useEffect(() => {
    // console.log('Effect 2: Fetching event data');
    eventload();
  }, []);

  useEffect(() => {
    // console.log('Effect 2: Fetching event data');
    clubload();
  }, []);

  const [overlayVisible, setoverlayVisible] = useState(false);

  const neweventon = () => {
    setoverlayVisible(true);
  };
  const neweventoff = () => {
    setoverlayVisible(false);
  };
  const [followoverlay, setfollowoverlay] = useState(false)
  const on=()=>{
    // console.log('clicked on')
    setfollowoverlay(true);
  }
  const off=()=>{
    setfollowoverlay(false);
  }

  const [groupAddOverlay, setgroupAddOverlay] = useState(false);
  const addgroup = () => {
    setgroupAddOverlay(true);
  };
  const addgroupoff = () => {
    setgroupAddOverlay(false);
  };

  const [eventsname, seteventsname] = useState("");
  const eventChange = (e) => {
    seteventsname(e.target.value);
    console.log(eventsname);
  };

  const [clubname, setclubname] = useState("");
  const clubChange = (e) => {
    console.log(e.target.value)
    setclubname(userdetails.user?.included_in_clubs[e.target.value].clubId);
    console.log(clubname);
  };

  const [eventdate, seteventdate] = useState("");
  const eventdateChange = (e) => {
    seteventdate(e.target.value);
    console.log(eventdate);
  };

  const [eventstarttime, seteventstarttime] = useState("");
  const eventstarttimeChange = (e) => {
    seteventstarttime(e.target.value);
    console.log(eventstarttime);
  };

  const [eventendtime, seteventendtime] = useState("");
  const eventendtimeChange = (e) => {
    seteventendtime(e.target.value);
    console.log(eventendtime);
  };

  const startdatetimeStr = `${eventdate}T${eventstarttime}:00.000+05:00`;
  const enddatetimeStr = `${eventdate}T${eventendtime}:00.000+05:00`;


  const handleClick = async (e) => {
    console.log('handling the click on create event')
    console.log(e);
    e.preventDefault();
    setLoading(true);
    console.log(`${host}/addEvent/${clubname}`)
    try {
      const response = await fetch(`${host}/addEvent/${clubname}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          title: eventsname,
          description: 'Some description',
          startTime: startdatetimeStr,
          endTime: enddatetimeStr,
          venue: 'Any venue',
        }),
      });
      if (response.status === 200) {
        setLoading(false);
        console.log('no error')
        //save the auth token and redirect
        localStorage.setItem("token");
        navigate("/home");
      } else {
        console.log('some error')
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);

      setclubname("");
      seteventsname("");
      seteventdate("");
      seteventstarttime("");
      seteventendtime("");
  };

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
            {userdetails.user?.illuster && (
              <button className="addeventbutton" onClick={neweventon}>
                Add New Event
              </button>
            )}
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
              {/* {console.log(userdetails.user.name)} */}
              <div className="userdetails">
                <div className="username">{userdetails.user?.name}</div>
                <div className="useremailid">{userdetails.user?.email}</div>
                <div className="userstatus">
                  {/* {console.log("illuster valxue:", userdetails.user?.illuster)} */}
                  {userdetails.user?.illuster && <div>illustor</div>}
                </div>
              </div>
            </div>
            <div className="following">
              <div className="followingheader">
                <div className="followingtitle">Following</div>
              </div>

              <div className="followinglist">
                {userdetails.FollwingClubs?.map((comcreator, index) => (
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
                      <div className="groupname">{comcreator}</div>
                      {/* <div className="groupcreator">
                        {comcreator}
                        {console.log("this is comcreator", comcreator, index)}
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
              <button className="followingfooter" onClick={on}>
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
                <div className="membertitle">Member of</div>
              </div>
              <div className="memberlist">
                {userdetails.IncludedInClubs?.map((membergroup, index) => {
                  // console.log(userdetails.user?.included_in_clubs[index].clubId)
                  // console.log(`${host}/deleteClub/${userdetails.user?.included_in_clubs[index].clubId}`)
                  const handledelete= async(e)=>{
                  setLoading(true);
                  try{
                    const response= await fetch(`${host}/deleteClub/${userdetails.user?.included_in_clubs[index].clubId}`,{
                    method:'DELETE',
                    headers:{
                      'auth-token': localStorage.getItem('token'),
                    }
                  });
                  if(response.status===200){
                    console.log('unfollowed', clubnames.clubName)
                  }else{
                    console.log('failed to fetch')
                  }
                  } catch(error){
                    console.log('caught error', error)
                  }finally{
                    setLoading(false);
                  }
                };
                  return (
                  <div className="listbar" key={index}>
                    {/* {console.log(membergroup)} */}
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
                      <div className="groupname">{membergroup}</div>
                      {/* <div className="groupcreator">{membergroup}</div> */}
                    </div>
                    
                    <button className="deletegroup" onClick={handledelete}>
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
                    {/* <button className="editgroup">
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
                    </button> */}
                  </div>
                  )
                })}
              </div>
              {/* {userdetails.user?.illuster && (
                <button className="memberfooter" onClick={addgroup}>
                  create group
                </button>
              )} */}
            </div>
          </div>
          <div className="panel2">
            {Object.keys(eventsByMonth).map((monthYearKey) => (
              <div key={monthYearKey} className="rows">
                <div className="monthheader">
                  <div className="month">
                    {months[parseInt(monthYearKey.slice(5, 7)) - 1]},{" "}
                    {parseInt(monthYearKey.slice(0, 4))}
                  </div>
                </div>
                {Object.keys(eventsByMonth[monthYearKey]).map((dateKey) => (
                  <div key={dateKey} className="datebar">
                    <div className="date">{dateKey}</div>
                    {eventsByMonth[monthYearKey][dateKey].map((event) => (
                      <div key={event.index} className="event">
                        <div className="eventheader">
                          <div className="eventname">{event.title}</div>
                          <div className="eventtime">
                            {String(event.startTime)
                              .split("T")[1]
                              .split(".")[0]
                              .slice(0, 5)}{" "}
                            to{" "}
                            {String(event.endTime)
                              .split("T")[1]
                              .split(".")[0]
                              .slice(0, 5)}
                          </div>
                        </div>
                        <div className="eventclub">
                          <div className="eventclubtext">
                            By {eventdet.ofClubList[event.index]}
                          </div>
                          {/* <button className="editevent">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
                          stroke="#FFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button> */}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

        {/* all panels have been completed till here */}
        {/* now the ones appearing above the panels begin from here */}
        <div
          id="overlay4"
          onClick={neweventoff}
          style={{ display: overlayVisible ? "block" : "none" }}
        ></div>
        <div
          id="neweventfunction"
          style={{ display: overlayVisible ? "flex" : "none" }}
        >
          <input
            type="text"
            className="neweventname"
            placeholder="event name"
            value={eventsname}
            onChange={eventChange}
          />
          {/* <input
            type="text"
            className="neweventname"
            placeholder="club name"
            value={clubname}
            onChange={clubChange}
          /> */}
          <div   className="neweventname">
            {/* {console.log(userdetails)} */}
            {/* {console.log(userdetails.user?.included_in_clubs[0])} */}
            <select className="neweventname" style={{width:"100%"}}  onChange={clubChange}>
              {/* Add a default option */}
              <option value="" disabled selected>
                Select a club
              </option>
              {userdetails.IncludedInClubs?.map((cluboptions, clubindex) => (
                <option key={cluboptions} value={clubindex} style={{backgroundColor:"#2A2A2A", width:"100%"}} >
                  {cluboptions}
                </option>
              ))}
            </select>

            
            {/* {console.log(clubname)} */}
          </div>
          <div className="eventdate">
            <div className="eventdatetext">Event Date</div>
            <div className="inputdate">
              <input
                type="date"
                className="neweventdate"
                value={eventdate}
                onChange={eventdateChange}
              />
            </div>
          </div>
          <div className="timeselect">
            <div className="starttimetext">Start time</div>
            <input
              type="time"
              className="starttime"
              value={eventstarttime}
              onChange={eventstarttimeChange}
            />
            <div className="endtimetext">End time</div>
            <input
              type="time"
              className="endtime"
              value={eventendtime}
              onChange={eventendtimeChange}
            />
          </div>
          <button
            className="createevent"
            onClick={handleClick}
          >
            create event
          </button>
        </div>

        <div
          id="overlay2"
          onClick={addgroupoff}
          style={{ display: groupAddOverlay ? "block" : "none" }}
        ></div>
        <div
          id="addgroup"
          style={{ display: groupAddOverlay ? "flex" : "none" }}
        >
          <div className="groupheader">
            <div className="uploadicon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M14.1663 9.20825V12.7499C14.1663 13.5323 13.5321 14.1666 12.7497 14.1666H4.24967C3.46727 14.1666 2.83301 13.5323 2.83301 12.7499L2.83301 9.20825M11.333 5.66659L8.49967 2.83325M8.49967 2.83325L5.66634 5.66658M8.49967 2.83325L8.49967 11.3333"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input type="text" className="newgroup" placeholder="newgroup" />
            <button className="creategroupicon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
              >
                <path
                  d="M26.9164 14.25L15.8331 25.3334L11.083 20.5833"
                  stroke="#2A2A2A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <input
            type="text"
            className="groupdescription"
            placeholder="add description"
          />
          <div className="addmembers">add members</div>
          <input type="text" className="membersearchbar" placeholder="Search" />
          <div className="membersearchlist">
            <div className="membersearchlistbar">
              <div >Ashutosh khatri</div>

              <button className="check">
                <img
                  src="./images/unchecked.png"
                  className="checkbox"
                  alt="check icon"
                  height="20px"
                  width="20px"
                />
              </button>
            </div>
            <div className="membersearchlistbar">
              <div >power pp</div>

              <button className="check">
                <img
                  src="../images/checkbox.png"
                  className="checkbox"
                  alt="check icon"
                  height="20px"
                  width="20px"
                />
              </button>
            </div>
          </div>
        </div>
        <div 
          id="overlay"
          onClick={off}
          style={{ display: followoverlay ? "block" : "none" }}
        >
        </div>
        <div 
          id="followingadd" 
          style={{ display: followoverlay ? "flex" : "none" }}
        >
            <input type="text" id="searchbar" placeholder="Search" />
            <div className="line"></div>
            <div className="searchresult">
              {/* start here */}
              {clubdetails?.map((clubnames, clubindces)=>{
                const isFollowing = userdetails.user?.followingClubs.includes(clubnames._id);
                
                const handleUnfollow= async(e)=>{
                  setLoading(true);
                  try{
                    const response= await fetch(`${host}/unfollow/${clubnames._id}`,{
                    method:'PUT',
                    headers:{
                      'Content-Type': 'application/json',
                      'auth-token': localStorage.getItem('token'),
                    }
                  });
                  if(response.status===200){
                    console.log('unfollowed', clubnames.clubName)
                  }else{
                    console.log('failed to fetch')
                  }
                  } catch(error){
                    console.log('caught error', error)
                  }finally{
                    setLoading(false);
                  }
                };

                const handleFollow=async(e)=>{
                  setLoading(true);
                  try{
                    const response= await fetch(`${host}/follow/${clubnames._id}`,{
                    method:'PUT',
                    headers:{
                      'Content-Type': 'application/json',
                      'auth-token': localStorage.getItem('token'),
                    }
                  });
                  if(response.status===200){
                    console.log('followed', clubnames.clubName)
                  }else{
                    console.log('failed to fetch')
                  }
                  } catch(error){
                    console.log('caught error', error)
                  }finally{
                    setLoading(false);
                  }
                };
                return (
                
                <div className="searchlistbar"key={clubindces}>
                  <div className="profile">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" fill="none">
                          <circle cx="25" cy="25" r="25" fill="#DFDFDF"/>
                      </svg>
                  </div>
                  <div className="listdetails">
                      <div className="groupname">
                          {/* {console.log(clubnames._id)} */}
                          {clubnames.clubName}
                      </div>
                      <div className="groupcreator">
                        {/* {console.log(clubcreator[clubindces])} */}
                          {clubcreator[clubindces]}
                      </div>
                  </div>
                  {isFollowing ? (
                    <button id="unfollowbutton" onClick={handleUnfollow}>
                      Unfollow
                    </button>
                    ) : (
                    <button id="followbutton" onClick={handleFollow}>
                      Follow
                    </button>
                  )}
                </div> 
                )
              })}
                
              

            {/* end here */}
            </div>
        </div>
        </div>
      </div>
    </>
  );
};
export default home;
