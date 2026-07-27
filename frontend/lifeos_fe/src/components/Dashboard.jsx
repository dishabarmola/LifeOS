import React, { useState, useEffect } from 'react';

// SVG Icons as components to keep JSX clean and modular
const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const IconPlans = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconEvents = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconAcademics = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconHealth = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const IconNews = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M16 8h2" />
    <path d="M16 12h2" />
    <path d="M16 16h2" />
    <path d="M6 8h6v8H6z" />
  </svg>
);

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

const IconReview = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconMoon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Dashboard = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('color-scheme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Notification state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "DSA Assignment due tomorrow at 11:59 PM", unread: true },
    { id: 2, text: "Your health score improved by 3% this week!", unread: true },
    { id: 3, text: "New AI digest ready for you to read", unread: true },
    { id: 4, text: "Bank Visit starts in 1.5 hours", unread: false }
  ]);

  // Modal states
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isHealthPlanOpen, setIsHealthPlanOpen] = useState(false);
  const [isNewsDigestOpen, setIsNewsDigestOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Form states for Quick Add
  const [quickAddType, setQuickAddType] = useState('event'); // event, plan, task
  const [quickAddTitle, setQuickAddTitle] = useState('');
  const [quickAddDetail, setQuickAddDetail] = useState('');
  const [quickAddPriority, setQuickAddPriority] = useState('Medium');
  const [quickAddDate, setQuickAddDate] = useState('');
  const [quickAddProgress, setQuickAddProgress] = useState(0);

  // Health portal state overrides
  const [waterIntake, setWaterIntake] = useState(2.6);
  const [sleepHours, setSleepHours] = useState(7.2);
  const [dailySteps, setDailySteps] = useState(8432);
  const [weightLogs, setWeightLogs] = useState([70, 68.2, 66.5, 64.1, 62.4]);
  const [weightInput, setWeightInput] = useState('62.4');

  // Core Data Lists
  const [todayCalendar, setTodayCalendar] = useState([
    { id: 1, time: "10:00 AM", title: "Bank Visit", category: "High", sub: "State Bank, Connaught Place", color: "purple" },
    { id: 2, time: "12:30 PM", title: "Lunch with Neha", category: "Plan", sub: "Cafe Delhi Heights", color: "green" },
    { id: 3, time: "03:00 PM", title: "Study Session", category: "Academic", sub: "DSA Practice", color: "blue" },
    { id: 4, time: "07:00 PM", title: "Gym Workout", category: "Health", sub: "Push Day", color: "orange" }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, date: "24", month: "JUL", title: "Client Meeting", priority: "High", time: "10:00 AM", location: "Zoom Call", color: "purple" },
    { id: 2, date: "25", month: "JUL", title: "Income Tax Filing", priority: "Medium", time: "11:00 AM", location: "Online", color: "orange" },
    { id: 3, date: "26", month: "JUL", title: "Passport Appointment", priority: "Low", time: "02:30 PM", location: "PSK, Delhi", color: "green" }
  ]);

  const [academicTasks, setAcademicTasks] = useState([
    { id: 1, name: "DSA Assignment", details: "Data Structures", due: "24 Jul", progress: 60, color: "violet" },
    { id: 2, name: "DBMS Project", details: "Database Systems", due: "26 Jul", progress: 30, color: "blue" },
    { id: 3, name: "Operating Systems Exam", details: "OS", due: "30 Jul", progress: 0, color: "slate" },
    { id: 4, name: "Web Dev Project", details: "Web Technologies", due: "02 Aug", progress: 75, color: "orange" }
  ]);

  const [weeklyPlans, setWeeklyPlans] = useState([
    { id: 1, title: "Movie Night", completed: false },
    { id: 2, title: "Organize Wardrobe", completed: true },
    { id: 3, title: "Call Parents", completed: true },
    { id: 4, title: "Read 2 Chapters of Book", completed: false }
  ]);

  // Synchronize system dark mode changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('color-scheme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('color-scheme', 'light');
    }
  }, [isDarkMode]);

  // Handle Quick Add submit
  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickAddTitle.trim()) return;

    if (quickAddType === 'event') {
      // Add to Today's Calendar
      const timeVal = quickAddDetail.includes(':') ? quickAddDetail : "09:00 AM";
      const newCalItem = {
        id: Date.now(),
        time: timeVal,
        title: quickAddTitle,
        category: quickAddPriority === 'High' ? 'High' : (quickAddPriority === 'Low' ? 'Health' : 'Academic'),
        sub: quickAddDetail || "No details provided",
        color: quickAddPriority === 'High' ? 'purple' : (quickAddPriority === 'Low' ? 'green' : 'blue')
      };
      setTodayCalendar([...todayCalendar, newCalItem]);

      // Add to Upcoming Events as well
      const formattedDate = quickAddDate ? quickAddDate.split('-')[2] || "27" : "27";
      const formattedMonth = quickAddDate ? new Date(quickAddDate).toLocaleString('default', { month: 'short' }).toUpperCase() : "JUL";
      const newUpcomingItem = {
        id: Date.now() + 1,
        date: formattedDate,
        month: formattedMonth,
        title: quickAddTitle,
        priority: quickAddPriority,
        time: timeVal,
        location: quickAddDetail || "Remote",
        color: quickAddPriority === 'High' ? 'purple' : (quickAddPriority === 'Low' ? 'green' : 'orange')
      };
      setUpcomingEvents([...upcomingEvents, newUpcomingItem]);

      // Update Notifications
      setNotifications([
        { id: Date.now(), text: `Added event: ${quickAddTitle}`, unread: true },
        ...notifications
      ]);

    } else if (quickAddType === 'plan') {
      const newPlan = {
        id: Date.now(),
        title: quickAddTitle,
        completed: false
      };
      setWeeklyPlans([...weeklyPlans, newPlan]);
      setNotifications([
        { id: Date.now(), text: `Added plan: ${quickAddTitle}`, unread: true },
        ...notifications
      ]);

    } else if (quickAddType === 'task') {
      const newProg = quickAddProgress ? parseInt(quickAddProgress) : 0;
      const newTask = {
        id: Date.now(),
        name: quickAddTitle,
        details: quickAddDetail || "Self Study",
        due: quickAddDate ? new Date(quickAddDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "31 Jul",
        progress: newProg,
        color: newProg > 70 ? 'orange' : (newProg > 30 ? 'blue' : 'violet')
      };
      setAcademicTasks([...academicTasks, newTask]);
      setNotifications([
        { id: Date.now(), text: `Added task: ${quickAddTitle}`, unread: true },
        ...notifications
      ]);
    }

    // Reset forms and close
    setQuickAddTitle('');
    setQuickAddDetail('');
    setQuickAddPriority('Medium');
    setQuickAddDate('');
    setQuickAddProgress(0);
    setIsQuickAddOpen(false);
  };

  // Adjust Task Progress dynamically on Dashboard
  const handleProgressChange = (taskId, amount) => {
    setAcademicTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const nextProg = Math.max(0, Math.min(100, task.progress + amount));
          let nextColor = task.color;
          if (nextProg === 100) nextColor = 'emerald';
          else if (nextProg > 60) nextColor = 'orange';
          else if (nextProg > 30) nextColor = 'blue';
          else nextColor = 'violet';
          return { ...task, progress: nextProg, color: nextColor };
        }
        return task;
      })
    );
  };

  // Log water intake
  const adjustWater = (amount) => {
    setWaterIntake(prev => Math.max(0, parseFloat((prev + amount).toFixed(1))));
  };

  // Log steps
  const adjustSteps = (amount) => {
    setDailySteps(prev => Math.max(0, prev + amount));
  };

  // Log weight
  const addWeightLog = (e) => {
    e.preventDefault();
    const parsedWeight = parseFloat(weightInput);
    if (!isNaN(parsedWeight) && parsedWeight > 0) {
      const logs = [...weightLogs.slice(1), parsedWeight];
      setWeightLogs(logs);
      setNotifications([
        { id: Date.now(), text: `Logged new weight: ${parsedWeight} kg`, unread: true },
        ...notifications
      ]);
    }
  };

  // Quick count calculations
  const upcomingCount = upcomingEvents.length;
  const activePlansCount = weeklyPlans.filter(p => !p.completed).length;
  const activeTasksCount = academicTasks.filter(t => t.progress < 100).length;

  // Filter systems based on search
  const filteredCalendar = todayCalendar.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTasks = academicTasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUpcoming = upcomingEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Clear unread notifications
  const clearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0c16] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 antialiased">
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50 dark:bg-[#07080f] transition-colors duration-300 relative">
        
        {/* Top Header Bar */}
        <header className="h-20 shrink-0 px-8 border-b border-slate-100 dark:border-slate-800/80 bg-white/75 dark:bg-[#0c0c1e]/75 backdrop-blur-md flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
          
          {/* Left search */}
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-violet-600 transition-colors">
              <IconSearch />
            </span>
            <input 
              type="text" 
              placeholder="Search anything..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:bg-white focus:dark:bg-slate-900 border border-transparent focus:border-violet-500/30 rounded-full pl-10 pr-12 py-2 text-sm w-64 md:w-80 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-200"
            />
            <span className="absolute right-3.5 inset-y-0 flex items-center text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded my-auto h-5 pointer-events-none select-none">
              ⌘ K
            </span>
          </div>

          {/* Right details */}
          <div className="flex items-center gap-6">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 relative transition-all duration-200 focus:outline-none"
              >
                <IconBell />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full border-2 border-white dark:border-[#0c0c1e] text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/60 rounded-2xl shadow-xl z-30 py-3.5">
                  <div className="px-4.5 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-sm">Notifications</span>
                    <button 
                      onClick={clearNotifications}
                      className="text-xs text-violet-600 hover:text-violet-500 font-medium"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 py-6">No notifications</p>
                    ) : (
                      notifications.map(noti => (
                        <div 
                          key={noti.id} 
                          className={`px-4.5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 flex items-start gap-2.5 transition-colors ${noti.unread ? 'bg-violet-500/5' : ''}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${noti.unread ? 'bg-violet-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                          <p className={`text-xs leading-relaxed ${noti.unread ? 'font-medium text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>{noti.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <button 
              onClick={() => setIsProfileOpen(true)}
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
                <h4 className="text-sm font-semibold leading-none text-slate-800 dark:text-slate-100">Disha</h4>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Premium Member</span>
              </div>
            </button>

          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 w-full flex flex-col gap-8 p-8">
          
          {/* RENDER ACTIVE TAB */}
          {activeTab === 'Dashboard' && (
            <>
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
                    Good morning, Disha! <span className="animate-spin-slow">☀️</span>
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                    Here's your overview for today, {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <button 
                  onClick={() => setIsQuickAddOpen(true)}
                  className="bg-[#4f46e5] hover:bg-[#4338ca] hover:shadow-indigo-500/20 hover:scale-102 hover:-translate-y-0.5 active:translate-y-0 text-white font-semibold text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 transition-all duration-200"
                >
                  <IconPlus />
                  <span>Quick Add</span>
                </button>
              </div>

              {/* Stats Grid Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
                
                {/* Events Card */}
                <div 
                  onClick={() => setActiveTab('Events')}
                  className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-violet-500/20 dark:hover:border-violet-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                      <IconEvents />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{upcomingCount}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Upcoming Events</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">
                    <span>Next: {upcomingEvents[0]?.title || "None"}</span>
                    <span className="text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform"><IconChevronRight /></span>
                  </div>
                </div>

                {/* Plans Card */}
                <div 
                  onClick={() => setActiveTab('Plans')}
                  className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-emerald-500/20 dark:hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <IconPlans />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{activePlansCount}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Plans This Week</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">
                    <span>Next: {weeklyPlans.find(p => !p.completed)?.title || "None"}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"><IconChevronRight /></span>
                  </div>
                </div>

                {/* Academics Card */}
                <div 
                  onClick={() => setActiveTab('Academics')}
                  className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-blue-500/20 dark:hover:border-blue-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <IconAcademics />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{activeTasksCount}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Academic Tasks</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">
                    <span>1 Due Tomorrow</span>
                    <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"><IconChevronRight /></span>
                  </div>
                </div>

                {/* Health Score Card */}
                <div 
                  onClick={() => setActiveTab('Health & Fitness')}
                  className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                      <IconHealth />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">87%</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Health Score</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">
                    <span>Great job!</span>
                    <span className="text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform"><IconChevronRight /></span>
                  </div>
                </div>

                {/* News Digest Card */}
                <div 
                  onClick={() => setActiveTab('News Digest')}
                  className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md hover:border-pink-500/20 dark:hover:border-pink-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                      <IconNews />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">1</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">News Digest</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-800/60 font-medium">
                    <span>Today's Ready</span>
                    <span className="text-pink-600 dark:text-pink-400 group-hover:translate-x-1 transition-transform"><IconChevronRight /></span>
                  </div>
                </div>

              </div>

              {/* Middle Row Widgets */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6.5">
                
                {/* Column 1: Today's Calendar & Upcoming Events */}
                <div className="flex flex-col gap-6.5">
                  
                  {/* Today's Calendar */}
                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-950 dark:text-white">Today's Calendar</h2>
                        <p className="text-xs text-slate-400 mt-0.5">23 July 2025</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('Calendar')}
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-bold transition-all"
                      >
                        View All
                      </button>
                    </div>

                    <div className="flex flex-col gap-4 relative pl-3.5 before:absolute before:inset-y-1.5 before:left-0.5 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
                      {filteredCalendar.length === 0 ? (
                        <p className="text-center text-xs text-slate-400 py-6">No matching events today</p>
                      ) : (
                        filteredCalendar.map(evt => (
                          <div key={evt.id} className="flex gap-4 relative group">
                            
                            {/* Dot indicator */}
                            <span 
                              className={`absolute -left-[16.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#121324] z-10 transition-transform group-hover:scale-125 ${
                                evt.color === 'purple' ? 'bg-violet-600' :
                                evt.color === 'green' ? 'bg-emerald-500' :
                                evt.color === 'orange' ? 'bg-orange-500' : 'bg-blue-500'
                              }`} 
                            />

                            <div className="w-16.5 shrink-0 text-xs font-semibold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors pt-0.5">
                              {evt.time}
                            </div>
                            
                            <div className="flex-1 flex items-start justify-between gap-2.5">
                              <div>
                                <h4 className="text-sm font-bold leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{evt.title}</h4>
                                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5">{evt.sub}</span>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                evt.color === 'purple' ? 'bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400' :
                                evt.color === 'green' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' :
                                evt.color === 'orange' ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400' : 
                                'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                              }`}>
                                {evt.category}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">Upcoming Events</h2>
                      <button 
                        onClick={() => setActiveTab('Events')}
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-bold transition-all"
                      >
                        View All
                      </button>
                    </div>

                    <div className="flex flex-col gap-3.5">
                      {filteredUpcoming.length === 0 ? (
                        <p className="text-center text-xs text-slate-400 py-6">No matching upcoming events</p>
                      ) : (
                        filteredUpcoming.map(event => (
                          <div key={event.id} className="flex items-center gap-4.5 p-3 rounded-xl border border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 hover:-translate-y-0.5 transition-all duration-200">
                            
                            {/* Date Badge */}
                            <div className={`w-12.5 h-12.5 rounded-xl flex flex-col items-center justify-center text-center font-bold shadow-sm ${
                              event.priority === 'High' ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400' :
                              event.priority === 'Medium' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400' :
                              'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                            }`}>
                              <span className="text-lg leading-none">{event.date}</span>
                              <span className="text-[10px] tracking-wider mt-0.5 leading-none">{event.month}</span>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{event.title}</h4>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  event.priority === 'High' ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600' :
                                  event.priority === 'Medium' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' :
                                  'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                                }`}>
                                  {event.priority}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                                {event.time} • {event.location}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

                {/* Column 2: Academic Tasks & Health Overview */}
                <div className="flex flex-col gap-6.5">
                  
                  {/* Academic Tasks */}
                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">Academic Tasks</h2>
                      <button 
                        onClick={() => setActiveTab('Academics')}
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-bold transition-all"
                      >
                        View All
                      </button>
                    </div>

                    <div className="flex flex-col gap-4">
                      {filteredTasks.length === 0 ? (
                        <p className="text-center text-xs text-slate-400 py-6">No matching tasks</p>
                      ) : (
                        filteredTasks.map(task => (
                          <div key={task.id} className="flex flex-col gap-2 p-3 border border-slate-50 dark:border-slate-800/50 rounded-xl hover:shadow-sm transition-all duration-200">
                            <div className="flex items-start justify-between gap-2.5">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                  task.color === 'violet' ? 'bg-violet-50 dark:bg-violet-950/30 text-violet-600' :
                                  task.color === 'blue' ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600' :
                                  task.color === 'orange' ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600' :
                                  task.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' :
                                  'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                }`}>
                                  <IconAcademics />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold leading-snug">{task.name}</h4>
                                  <span className="text-[11px] text-slate-400 font-medium">{task.details}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Due {task.due}</span>
                                <div className="flex gap-1.5 mt-1 justify-end">
                                  <button 
                                    onClick={() => handleProgressChange(task.id, -10)}
                                    className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center focus:outline-none"
                                    title="Decrease progress by 10%"
                                  >
                                    -
                                  </button>
                                  <button 
                                    onClick={() => handleProgressChange(task.id, 10)}
                                    className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center focus:outline-none"
                                    title="Increase progress by 10%"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Progress bar container */}
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    task.color === 'violet' ? 'bg-gradient-to-r from-violet-500 to-indigo-500' :
                                    task.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                                    task.color === 'orange' ? 'bg-gradient-to-r from-orange-400 to-amber-500' :
                                    task.color === 'emerald' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
                                    'bg-slate-300 dark:bg-slate-700'
                                  }`} 
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 w-8.5 text-right">{task.progress}%</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Health Overview */}
                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">Health Overview</h2>
                      <button 
                        onClick={() => setActiveTab('Health & Fitness')}
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-bold transition-all"
                      >
                        View Details
                      </button>
                    </div>

                    {/* Sub content: Diet/Gym and Line Chart */}
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Left side plan */}
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Today's Plan</span>
                          <h4 className="text-sm font-extrabold text-slate-800 dark:text-white mt-1">Gym: Push Day</h4>
                          <p className="text-xs text-slate-500 mt-0.5 leading-snug">Chest, Shoulders, Triceps</p>
                          
                          <h4 className="text-sm font-extrabold text-slate-800 dark:text-white mt-3.5">Diet: High Protein</h4>
                          <p className="text-xs text-slate-500 mt-0.5">2,100 kcal • 5 Meals</p>
                        </div>
                        <button 
                          onClick={() => setIsHealthPlanOpen(true)}
                          className="mt-5 text-left text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-500 flex items-center gap-1.5 focus:outline-none"
                        >
                          View Full Plan <span className="text-[14px]">→</span>
                        </button>
                      </div>

                      {/* Right side line chart */}
                      <div className="flex flex-col items-center justify-center relative">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 self-start pl-3">Weight Progress (kg)</span>
                        
                        {/* SVG Line Chart */}
                        <div className="w-full h-32 relative">
                          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none">
                            <defs>
                              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            
                            {/* Gridlines */}
                            <line x1="10" y1="15" x2="150" y2="15" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" className="dark:stroke-slate-800/40" />
                            <line x1="10" y1="40" x2="150" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" className="dark:stroke-slate-800/40" />
                            <line x1="10" y1="65" x2="150" y2="65" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" className="dark:stroke-slate-800/40" />
                            <line x1="10" y1="90" x2="150" y2="90" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-800/60" />

                            {/* Chart Area */}
                            <path d="M10,20 Q45,35 80,48 T150,75 L150,90 L10,90 Z" fill="url(#chartGrad)" />

                            {/* Chart Line */}
                            <path d="M10,20 Q45,35 80,48 T150,75" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />

                            {/* Points */}
                            <circle cx="10" cy="20" r="2.5" fill="#6366f1" />
                            <circle cx="45" cy="33" r="2.5" fill="#6366f1" />
                            <circle cx="80" cy="48" r="2.5" fill="#6366f1" />
                            <circle cx="115" cy="58" r="2.5" fill="#6366f1" />
                            
                            {/* Highlight point */}
                            <circle cx="150" cy="75" r="4.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                          </svg>

                          {/* Float badge overlay representing tooltip */}
                          <div className="absolute top-10 right-2 bg-gradient-to-tr from-violet-600 to-indigo-600 text-[10px] font-extrabold text-white px-2 py-0.5 rounded shadow-md pointer-events-none select-none">
                            {weightLogs[weightLogs.length - 1]} kg
                          </div>
                        </div>

                        {/* X Axis Labels */}
                        <div className="w-full flex justify-between text-[8px] font-bold text-slate-400 mt-2 px-1">
                          <span>20 Jun</span>
                          <span>30 Jun</span>
                          <span>10 Jul</span>
                          <span>20 Jul</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom grid elements */}
                    <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-50 dark:border-slate-800/60">
                      
                      {/* Sleep */}
                      <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100/30">
                        <span className="text-violet-500 dark:text-violet-400 mb-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold block">Sleep</span>
                        <span className="text-xs font-extrabold mt-0.5">{sleepHours} hrs</span>
                      </div>

                      {/* Water */}
                      <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100/30">
                        <span className="text-blue-500 dark:text-blue-400 mb-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold block">Water</span>
                        <span className="text-xs font-extrabold mt-0.5">{waterIntake} L</span>
                        <div className="flex gap-1 mt-1">
                          <button onClick={() => adjustWater(-0.25)} className="text-[10px] font-bold px-1 bg-slate-200 dark:bg-slate-700 rounded leading-none">-</button>
                          <button onClick={() => adjustWater(0.25)} className="text-[10px] font-bold px-1 bg-slate-200 dark:bg-slate-700 rounded leading-none">+</button>
                        </div>
                      </div>

                      {/* Energy */}
                      <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100/30">
                        <span className="text-orange-500 dark:text-orange-400 mb-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold block">Energy</span>
                        <span className="text-xs font-extrabold mt-0.5">High</span>
                      </div>

                      {/* Steps */}
                      <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100/30">
                        <span className="text-emerald-500 dark:text-emerald-400 mb-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22v-4h18v4zm15-9.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-5 1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-5-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"/></svg>
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold block">Steps</span>
                        <span className="text-xs font-extrabold mt-0.5">{dailySteps.toLocaleString()}</span>
                        <div className="flex gap-1 mt-1">
                          <button onClick={() => adjustSteps(-1000)} className="text-[9px] font-bold px-1 bg-slate-200 dark:bg-slate-700 rounded leading-none">-1k</button>
                          <button onClick={() => adjustSteps(1000)} className="text-[9px] font-bold px-1 bg-slate-200 dark:bg-slate-700 rounded leading-none">+1k</button>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Column 3: AI News Digest & Weekly Review */}
                <div className="flex flex-col gap-6.5">
                  
                  {/* Today's AI News Digest */}
                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-lg font-bold text-slate-950 dark:text-white">Today's AI News</h2>
                        <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                      </div>
                    </div>

                    {/* AI Sparkle banner */}
                    <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/5 dark:from-violet-500/5 dark:to-indigo-500/2 border border-violet-500/10 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="text-violet-600 dark:text-violet-400 animate-pulse mt-0.5">
                        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      </span>
                      <p className="text-xs leading-normal text-violet-950 dark:text-violet-300 font-semibold">
                        Here's your AI summary of the top news for 23 July 2025
                      </p>
                    </div>

                    {/* News Bullet List */}
                    <ul className="flex flex-col gap-3 pl-1">
                      <li className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0 mt-2" />
                        <span>RBI keeps repo rate unchanged; signals focus on inflation control.</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0 mt-2" />
                        <span>Global markets rally as tech stocks lead the gain.</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0 mt-2" />
                        <span>Monsoon intensifies across North India; heavy rainfall alerts issued.</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0 mt-2" />
                        <span>ISRO successfully tests next-gen satellite communication module.</span>
                      </li>
                    </ul>

                    <button 
                      onClick={() => setIsNewsDigestOpen(true)}
                      className="mt-2 text-center text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-500 py-3.5 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 hover:bg-slate-50 dark:hover:bg-slate-800/30 flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
                    >
                      Read Full Digest <span className="text-[13px]">→</span>
                    </button>
                  </div>

                  {/* Weekly AI Review */}
                  <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">Weekly AI Review</h2>
                      <button 
                        onClick={() => setActiveTab('Weekly Review')}
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-bold transition-all"
                      >
                        View All
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/5 dark:to-teal-500/2 border border-emerald-500/10 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      </span>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Your progress this week</span>
                        <p className="text-xs leading-normal text-emerald-950 dark:text-emerald-300 font-semibold mt-1">
                          Great consistency! You completed 80% of your planned tasks and maintained good health habits.
                        </p>
                      </div>
                    </div>

                    {/* Stats Grid 3 cols */}
                    <div className="grid grid-cols-3 gap-2">
                      
                      {/* Stat 1 */}
                      <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100/30">
                        <span className="text-emerald-500 dark:text-emerald-400 mb-1">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold block leading-none">Tasks Completed</span>
                        <span className="text-sm font-extrabold mt-1">12/15</span>
                      </div>

                      {/* Stat 2 */}
                      <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100/30">
                        <span className="text-indigo-500 dark:text-indigo-400 mb-1">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="16" x2="18" y2="16"/></svg>
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold block leading-none">Workouts</span>
                        <span className="text-sm font-extrabold mt-1">4/5</span>
                      </div>

                      {/* Stat 3 */}
                      <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100/30">
                        <span className="text-violet-500 dark:text-violet-400 mb-1">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold block leading-none">Avg. Sleep</span>
                        <span className="text-sm font-extrabold mt-1">7.1 hrs</span>
                      </div>

                    </div>

                    <button 
                      onClick={() => setActiveTab('Weekly Review')}
                      className="text-center text-xs font-bold text-slate-700 dark:text-slate-200 py-3.5 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors focus:outline-none"
                    >
                      View Detailed Review
                    </button>
                  </div>

                </div>

              </div>

              {/* Bottom Row Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Left Card: Stay Consistent */}
                <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Stay consistent</h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">You've logged in 7 days in a row!</p>
                    </div>
                  </div>
                </div>

                {/* Right Card: Quote Banner (Wide 3-cols equivalent) */}
                <div className="md:col-span-3 bg-gradient-to-r from-violet-950 via-indigo-950 to-blue-900 border border-slate-900 rounded-2xl p-6.5 text-white flex items-center relative overflow-hidden shadow-xl shadow-slate-100/30 dark:shadow-none min-h-[110px]">
                  
                  {/* Content */}
                  <div className="flex items-center gap-5.5 relative z-10 max-w-[70%]">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                      <span className="text-amber-400">
                        <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      </span>
                    </div>
                    <div>
                      <blockquote className="text-sm font-semibold tracking-wide leading-relaxed italic text-slate-100">
                        "Discipline is choosing between what you want now and what you want most."
                      </blockquote>
                      <cite className="text-xs font-bold text-indigo-300 block mt-1.5 not-italic">— Abraham Lincoln</cite>
                    </div>
                  </div>

                  {/* Mountain Graphic Overlay */}
                  <div className="absolute right-0 bottom-0 h-full w-1/3 md:w-1/2 opacity-35 md:opacity-100 pointer-events-none z-0">
                    <svg className="h-full w-full object-cover float-right" viewBox="0 0 300 120" preserveAspectRatio="none" fill="none">
                      {/* Moon/Glow */}
                      <circle cx="240" cy="30" r="15" fill="#fef08a" opacity="0.15" />
                      <circle cx="240" cy="30" r="25" fill="#fef08a" opacity="0.05" />
                      
                      {/* Back Mountains */}
                      <path d="M100,120 L150,40 L210,120 Z" fill="#312e81" opacity="0.4" />
                      <path d="M160,120 L220,50 L280,120 Z" fill="#1e1b4b" opacity="0.6" />
                      
                      {/* Front Mountains */}
                      <path d="M60,120 L120,65 L180,120 Z" fill="#1e3a8a" opacity="0.3" />
                      <path d="M200,120 L250,75 L300,120 Z" fill="#2e1065" opacity="0.8" />
                    </svg>
                  </div>
                  
                </div>

              </div>
            </>
          )}

          {/* PLANS SUB-PANEL */}
          {activeTab === 'Plans' && (
            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Plans & Boards</h1>
                  <p className="text-sm text-slate-400 mt-1">Manage your active plans, checklist targets, and milestones.</p>
                </div>
                <button 
                  onClick={() => { setQuickAddType('plan'); setIsQuickAddOpen(true); }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
                >
                  + Add New Plan
                </button>
              </div>

              {/* Plans Board list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {weeklyPlans.map(plan => (
                  <div 
                    key={plan.id}
                    onClick={() => {
                      setWeeklyPlans(prev => prev.map(p => p.id === plan.id ? { ...p, completed: !p.completed } : p));
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer group transition-all ${
                      plan.completed 
                        ? 'bg-emerald-500/5 border-emerald-500/20 dark:border-emerald-500/10 text-slate-400 dark:text-slate-500' 
                        : 'bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-800/20 dark:hover:bg-slate-800/40 border-slate-100 dark:border-slate-800/80 text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        plan.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                      }`}>
                        {plan.completed && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span className={`text-sm font-semibold ${plan.completed ? 'line-through' : ''}`}>{plan.title}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {plan.completed ? "Undo" : "Complete"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS SUB-PANEL */}
          {activeTab === 'Events' && (
            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Upcoming Events Portal</h1>
                  <p className="text-sm text-slate-400 mt-1">Full tracker of online, offline, and hybrid appointments.</p>
                </div>
                <button 
                  onClick={() => { setQuickAddType('event'); setIsQuickAddOpen(true); }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
                >
                  + Add Event
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-600 flex flex-col items-center justify-center font-bold text-center">
                        <span className="text-base leading-none">{event.date}</span>
                        <span className="text-[9px] uppercase mt-0.5">{event.month}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{event.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{event.time} • {event.location}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                      event.priority === 'High' ? 'bg-violet-100 text-violet-700' :
                      event.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>{event.priority} Priority</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACADEMICS SUB-PANEL */}
          {activeTab === 'Academics' && (
            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Academic Tasks Dashboard</h1>
                  <p className="text-sm text-slate-400 mt-1">Track assignments, exam preparations, projects, and schedules.</p>
                </div>
                <button 
                  onClick={() => { setQuickAddType('task'); setIsQuickAddOpen(true); }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
                >
                  + Add Homework/Project
                </button>
              </div>

              <div className="flex flex-col gap-5 mt-4">
                {academicTasks.map(task => (
                  <div key={task.id} className="p-5 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 rounded-xl flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-base">{task.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{task.details} • Due {task.due}</p>
                      </div>
                      <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 px-3 py-1 rounded-full">{task.progress}% Done</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Progress Slider */}
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={task.progress} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setAcademicTasks(prev => prev.map(t => t.id === task.id ? { ...t, progress: val } : t));
                        }}
                        className="flex-1 accent-indigo-600 bg-slate-200 dark:bg-slate-700 h-2 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HEALTH SUB-PANEL */}
          {activeTab === 'Health & Fitness' && (
            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Health & Fitness portal</h1>
                  <p className="text-sm text-slate-400 mt-1">Track physical progress, calorie deficits, logging weight and hydration.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                
                {/* Weight Logger */}
                <div className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 flex flex-col gap-4">
                  <h3 className="font-bold text-base">Weight tracker</h3>
                  <p className="text-xs text-slate-400">Log your morning weight measurements to update graphs.</p>
                  
                  <form onSubmit={addWeightLog} className="flex gap-2">
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="62.4"
                      value={weightInput}
                      onChange={(e) => setWeightInput(e.target.value)}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm rounded-lg flex-1 focus:outline-none"
                    />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all">
                      Log Weight
                    </button>
                  </form>

                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Logs (kg)</span>
                    <div className="flex gap-2">
                      {weightLogs.map((w, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200">
                          {w}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hydration / Steps Adjuster */}
                <div className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base">Daily Hydration Goal</h3>
                    <p className="text-xs text-slate-400">Target intake is 3.0 Liters. Current: {waterIntake} L</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => adjustWater(0.25)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-500">+ 250ml</button>
                      <button onClick={() => adjustWater(0.5)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-500">+ 500ml</button>
                      <button onClick={() => setWaterIntake(0)} className="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold">Reset</button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base">Steps Adjuster</h3>
                    <p className="text-xs text-slate-400">Log physical exercise footsteps directly. Current: {dailySteps.toLocaleString()}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => adjustSteps(1000)} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500">+ 1,000</button>
                      <button onClick={() => adjustSteps(5000)} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500">+ 5,000</button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base">Sleep Hours Adjuster</h3>
                    <p className="text-xs text-slate-400">Log nightly sleeping hours directly. Current: {sleepHours} hrs</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setSleepHours(prev => Math.max(0, parseFloat((prev + 0.5).toFixed(1))))} className="bg-violet-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-violet-500">+ 30 mins</button>
                      <button onClick={() => setSleepHours(prev => Math.max(0, parseFloat((prev - 0.5).toFixed(1))))} className="bg-violet-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-violet-500">- 30 mins</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* NEWS DIGEST SUB-PANEL */}
          {activeTab === 'News Digest' && (
            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold">AI News Summary Reader</h1>
              <p className="text-sm text-slate-400 mt-1">Morning newsletter curated specifically for you.</p>

              <div className="flex flex-col gap-4 mt-4">
                <div className="p-5 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 rounded-xl">
                  <h3 className="font-bold text-base text-violet-600 dark:text-violet-400">1. RBI Monetary Policy Review</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Financial Stability & Inflation</p>
                  <p className="text-sm leading-relaxed mt-2.5">
                    The Reserve Bank of India has maintained repo rates at current margins. High frequency economic indicators point to steady domestic expansions, while inflation targets are monitored carefully. The policy prioritizes structural credit growth in infrastructure while securing bank liquidity cushions.
                  </p>
                </div>
                <div className="p-5 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 rounded-xl">
                  <h3 className="font-bold text-base text-violet-600 dark:text-violet-400">2. Tech Stocks Lead Global Rallies</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">NASDAQ & Global Equity Markets</p>
                  <p className="text-sm leading-relaxed mt-2.5">
                    Corporate earnings beats by large-cap cloud software and computer hardware design leaders triggered stock index upgrades across NASDAQ. Investors remain optimistic about commercialized artificial intelligence software deployments, resulting in capital inflows to emerging digital architectures.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CALENDAR SUB-PANEL */}
          {activeTab === 'Calendar' && (
            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold">Calendar Agenda</h1>
              <p className="text-sm text-slate-400 mt-1">Full schedule view of items, events and reviews.</p>

              <div className="flex flex-col gap-3 mt-4">
                {todayCalendar.map(evt => (
                  <div key={evt.id} className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm">{evt.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{evt.time} • {evt.sub}</p>
                    </div>
                    <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">{evt.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WEEKLY REVIEW SUB-PANEL */}
          {activeTab === 'Weekly Review' && (
            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold">Weekly Performance Review</h1>
              <p className="text-sm text-slate-400 mt-1">AI-backed overview of study habits, workout compliance and sleeping schedules.</p>

              <div className="p-5 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-950 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-850 rounded-xl mt-4 leading-relaxed">
                <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">AI Summary Analysis</h3>
                "Great work Disha! Your study compliance for academics is up by 15% due to consistent Study Sessions. Your average sleep hours have stabilized at 7.1 hours. However, your water intake is slightly behind target. Try setting reminders next week!"
              </div>
            </div>
          )}

          {/* SETTINGS SUB-PANEL */}
          {activeTab === 'Settings' && (
            <div className="flex flex-col gap-6 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-sm text-slate-400 mt-1">Manage themes, profiles, goals and preferences.</p>

              <div className="flex flex-col gap-4.5 mt-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-sm">Theme Settings</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Toggle between light and dark themes</p>
                  </div>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-all"
                  >
                    Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
                  </button>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-sm">User Details</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Rename user accounts or profile indicators</p>
                  </div>
                  <button 
                    onClick={() => setIsProfileOpen(true)}
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

      {/* ================================================================ */}
      {/* ======================= MODAL SYSTEM =========================== */}
      {/* ================================================================ */}

      {/* 1. QUICK ADD MODAL */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full max-w-md shadow-2xl p-6.5 flex flex-col gap-4 animate-scale-up">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white">Quick Add to Dashboard</h3>
              <button 
                onClick={() => setIsQuickAddOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold text-base focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Type selector */}
            <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
              <button 
                onClick={() => setQuickAddType('event')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${quickAddType === 'event' ? 'bg-white dark:bg-slate-950 text-violet-600 shadow-sm' : 'text-slate-500'}`}
              >
                Event
              </button>
              <button 
                onClick={() => setQuickAddType('plan')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${quickAddType === 'plan' ? 'bg-white dark:bg-slate-950 text-violet-600 shadow-sm' : 'text-slate-500'}`}
              >
                Plan Target
              </button>
              <button 
                onClick={() => setQuickAddType('task')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${quickAddType === 'task' ? 'bg-white dark:bg-slate-950 text-violet-600 shadow-sm' : 'text-slate-500'}`}
              >
                Academic Task
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleQuickAdd} className="flex flex-col gap-4.5">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Title</label>
                <input 
                  type="text" 
                  placeholder={quickAddType === 'event' ? "e.g. Doctor Appointment" : (quickAddType === 'plan' ? "e.g. Read novel chapters" : "e.g. Math homework")}
                  value={quickAddTitle}
                  onChange={(e) => setQuickAddTitle(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  required
                />
              </div>

              {quickAddType !== 'plan' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Details / Location</label>
                  <input 
                    type="text" 
                    placeholder={quickAddType === 'event' ? "e.g. 10:00 AM • Zoom Link" : "e.g. Database Systems"}
                    value={quickAddDetail}
                    onChange={(e) => setQuickAddDetail(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              )}

              {quickAddType === 'event' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority Label</label>
                  <select 
                    value={quickAddPriority} 
                    onChange={(e) => setQuickAddPriority(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              )}

              {quickAddType !== 'plan' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</label>
                  <input 
                    type="date" 
                    value={quickAddDate}
                    onChange={(e) => setQuickAddDate(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  />
                </div>
              )}

              {quickAddType === 'task' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Initial Progress ({quickAddProgress}%)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={quickAddProgress}
                    onChange={(e) => setQuickAddProgress(e.target.value)}
                    className="w-full accent-violet-600 bg-slate-200 dark:bg-slate-700 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs py-3 rounded-lg hover:opacity-95 shadow-md shadow-violet-500/10 mt-2 transition-all"
              >
                Add Item
              </button>

            </form>
          </div>
        </div>
      )}

      {/* 2. HEALTH PLAN DETAILS OVERLAY */}
      {isHealthPlanOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full max-w-lg shadow-2xl p-6.5 flex flex-col gap-4 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white">Fitness & Diet Plan Details</h3>
              <button 
                onClick={() => setIsHealthPlanOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold text-base focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4.5 mt-2">
              <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-850">
                <h4 className="font-bold text-sm text-violet-750 dark:text-violet-300">🏋️ Gym Workout: Push Day Details</h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-1.5 mt-2 list-disc pl-4.5 font-medium leading-relaxed">
                  <li>Incline Barbell Bench Press — 4 sets x 8 reps</li>
                  <li>Dumbbell Shoulder Press — 3 sets x 10 reps</li>
                  <li>Incline Dumbbell Flyes — 3 sets x 12 reps</li>
                  <li>Cable Lateral Raises — 4 sets x 15 reps</li>
                  <li>Tricep Rope Overhead Extensions — 4 sets x 12 reps</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-850">
                <h4 className="font-bold text-sm text-emerald-750 dark:text-emerald-300">🥑 Diet Protocol: High Protein (2,100 kcal)</h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-1.5 mt-2 list-disc pl-4.5 font-medium leading-relaxed">
                  <li>Meal 1 (Breakfast): Oatmeal, egg whites, whey protein isolate (45g protein)</li>
                  <li>Meal 2 (Mid-morning): Double scoop Greek yogurt with berries (30g protein)</li>
                  <li>Meal 3 (Lunch): Grilled chicken breast, wild rice, baked broccoli (55g protein)</li>
                  <li>Meal 4 (Pre-workout): Rice cakes with peanut butter, banana</li>
                  <li>Meal 5 (Dinner): Baked salmon, quinoa, asparagus salad (40g protein)</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setIsHealthPlanOpen(false)}
              className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs py-3 rounded-lg mt-2 hover:opacity-90 transition-all focus:outline-none"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* 3. NEWS DIGEST MODAL */}
      {isNewsDigestOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full max-w-xl shadow-2xl p-6.5 flex flex-col gap-4 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white">Today's Complete AI News Digest</h3>
              <button 
                onClick={() => setIsNewsDigestOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold text-base focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2.5 mt-2">
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/60 rounded-xl">
                <h4 className="font-bold text-sm text-violet-600">1. RBI Monetary Policy Review</h4>
                <p className="text-xs text-slate-500 mt-1">Financial Stability & Inflation</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mt-2.5">
                  The Monetary Policy Committee of the Reserve Bank of India decided to hold interest rates steady at 6.5%. The governor pointed to stable core inflation indices while warning that volatile agricultural food pricing may warrant persistent vigilance. Economic metrics show that rural demand is rebounding, supporting overall industrial growth projections.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/60 rounded-xl">
                <h4 className="font-bold text-sm text-violet-600">2. Tech Stocks Lead Global Rallies</h4>
                <p className="text-xs text-slate-500 mt-1">Equity Markets Expansion</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mt-2.5">
                  Tech shares on Wall Street climbed as solid earnings reports and optimistic projections from leading chip designers boosted market confidence. NASDAQ gained 1.4% during early morning operations. Analysts forecast that enterprise capital expenditure in private cloud compute and graphics hardware accelerator clusters will continue growing through Q4.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/60 rounded-xl">
                <h4 className="font-bold text-sm text-violet-600">3. Monsoon Intensifies in North India</h4>
                <p className="text-xs text-slate-500 mt-1">Weather warnings and alerts</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mt-2.5">
                  Heavy rain alerts have been issued for parts of Himachal Pradesh, Uttarakhand, and Punjab. Continuous rainfall triggered rising water levels in reservoirs, leading local administrations to deploy disaster response groups. Travelers are advised to avoid mountain corridors until conditions stabilize.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/60 rounded-xl">
                <h4 className="font-bold text-sm text-violet-600">4. ISRO Tests Next-Gen Satellite Module</h4>
                <p className="text-xs text-slate-500 mt-1">Aerospace Research & Deployments</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mt-2.5">
                  The Indian Space Research Organisation announced a successful static firing test of its high-throughput telecommunication system module. The telemetry results prove that thermal dispersion coatings operate correctly in extreme vacuum conditions, paving the way for full integration on upcoming satellites.
                </p>
              </div>

            </div>

            <button 
              onClick={() => setIsNewsDigestOpen(false)}
              className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs py-3 rounded-lg mt-2 hover:opacity-90 transition-all focus:outline-none"
            >
              Close Newsletter
            </button>
          </div>
        </div>
      )}

      {/* 4. PROFILE POPUP MODAL */}
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
              <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">Disha</h3>
              <p className="text-xs text-slate-400 mt-0.5">disha@lifeos.io • Premium Account</p>
            </div>

            <div className="w-full bg-slate-50 dark:bg-slate-850 p-4 rounded-xl flex flex-col gap-2.5 text-left border border-slate-100 dark:border-slate-800/60">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold uppercase">Workouts Finished</span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-white">4 Sessions</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold uppercase">Tasks Resolved</span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-white">12 Tasks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold uppercase">Hydration Level</span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-white">{waterIntake} L logged</span>
              </div>
            </div>

            <button 
              onClick={() => setIsProfileOpen(false)}
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
