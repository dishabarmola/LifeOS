import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import {
  CalendarDays,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  MessageSquareQuote,
  Newspaper,
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Events from './components/Events';
import Plans from './components/Plans';
import Academics from './components/Academics';
import Health from './components/Health';
import News from './components/News';
import Review from './components/Review';
import './App.css';

const navigation = [
  { name: 'Dashboard', path: '/', icon: LayoutGrid },
  { name: 'Events', path: '/events', icon: CalendarDays },
  { name: 'Plans', path: '/plans', icon: ClipboardList },
  { name: 'Academics', path: '/academics', icon: GraduationCap },
  { name: 'Health', path: '/health', icon: HeartPulse },
  { name: 'News', path: '/news', icon: Newspaper },
  { name: 'Review', path: '/review', icon: MessageSquareQuote },
];

function App() {
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'Client Meeting',
      type: 'work',
      date: '2026-07-24',
      day: '24',
      month: 'JUL',
      location: 'Zoom',
      priority: 'high',
      status: 'upcoming',
      documentsNeeded: ['ID Card'],
      notes: 'Discuss the launch timeline',
      reminder: true,
      color: 'purple',
    },
  ]);

  const [todayCalendar, setTodayCalendar] = useState([
    {
      id: 1,
      time: '10:00 AM',
      title: 'Client Meeting',
      category: 'High',
      sub: 'Zoom',
      color: 'purple',
    },
  ]);

  const [weeklyPlans, setWeeklyPlans] = useState([
    { id: 1, title: 'Movie Night', completed: false, status: 'planned' },
    { id: 2, title: 'Organize Wardrobe', completed: true, status: 'done' },
  ]);

  return (
    <Router>
      <div className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
          <aside className="w-full border-b border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:w-72 lg:border-b-0 lg:border-r">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">LifeOS</p>
              <h2 className="mt-2 text-2xl font-bold">Your everyday hub</h2>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    exact={item.path === '/'}
                    activeClassName="bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 bg-white dark:bg-slate-900">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route
                path="/events"
                render={() => (
                  <Events
                    upcomingEvents={upcomingEvents}
                    setUpcomingEvents={setUpcomingEvents}
                    todayCalendar={todayCalendar}
                    setTodayCalendar={setTodayCalendar}
                  />
                )}
              />
              <Route
                path="/plans"
                render={() => <Plans weeklyPlans={weeklyPlans} setWeeklyPlans={setWeeklyPlans} />}
              />
              <Route path="/academics" component={Academics} />
              <Route path="/health" component={Health} />
              <Route path="/news" component={News} />
              <Route path="/review" component={Review} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
