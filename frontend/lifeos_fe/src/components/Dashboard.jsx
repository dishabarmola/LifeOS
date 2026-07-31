import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';


// ============================================================
// SVG ICONS
// ============================================================

const IconPlans = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);


const IconEvents = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);


const IconAcademics = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);


const IconSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);


const IconBell = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);


const IconChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);


// ============================================================
// HELPER FUNCTIONS
// ============================================================

const getPriorityColor = (priority) => {
  const normalizedPriority = priority?.toLowerCase();

  if (normalizedPriority === "high") {
    return "purple";
  }

  if (normalizedPriority === "medium") {
    return "orange";
  }

  return "green";
};


const formatTime = (time) => {
  if (!time) {
    return "";
  }

  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return time;
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
};


const formatDate = (date) => {
  if (!date) {
    return {
      day: "",
      month: ""
    };
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return {
      day: "",
      month: ""
    };
  }

  return {
    day: parsedDate.toLocaleDateString("en-US", {
      day: "2-digit"
    }),

    month: parsedDate.toLocaleDateString("en-US", {
      month: "short"
    }).toUpperCase()
  };
};


const formatAcademicDate = (date) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
};


const getAcademicColor = (priority) => {
  const normalizedPriority = priority?.toLowerCase();

  if (normalizedPriority === "high") {
    return "violet";
  }

  if (normalizedPriority === "medium") {
    return "blue";
  }

  return "slate";
};


// ============================================================
// DASHBOARD COMPONENT
// ============================================================

const Dashboard = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || user?._id;

  // ==========================================================
  // THEME STATE
  // ==========================================================

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("color-scheme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
  });


  // ==========================================================
  // NAVIGATION STATE
  // ==========================================================

  const [activeTab, setActiveTab] = useState("Dashboard");


  // ==========================================================
  // SEARCH STATE
  // ==========================================================

  const [searchQuery, setSearchQuery] = useState("");


  // ==========================================================
  // NOTIFICATION STATE
  // ==========================================================

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "DSA Assignment due tomorrow at 11:59 PM",
      unread: true
    },
    {
      id: 4,
      text: "Bank Visit starts in 1.5 hours",
      unread: false
    }
  ]);


  // ==========================================================
  // PROFILE STATE
  // ==========================================================

  const [isProfileOpen, setIsProfileOpen] = useState(false);


  // ==========================================================
  // API DATA STATES
  // ==========================================================

  const [cards, setCards] = useState([]);

  const [todayCalendar, setTodayCalendar] = useState([]);

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [academicTasks, setAcademicTasks] = useState([]);


  // ==========================================================
  // API LOADING / ERROR STATES
  // ==========================================================

  const [isLoading, setIsLoading] = useState(true);

  const [apiError, setApiError] = useState("");


  // ==========================================================
  // DARK MODE
  // ==========================================================

  useEffect(() => {

    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");

      localStorage.setItem(
        "color-scheme",
        "dark"
      );

    } else {

      root.classList.remove("dark");

      localStorage.setItem(
        "color-scheme",
        "light"
      );

    }

  }, [isDarkMode]);


  // ==========================================================
  // FETCH DASHBOARD CARDS
  // GET /dashboard/cards
  // ==========================================================

  const fetchCards = async () => {
    const result = await api.get(
      `/dashboard/cards${currentUserId ? `?userId=${encodeURIComponent(currentUserId)}` : ''}`
    );

    return result.data || [];
  };


  // ==========================================================
  // FETCH TODAY'S CALENDAR
  // GET /dashboard/calendar
  // ==========================================================

  const fetchCalendar = async () => {
    const result = await api.get(
      `/dashboard/calendar${currentUserId ? `?userId=${encodeURIComponent(currentUserId)}` : ''}`
    );

    return result.data || [];
  };


  // ==========================================================
  // FETCH EVENTS
  // GET /dashboard/events
  // ==========================================================

  const fetchEvents = async () => {
    const result = await api.get(
      `/dashboard/events${currentUserId ? `?userId=${encodeURIComponent(currentUserId)}` : ''}`
    );

    return result.data || [];
  };


  // ==========================================================
  // FETCH ACADEMICS
  // GET /dashboard/academics
  // ==========================================================

  const fetchAcademics = async () => {
    const result = await api.get(
      `/dashboard/academics${currentUserId ? `?userId=${encodeURIComponent(currentUserId)}` : ''}`
    );

    return result.data || [];
  };


  // ==========================================================
  // FETCH ALL DASHBOARD DATA
  // ==========================================================

  useEffect(() => {

    const loadDashboardData = async () => {

      try {

        setIsLoading(true);

        setApiError("");

        const [
          cardsData,
          calendarData,
          eventsData,
          academicsData
        ] = await Promise.all([
          fetchCards(),
          fetchCalendar(),
          fetchEvents(),
          fetchAcademics()
        ]);


        // ----------------------------------------------------
        // CARDS
        // ----------------------------------------------------

        setCards(cardsData);


        // ----------------------------------------------------
        // CALENDAR TRANSFORMATION
        //
        // Backend:
        // {
        //   type,
        //   title,
        //   description,
        //   time,
        //   priority
        // }
        // ----------------------------------------------------

        const transformedCalendar =
          calendarData.map((item, index) => {

            return {
              id: `${item.type}-${index}`,

              time: formatTime(item.time),

              title: item.title,

              category: item.priority || item.type,

              sub: item.description,

              color: getPriorityColor(
                item.priority
              )
            };

          });


        setTodayCalendar(
          transformedCalendar
        );


        // ----------------------------------------------------
        // EVENTS TRANSFORMATION
        //
        // Backend:
        // {
        //   type,
        //   title,
        //   description,
        //   date,
        //   priority
        // }
        // ----------------------------------------------------

        const transformedEvents =
          eventsData.map((event, index) => {

            const formattedDate =
              formatDate(event.date);

            return {
              id: `${event.type}-${index}`,

              date: formattedDate.day,

              month: formattedDate.month,

              title: event.title,

              description: event.description,

              priority:
                event.priority
                  ? event.priority.charAt(0).toUpperCase() +
                    event.priority.slice(1)
                  : "Low",

              time: "",

              location: event.description || "",

              color: getPriorityColor(
                event.priority
              )
            };

          });


        setUpcomingEvents(
          transformedEvents
        );


        // ----------------------------------------------------
        // ACADEMICS TRANSFORMATION
        //
        // Backend:
        // {
        //   type,
        //   title,
        //   description,
        //   date,
        //   priority
        // }
        // ----------------------------------------------------

        const transformedAcademics =
          academicsData.map((academic, index) => {

            return {
              id: `${academic.type}-${index}`,

              name: academic.title,

              details: academic.description,

              due: formatAcademicDate(
                academic.date
              ),

              progress: 0,

              color: getAcademicColor(
                academic.priority
              )
            };

          });


        setAcademicTasks(
          transformedAcademics
        );


      } catch (error) {

        console.error(
          "Dashboard API Error:",
          error
        );

        setApiError(
          error.message ||
          "Failed to load dashboard data"
        );

      } finally {

        setIsLoading(false);

      }

    };


    loadDashboardData();

  }, [currentUserId]);


  // ==========================================================
  // FIND CARD BY TYPE
  // ==========================================================

  const getCard = (type) => {

    return cards.find(
      card =>
        card.type?.toLowerCase() ===
        type.toLowerCase()
    );

  };


  // ==========================================================
  // CARD DATA
  // ==========================================================

  const eventsCard =
    getCard("events");

  const plansCard =
    getCard("plans");

  const academicsCard =
    getCard("academics");

  const newsCard =
    getCard("news");


  // ==========================================================
  // DASHBOARD COUNTS
  // ==========================================================

  const upcomingCount =
    eventsCard?.quantity ??
    upcomingEvents.length;


  const activePlansCount =
    plansCard?.quantity ??
    0;


  const activeTasksCount =
    academicsCard?.quantity ??
    academicTasks.length;


  // ==========================================================
  // SEARCH FILTERS
  // ==========================================================

  const normalizedSearch =
    searchQuery.toLowerCase();


  const filteredCalendar =
    todayCalendar.filter(item => {

      return (
        item.title
          ?.toLowerCase()
          .includes(normalizedSearch) ||

        item.sub
          ?.toLowerCase()
          .includes(normalizedSearch)
      );

    });


  const filteredTasks =
    academicTasks.filter(task => {

      return (
        task.name
          ?.toLowerCase()
          .includes(normalizedSearch) ||

        task.details
          ?.toLowerCase()
          .includes(normalizedSearch)
      );

    });


  const filteredUpcoming =
    upcomingEvents.filter(event => {

      return (
        event.title
          ?.toLowerCase()
          .includes(normalizedSearch) ||

        event.location
          ?.toLowerCase()
          .includes(normalizedSearch)
      );

    });


  // ==========================================================
  // CLEAR NOTIFICATIONS
  // ==========================================================

  const clearNotifications = () => {

    setNotifications(
      prev =>
        prev.map(
          notification => ({
            ...notification,
            unread: false
          })
        )
    );

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0c16] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 antialiased">

      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50 dark:bg-[#07080f] transition-colors duration-300 relative">


        {/* ================================================== */}
        {/* TOP HEADER */}
        {/* ================================================== */}

        <header className="h-20 shrink-0 px-8 border-b border-slate-100 dark:border-slate-800/80 bg-white/75 dark:bg-[#0c0c1e]/75 backdrop-blur-md flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">


          {/* SEARCH */}

          <div className="relative group">

            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-violet-600 transition-colors">

              <IconSearch />

            </span>


            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:bg-white focus:dark:bg-slate-900 border border-transparent focus:border-violet-500/30 rounded-full pl-10 pr-12 py-2 text-sm w-64 md:w-80 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-200"
            />


            <span className="absolute right-3.5 inset-y-0 flex items-center text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded my-auto h-5 pointer-events-none select-none">

              ⌘ K

            </span>

          </div>


          {/* HEADER RIGHT */}

          <div className="flex items-center gap-6">


            {/* NOTIFICATION */}

            <div className="relative">

              <button
                onClick={() =>
                  setIsNotificationOpen(
                    !isNotificationOpen
                  )
                }
                className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 relative transition-all duration-200 focus:outline-none"
              >

                <IconBell />


                {notifications.some(
                  n => n.unread
                ) && (

                  <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full border-2 border-white dark:border-[#0c0c1e] text-[9px] font-bold text-white flex items-center justify-center animate-pulse">

                    {
                      notifications.filter(
                        n => n.unread
                      ).length
                    }

                  </span>

                )}

              </button>


              {isNotificationOpen && (

                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/60 rounded-2xl shadow-xl z-30 py-3.5">

                  <div className="px-4.5 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">

                    <span className="font-semibold text-sm">
                      Notifications
                    </span>

                    <button
                      onClick={
                        clearNotifications
                      }
                      className="text-xs text-violet-600 hover:text-violet-500 font-medium"
                    >
                      Mark all read
                    </button>

                  </div>


                  <div className="max-h-64 overflow-y-auto">

                    {notifications.length === 0 ? (

                      <p className="text-center text-xs text-slate-400 py-6">
                        No notifications
                      </p>

                    ) : (

                      notifications.map(
                        notification => (

                          <div
                            key={
                              notification.id
                            }
                            className={`px-4.5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 flex items-start gap-2.5 transition-colors ${
                              notification.unread
                                ? "bg-violet-500/5"
                                : ""
                            }`}
                          >

                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${
                                notification.unread
                                  ? "bg-violet-500"
                                  : "bg-slate-300 dark:bg-slate-700"
                              }`}
                            />

                            <p
                              className={`text-xs leading-relaxed ${
                                notification.unread
                                  ? "font-medium text-slate-900 dark:text-slate-100"
                                  : "text-slate-500"
                              }`}
                            >
                              {
                                notification.text
                              }
                            </p>

                          </div>

                        )
                      )

                    )}

                  </div>

                </div>

              )}

            </div>


            {/* PROFILE */}

            <button
              onClick={() =>
                setIsProfileOpen(true)
              }
              className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none group text-left"
            >

              <div className="relative">

                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                  alt="Disha"
                  className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/20 group-hover:border-violet-500 transition-colors"
                />

                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c0c1e]" />

              </div>


              <div className="hidden sm:block">

                <h4 className="text-sm font-semibold leading-none text-slate-800 dark:text-slate-100">
                  Disha
                </h4>

                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Premium Member
                </span>

              </div>

            </button>

          </div>

        </header>


        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <div className="flex-1 w-full flex flex-col gap-8 p-8">


          {/* API ERROR */}

          {apiError && (

            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 text-sm">

              {apiError}

            </div>

          )}


          {/* ================================================= */}
          {/* DASHBOARD */}
          {/* ================================================= */}

          {activeTab === "Dashboard" && (

            <>

              {/* WELCOME */}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">

                    Good morning, Disha!

                    <span className="animate-spin-slow">
                      ☀️
                    </span>

                  </h1>


                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">

                    Here's your overview for today,{" "}

                    {new Date().toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                      }
                    )}

                  </p>

                </div>

              </div>


              {/* ================================================= */}
              {/* STATS GRID */}
              {/* ================================================= */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">


                {/* EVENTS */}

                <div
                  onClick={() =>
                    setActiveTab("Events")
                  }
                  className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-violet-500/20 dark:hover:border-violet-500/30 transition-all duration-300 cursor-pointer group"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">

                      <IconEvents />

                    </div>

                  </div>


                  <div>

                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">

                      {isLoading
                        ? "..."
                        : upcomingCount}

                    </h3>

                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">

                      Upcoming Events

                    </p>

                  </div>


                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">

                    <span>

                      Next:{" "}

                      {eventsCard?.next ||
                        upcomingEvents[0]?.title ||
                        "None"}

                    </span>

                    <span className="text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">

                      <IconChevronRight />

                    </span>

                  </div>

                </div>


                {/* PLANS */}

                <div
                  onClick={() =>
                    setActiveTab("Plans")
                  }
                  className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-emerald-500/20 dark:hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">

                      <IconPlans />

                    </div>

                  </div>


                  <div>

                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">

                      {isLoading
                        ? "..."
                        : activePlansCount}

                    </h3>

                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">

                      Plans This Week

                    </p>

                  </div>


                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">

                    <span>

                      Next:{" "}

                      {plansCard?.next ||
                        "None"}

                    </span>

                    <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">

                      <IconChevronRight />

                    </span>

                  </div>

                </div>


                {/* ACADEMICS */}

                <div
                  onClick={() =>
                    setActiveTab("Academics")
                  }
                  className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-blue-500/20 dark:hover:border-blue-500/30 transition-all duration-300 cursor-pointer group"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">

                      <IconAcademics />

                    </div>

                  </div>


                  <div>

                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">

                      {isLoading
                        ? "..."
                        : activeTasksCount}

                    </h3>

                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">

                      Academic Tasks

                    </p>

                  </div>


                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">

                    <span>

                      {academicsCard?.next ||
                        "No upcoming task"}

                    </span>

                    <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">

                      <IconChevronRight />

                    </span>

                  </div>

                </div>


                {/* NEWS */}

                <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/30 transition-all duration-300">

                  <div className="flex items-center justify-between">

                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center">

                      📰

                    </div>

                  </div>


                  <div>

                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">

                      {isLoading
                        ? "..."
                        : newsCard?.quantity ?? 0}

                    </h3>

                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">

                      News

                    </p>

                  </div>


                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">

                    <span>

                      Next:{" "}

                      {newsCard?.next ||
                        "None"}

                    </span>

                  </div>

                </div>


              </div>


              {/* ================================================= */}
              {/* MIDDLE ROW */}
              {/* ================================================= */}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6.5">


                {/* COLUMN 1 */}

                <div className="flex flex-col gap-6.5">


                  {/* TODAY'S CALENDAR */}

                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-5 relative overflow-hidden">

                    <div className="flex items-center justify-between">

                      <div>

                        <h2 className="text-lg font-bold text-slate-950 dark:text-white">

                          Today's Calendar

                        </h2>

                        <p className="text-xs text-slate-400 mt-0.5">

                          {new Date().toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric"
                            }
                          )}

                        </p>

                      </div>


                      <button
                        onClick={() =>
                          setActiveTab("Calendar")
                        }
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-bold transition-all"
                      >
                        View All
                      </button>

                    </div>


                    <div className="flex flex-col gap-4 relative pl-3.5 before:absolute before:inset-y-1.5 before:left-0.5 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">

                      {isLoading ? (

                        <p className="text-center text-xs text-slate-400 py-6">

                          Loading calendar...

                        </p>

                      ) : filteredCalendar.length === 0 ? (

                        <p className="text-center text-xs text-slate-400 py-6">

                          No matching events today

                        </p>

                      ) : (

                        filteredCalendar.map(
                          evt => (

                            <div
                              key={evt.id}
                              className="flex gap-4 relative group"
                            >

                              <span
                                className={`absolute -left-[16.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#121324] z-10 transition-transform group-hover:scale-125 ${
                                  evt.color === "purple"
                                    ? "bg-violet-600"
                                    : evt.color === "green"
                                    ? "bg-emerald-500"
                                    : evt.color === "orange"
                                    ? "bg-orange-500"
                                    : "bg-blue-500"
                                }`}
                              />


                              <div className="w-16.5 shrink-0 text-xs font-semibold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors pt-0.5">

                                {evt.time}

                              </div>


                              <div className="flex-1 flex items-start justify-between gap-2.5">

                                <div>

                                  <h4 className="text-sm font-bold leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">

                                    {evt.title}

                                  </h4>

                                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5">

                                    {evt.sub}

                                  </span>

                                </div>


                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    evt.color === "purple"
                                      ? "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400"
                                      : evt.color === "green"
                                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                                      : evt.color === "orange"
                                      ? "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400"
                                      : "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                                  }`}
                                >

                                  {evt.category}

                                </span>

                              </div>

                            </div>

                          )
                        )

                      )}

                    </div>

                  </div>


                  {/* UPCOMING EVENTS */}

                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-4">

                    <div className="flex items-center justify-between">

                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">

                        Upcoming Events

                      </h2>


                      <button
                        onClick={() =>
                          setActiveTab("Events")
                        }
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-bold transition-all"
                      >
                        View All
                      </button>

                    </div>


                    <div className="flex flex-col gap-3.5">

                      {isLoading ? (

                        <p className="text-center text-xs text-slate-400 py-6">

                          Loading events...

                        </p>

                      ) : filteredUpcoming.length === 0 ? (

                        <p className="text-center text-xs text-slate-400 py-6">

                          No matching upcoming events

                        </p>

                      ) : (

                        filteredUpcoming.map(
                          event => (

                            <div
                              key={event.id}
                              className="flex items-center gap-4.5 p-3 rounded-xl border border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 hover:-translate-y-0.5 transition-all duration-200"
                            >

                              <div
                                className={`w-12.5 h-12.5 rounded-xl flex flex-col items-center justify-center text-center font-bold shadow-sm ${
                                  event.priority === "High"
                                    ? "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400"
                                    : event.priority === "Medium"
                                    ? "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400"
                                    : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                                }`}
                              >

                                <span className="text-lg leading-none">

                                  {event.date}

                                </span>

                                <span className="text-[10px] tracking-wider mt-0.5 leading-none">

                                  {event.month}

                                </span>

                              </div>


                              <div className="flex-1 min-w-0">

                                <div className="flex items-center justify-between">

                                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">

                                    {event.title}

                                  </h4>


                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      event.priority === "High"
                                        ? "bg-violet-50 dark:bg-violet-950/40 text-violet-600"
                                        : event.priority === "Medium"
                                        ? "bg-orange-50 dark:bg-orange-950/40 text-orange-600"
                                        : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600"
                                    }`}
                                  >

                                    {event.priority}

                                  </span>

                                </div>


                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">

                                  {event.description}

                                </p>

                              </div>

                            </div>

                          )
                        )

                      )}

                    </div>

                  </div>

                </div>


                {/* COLUMN 2 */}

                <div className="flex flex-col gap-6.5">


                  {/* ACADEMIC TASKS */}

                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-5">

                    <div className="flex items-center justify-between">

                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">

                        Academic Tasks

                      </h2>


                      <button
                        onClick={() =>
                          setActiveTab("Academics")
                        }
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-bold transition-all"
                      >

                        View All

                      </button>

                    </div>


                    <div className="flex flex-col gap-4">

                      {isLoading ? (

                        <p className="text-center text-xs text-slate-400 py-6">

                          Loading academic tasks...

                        </p>

                      ) : filteredTasks.length === 0 ? (

                        <p className="text-center text-xs text-slate-400 py-6">

                          No matching tasks

                        </p>

                      ) : (

                        filteredTasks.map(
                          task => (

                            <div
                              key={task.id}
                              className="flex flex-col gap-2 p-3 border border-slate-50 dark:border-slate-800/50 rounded-xl hover:shadow-sm transition-all duration-200"
                            >

                              <div className="flex items-start justify-between gap-2.5">

                                <div className="flex items-center gap-3">

                                  <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                      task.color === "violet"
                                        ? "bg-violet-50 dark:bg-violet-950/30 text-violet-600"
                                        : task.color === "blue"
                                        ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                    }`}
                                  >

                                    <IconAcademics />

                                  </div>


                                  <div>

                                    <h4 className="text-sm font-bold leading-snug">

                                      {task.name}

                                    </h4>


                                    <span className="text-[11px] text-slate-400 font-medium">

                                      {task.details}

                                    </span>

                                  </div>

                                </div>


                                <div className="text-right">

                                  <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">

                                    Due {task.due}

                                  </span>

                                </div>

                              </div>


                              <div className="flex items-center gap-3 mt-1">

                                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">

                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${
                                      task.color === "violet"
                                        ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                                        : task.color === "blue"
                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                        : "bg-slate-300 dark:bg-slate-700"
                                    }`}
                                    style={{
                                      width: `${task.progress}%`
                                    }}
                                  />

                                </div>


                                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 w-8.5 text-right">

                                  {task.progress}%

                                </span>

                              </div>

                            </div>

                          )
                        )

                      )}

                    </div>

                  </div>

                </div>

              </div>


              {/* ================================================= */}
              {/* BOTTOM ROW */}
              {/* ================================================= */}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


                {/* STAY CONSISTENT */}

                <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all duration-300">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">

                      <svg
                        className="w-6 h-6 animate-spin-slow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>

                    </div>


                    <div>

                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">

                        Stay consistent

                      </h4>

                      <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">

                        Keep building your daily routine!

                      </p>

                    </div>

                  </div>

                </div>


                {/* QUOTE */}

                <div className="md:col-span-3 bg-gradient-to-r from-violet-950 via-indigo-950 to-blue-900 border border-slate-900 rounded-2xl p-6.5 text-white flex items-center relative overflow-hidden shadow-xl shadow-slate-100/30 dark:shadow-none min-h-[110px]">

                  <div className="flex items-center gap-5.5 relative z-10 max-w-[70%]">

                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">

                      <span className="text-amber-400">

                        <svg
                          className="w-5.5 h-5.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>

                      </span>

                    </div>


                    <div>

                      <blockquote className="text-sm font-semibold tracking-wide leading-relaxed italic text-slate-100">

                        "Discipline is choosing between what you want now and what you want most."

                      </blockquote>


                      <cite className="text-xs font-bold text-indigo-300 block mt-1.5 not-italic">

                        — Abraham Lincoln

                      </cite>

                    </div>

                  </div>


                  <div className="absolute right-0 bottom-0 h-full w-1/3 md:w-1/2 opacity-35 md:opacity-100 pointer-events-none z-0">

                    <svg
                      className="h-full w-full object-cover float-right"
                      viewBox="0 0 300 120"
                      preserveAspectRatio="none"
                      fill="none"
                    >

                      <circle
                        cx="240"
                        cy="30"
                        r="15"
                        fill="#fef08a"
                        opacity="0.15"
                      />

                      <circle
                        cx="240"
                        cy="30"
                        r="25"
                        fill="#fef08a"
                        opacity="0.05"
                      />

                      <path
                        d="M100,120 L150,40 L210,120 Z"
                        fill="#312e81"
                        opacity="0.4"
                      />

                      <path
                        d="M160,120 L220,50 L280,120 Z"
                        fill="#1e1b4b"
                        opacity="0.6"
                      />

                      <path
                        d="M60,120 L120,65 L180,120 Z"
                        fill="#1e3a8a"
                        opacity="0.3"
                      />

                      <path
                        d="M200,120 L250,75 L300,120 Z"
                        fill="#2e1065"
                        opacity="0.8"
                      />

                    </svg>

                  </div>

                </div>

              </div>

            </>

          )}


          {/* ================================================= */}
          {/* PLANS SUB-PANEL */}
          {/* ================================================= */}

          {activeTab === "Plans" && (

            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">

              <div>

                <h1 className="text-2xl font-bold">

                  Plans & Boards

                </h1>

                <p className="text-sm text-slate-400 mt-1">

                  Your plans are currently summarized through the dashboard cards API.

                </p>

              </div>


              <div className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10">

                <p className="text-sm font-semibold">

                  Next Plan

                </p>

                <p className="text-sm text-slate-500 mt-2">

                  {plansCard?.next ||
                    "No upcoming plans"}

                </p>

              </div>

            </div>

          )}


          {/* ================================================= */}
          {/* EVENTS SUB-PANEL */}
          {/* ================================================= */}

          {activeTab === "Events" && (

            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">

              <div>

                <h1 className="text-2xl font-bold">

                  Upcoming Events Portal

                </h1>

                <p className="text-sm text-slate-400 mt-1">

                  Full tracker of your upcoming events.

                </p>

              </div>


              <div className="flex flex-col gap-4 mt-4">

                {upcomingEvents.length === 0 ? (

                  <p className="text-center text-sm text-slate-400 py-8">

                    No upcoming events.

                  </p>

                ) : (

                  upcomingEvents.map(
                    event => (

                      <div
                        key={event.id}
                        className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/10 flex items-center justify-between gap-4"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-600 flex flex-col items-center justify-center font-bold text-center">

                            <span className="text-base leading-none">

                              {event.date}

                            </span>

                            <span className="text-[9px] uppercase mt-0.5">

                              {event.month}

                            </span>

                          </div>


                          <div>

                            <h3 className="font-bold text-sm">

                              {event.title}

                            </h3>

                            <p className="text-xs text-slate-400 mt-0.5">

                              {event.description}

                            </p>

                          </div>

                        </div>


                        <span
                          className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                            event.priority === "High"
                              ? "bg-violet-100 text-violet-700"
                              : event.priority === "Medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >

                          {event.priority} Priority

                        </span>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          )}


          {/* ================================================= */}
          {/* ACADEMICS SUB-PANEL */}
          {/* ================================================= */}

          {activeTab === "Academics" && (

            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">

              <div>

                <h1 className="text-2xl font-bold">

                  Academic Tasks Dashboard

                </h1>

                <p className="text-sm text-slate-400 mt-1">

                  Track assignments, exams, projects, and academic schedules.

                </p>

              </div>


              <div className="flex flex-col gap-5 mt-4">

                {academicTasks.length === 0 ? (

                  <p className="text-center text-sm text-slate-400 py-8">

                    No academic tasks.

                  </p>

                ) : (

                  academicTasks.map(
                    task => (

                      <div
                        key={task.id}
                        className="p-5 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 rounded-xl flex flex-col gap-4"
                      >

                        <div className="flex items-center justify-between">

                          <div>

                            <h3 className="font-bold text-base">

                              {task.name}

                            </h3>

                            <p className="text-xs text-slate-400 mt-0.5">

                              {task.details} • Due {task.due}

                            </p>

                          </div>


                          <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 px-3 py-1 rounded-full">

                            {task.progress}% Done

                          </span>

                        </div>


                        <div className="flex items-center gap-4">

                          <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">

                            <div
                              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                              style={{
                                width: `${task.progress}%`
                              }}
                            />

                          </div>

                        </div>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          )}


          {/* ================================================= */}
          {/* CALENDAR SUB-PANEL */}
          {/* ================================================= */}

          {activeTab === "Calendar" && (

            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">

              <h1 className="text-2xl font-bold">

                Calendar Agenda

              </h1>

              <p className="text-sm text-slate-400 mt-1">

                Today's schedule and activities.

              </p>


              <div className="flex flex-col gap-3 mt-4">

                {todayCalendar.length === 0 ? (

                  <p className="text-center text-sm text-slate-400 py-8">

                    No calendar items for today.

                  </p>

                ) : (

                  todayCalendar.map(
                    evt => (

                      <div
                        key={evt.id}
                        className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between"
                      >

                        <div>

                          <h4 className="font-bold text-sm">

                            {evt.title}

                          </h4>

                          <p className="text-xs text-slate-400 mt-0.5">

                            {evt.time} • {evt.sub}

                          </p>

                        </div>


                        <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">

                          {evt.category}

                        </span>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          )}


          {/* ================================================= */}
          {/* SETTINGS */}
          {/* ================================================= */}

          {activeTab === "Settings" && (

            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">

              <h1 className="text-2xl font-bold">

                Account Settings

              </h1>

              <p className="text-sm text-slate-400 mt-1">

                Manage themes, profiles, goals and preferences.

              </p>


              <div className="flex flex-col gap-4.5 mt-4">


                {/* THEME */}

                <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">

                  <div>

                    <h4 className="font-bold text-sm">

                      Theme Settings

                    </h4>

                    <p className="text-xs text-slate-400 mt-0.5">

                      Toggle between light and dark themes

                    </p>

                  </div>


                  <button
                    onClick={() =>
                      setIsDarkMode(
                        !isDarkMode
                      )
                    }
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-all"
                  >

                    Switch to{" "}

                    {isDarkMode
                      ? "Light"
                      : "Dark"}{" "}

                    Theme

                  </button>

                </div>


                {/* PROFILE */}

                <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">

                  <div>

                    <h4 className="font-bold text-sm">

                      User Details

                    </h4>

                    <p className="text-xs text-slate-400 mt-0.5">

                      Rename user accounts or profile indicators

                    </p>

                  </div>


                  <button
                    onClick={() =>
                      setIsProfileOpen(
                        true
                      )
                    }
                    className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-xs px-3.5 py-2 rounded-lg hover:opacity-90"
                  >

                    Edit Profile

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>


      {/* ====================================================== */}
      {/* PROFILE MODAL */}
      {/* ====================================================== */}

      {isProfileOpen && (

        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full max-w-sm shadow-2xl p-6.5 flex flex-col items-center text-center gap-4.5 animate-scale-up">


            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                alt="Disha"
                className="w-24 h-24 rounded-full object-cover border-4 border-violet-500/20"
              />

              <span className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-[#121324]" />

            </div>


            <div>

              <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">

                Disha

              </h3>

              <p className="text-xs text-slate-400 mt-0.5">

                disha@lifeos.io • Premium Account

              </p>

            </div>


            <div className="w-full bg-slate-50 dark:bg-slate-850 p-4 rounded-xl flex flex-col gap-2.5 text-left border border-slate-100 dark:border-slate-800/60">

              <div className="flex justify-between items-center">

                <span className="text-xs text-slate-400 font-bold uppercase">

                  Workouts Finished

                </span>

                <span className="text-xs font-extrabold text-slate-800 dark:text-white">

                  4 Sessions

                </span>

              </div>


              <div className="flex justify-between items-center">

                <span className="text-xs text-slate-400 font-bold uppercase">

                  Tasks Resolved

                </span>

                <span className="text-xs font-extrabold text-slate-800 dark:text-white">

                  12 Tasks

                </span>

              </div>


              <div className="flex justify-between items-center">

                <span className="text-xs text-slate-400 font-bold uppercase">

                  Hydration Level

                </span>

              </div>

            </div>


            <button
              onClick={() =>
                setIsProfileOpen(false)
              }
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs py-3 rounded-lg w-full hover:opacity-95 shadow-md shadow-violet-500/10 transition-all focus:outline-none"
            >

              Done View

            </button>

          </div>

        </div>

      )}

    </div>

  );

};


export default Dashboard;