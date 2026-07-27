import React, { useState } from 'react';

const Events = ({ upcomingEvents, setUpcomingEvents, todayCalendar, setTodayCalendar }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState('work'); // meeting, govt, bank, work
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('medium'); // low, medium, high
  const [status, setStatus] = useState('upcoming'); // upcoming, done, missed
  const [documentsNeeded, setDocumentsNeeded] = useState([]);
  const [newDoc, setNewDoc] = useState('');
  const [notes, setNotes] = useState('');
  const [reminder, setReminder] = useState(false);

  // Filter states
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, calendar

  const handleAddDoc = () => {
    if (newDoc.trim() && !documentsNeeded.includes(newDoc.trim())) {
      setDocumentsNeeded([...documentsNeeded, newDoc.trim()]);
      setNewDoc('');
    }
  };

  const handleRemoveDoc = (docToRemove) => {
    setDocumentsNeeded(documentsNeeded.filter(d => d !== docToRemove));
  };

  const resetForm = () => {
    setTitle('');
    setType('work');
    setDate('');
    setLocation('');
    setPriority('medium');
    setStatus('upcoming');
    setDocumentsNeeded([]);
    setNewDoc('');
    setNotes('');
    setReminder(false);
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const eventDate = date || new Date().toISOString().split('T')[0];
    const dateObj = new Date(eventDate);
    const day = dateObj.getDate().toString();
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    
    const newEvent = {
      id: Date.now(),
      title,
      type,
      date: eventDate,
      day,
      month,
      location,
      priority,
      status,
      documentsNeeded,
      notes,
      reminder,
      color: priority === 'high' ? 'purple' : (priority === 'medium' ? 'orange' : 'green')
    };

    setUpcomingEvents([...upcomingEvents, newEvent]);

    // Also sync to Today's Calendar if it's today
    const todayStr = new Date().toISOString().split('T')[0];
    if (eventDate === todayStr) {
      const newCalItem = {
        id: newEvent.id,
        time: "09:00 AM", // default morning
        title: newEvent.title,
        category: newEvent.priority === 'high' ? 'High' : 'Academic',
        sub: newEvent.location || "Office Meeting",
        color: newEvent.color
      };
      setTodayCalendar([...todayCalendar, newCalItem]);
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setType(event.type || 'work');
    setDate(event.date || '');
    setLocation(event.location || '');
    setPriority(event.priority || 'medium');
    setStatus(event.status || 'upcoming');
    setDocumentsNeeded(event.documentsNeeded || []);
    setNotes(event.notes || '');
    setReminder(event.reminder || false);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const updatedEvents = upcomingEvents.map(evt => {
      if (evt.id === selectedEvent.id) {
        const dateObj = new Date(date);
        const day = dateObj.getDate().toString();
        const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
        return {
          ...evt,
          title,
          type,
          date,
          day,
          month,
          location,
          priority,
          status,
          documentsNeeded,
          notes,
          reminder,
          color: priority === 'high' ? 'purple' : (priority === 'medium' ? 'orange' : 'green')
        };
      }
      return evt;
    });

    setUpcomingEvents(updatedEvents);
    setIsEditModalOpen(false);
    resetForm();
    setSelectedEvent(null);
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setUpcomingEvents(upcomingEvents.filter(e => e.id !== eventId));
      setTodayCalendar(todayCalendar.filter(c => c.id !== eventId));
    }
  };

  const toggleStatus = (eventId, nextStatus) => {
    setUpcomingEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: nextStatus } : e));
  };

  // Filters logic
  const filteredEvents = upcomingEvents.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.notes || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || e.type === filterType;
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || e.priority === filterPriority;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const countPendingDocs = filteredEvents.reduce((acc, e) => acc + (e.documentsNeeded?.length || 0), 0);

  // Simplified calendar grid render (July 2026 example)
  const renderCalendar = () => {
    const daysInMonth = 31;
    const calendarGrid = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `2026-07-${day.toString().padStart(2, '0')}`;
      const dayEvents = upcomingEvents.filter(e => e.date === dateString);
      
      calendarGrid.push(
        <div key={day} className="min-h-[100px] border border-slate-100 dark:border-slate-800 p-2 bg-white dark:bg-slate-900 flex flex-col gap-1.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-850">
          <span className="font-semibold text-xs text-slate-400">{day}</span>
          <div className="flex-1 overflow-y-auto flex flex-col gap-1">
            {dayEvents.map(evt => (
              <div 
                key={evt.id}
                onClick={() => handleEditClick(evt)}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded truncate cursor-pointer ${
                  evt.status === 'done' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 line-through' :
                  evt.status === 'missed' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400' :
                  'bg-violet-100 text-violet-800 dark:bg-violet-950/40 dark:text-violet-400'
                }`}
              >
                {evt.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-1 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">{calendarGrid}</div>;
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Official Events</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Track appointments, meetings, government audits, bank visits, and required documentation.</p>
        </div>
        <div className="flex gap-2">
          {/* View toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-violet-600 shadow-sm' : 'text-slate-500'}`}
            >
              List Grid
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white dark:bg-slate-900 text-violet-600 shadow-sm' : 'text-slate-500'}`}
            >
              Calendar View
            </button>
          </div>
          <button 
            onClick={() => { resetForm(); setIsAddModalOpen(true); }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md shadow-indigo-600/10 transition-all hover:scale-102"
          >
            + Create Event
          </button>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left filters */}
        <div className="lg:col-span-1 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Filter Events</h3>
            <p className="text-xs text-slate-400 mt-0.5">Narrow down official entries</p>
          </div>

          <div className="flex flex-col gap-4">
            
            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search</label>
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Type filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Type</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="meeting">Meeting</option>
                <option value="govt">Government</option>
                <option value="bank">Banking</option>
                <option value="work">Work Task</option>
              </select>
            </div>

            {/* Status filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="done">Completed</option>
                <option value="missed">Missed</option>
              </select>
            </div>

            {/* Priority filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</label>
              <select 
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

          </div>

          {/* Alert / Document box */}
          <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 flex flex-col gap-1 mt-2">
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Documents Required</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{countPendingDocs} items</span>
            <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Need preparation beforehand</span>
          </div>

        </div>

        {/* Right cards list or Calendar */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {viewMode === 'calendar' ? (
            renderCalendar()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredEvents.length === 0 ? (
                <div className="col-span-2 text-center py-20 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl">
                  <p className="text-slate-400 text-sm font-semibold">No events match the filter criteria</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setFilterStatus('all'); setFilterType('all'); setFilterPriority('all'); }} 
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-xs mt-2"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredEvents.map(event => (
                  <div 
                    key={event.id}
                    className={`bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4 group transition-all hover:shadow-md ${
                      event.status === 'done' ? 'opacity-85' : ''
                    }`}
                  >
                    
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      
                      {/* Date Badge */}
                      <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center font-bold shadow-sm shrink-0 ${
                        event.priority === 'high' ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600' :
                        event.priority === 'medium' ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600' :
                        'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                      }`}>
                        <span className="text-lg leading-none">{event.day || "27"}</span>
                        <span className="text-[9px] mt-0.5 leading-none">{event.month || "JUL"}</span>
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold text-slate-900 dark:text-white truncate ${event.status === 'done' ? 'line-through text-slate-400' : ''}`}>
                            {event.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                          ⏰ {event.time || "09:00 AM"} {event.location ? `• 📍 ${event.location}` : ''}
                        </p>
                      </div>

                    </div>

                    {/* Notes & Description */}
                    {event.notes && (
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg">
                        {event.notes}
                      </p>
                    )}

                    {/* Required Documents checklist */}
                    {event.documentsNeeded && event.documentsNeeded.length > 0 && (
                      <div className="flex flex-col gap-1.5 bg-slate-50/50 dark:bg-slate-900/30 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/60">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Documents Check</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {event.documentsNeeded.map((doc, idx) => (
                            <span 
                              key={idx} 
                              className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700/50 flex items-center gap-1 cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20"
                            >
                              📁 {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action controls footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/60 mt-1">
                      
                      {/* Quick status change select */}
                      <select 
                        value={event.status}
                        onChange={(e) => toggleStatus(event.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded border focus:outline-none ${
                          event.status === 'done' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                          event.status === 'missed' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                          'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="done">Completed</option>
                        <option value="missed">Missed</option>
                      </select>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditClick(event)}
                          className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(event.id)}
                          className="text-xs text-rose-600 font-bold hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>

      {/* ======================================================== */}
      {/* ================= MODALS SYSTEM ======================== */}
      {/* ======================================================== */}

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full max-w-md shadow-2xl p-6.5 flex flex-col gap-4 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white">Create Official Event</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-semibold text-base focus:outline-none">✕</button>
            </div>

            <form onSubmit={handleSubmitAdd} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Income Tax Office Audit"
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Type</label>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="work">Work Meeting</option>
                    <option value="govt">Government Office</option>
                    <option value="bank">Banking Outing</option>
                    <option value="meeting">General Meeting</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Connaught Place"
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notes / Errands details</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes, steps needed..."
                  rows="2"
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                />
              </div>

              {/* Documents Checklist Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Documents Required</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newDoc} 
                    onChange={(e) => setNewDoc(e.target.value)}
                    placeholder="e.g. Aadhaar card"
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2 rounded-lg text-sm flex-1 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddDoc}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                {documentsNeeded.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800/80">
                    {documentsNeeded.map((doc, idx) => (
                      <span key={idx} className="bg-slate-200 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1.5">
                        {doc}
                        <button type="button" onClick={() => handleRemoveDoc(doc)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 py-1">
                <input 
                  type="checkbox" 
                  checked={reminder} 
                  onChange={(e) => setReminder(e.target.checked)}
                  id="add-evt-reminder"
                  className="w-4 h-4 accent-indigo-600"
                />
                <label htmlFor="add-evt-reminder" className="text-xs font-bold text-slate-500 cursor-pointer">Enable email/system reminder alerts</label>
              </div>

              <button 
                type="submit" 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs py-3.5 rounded-lg hover:opacity-95 shadow-md shadow-violet-500/10 mt-2 transition-all"
              >
                Create Event
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full max-w-md shadow-2xl p-6.5 flex flex-col gap-4 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white">Edit Event Details</h3>
              <button onClick={() => { setIsEditModalOpen(false); setSelectedEvent(null); }} className="text-slate-400 hover:text-slate-600 font-semibold text-base focus:outline-none">✕</button>
            </div>

            <form onSubmit={handleSubmitEdit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Type</label>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="work">Work Meeting</option>
                    <option value="govt">Government Office</option>
                    <option value="bank">Banking Outing</option>
                    <option value="meeting">General Meeting</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notes / Errands details</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  rows="2"
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                />
              </div>

              {/* Documents Checklist Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Documents Required</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newDoc} 
                    onChange={(e) => setNewDoc(e.target.value)}
                    placeholder="Aadhaar card"
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2 rounded-lg text-sm flex-1 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddDoc}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                {documentsNeeded.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800/80">
                    {documentsNeeded.map((doc, idx) => (
                      <span key={idx} className="bg-slate-200 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1.5">
                        {doc}
                        <button type="button" onClick={() => handleRemoveDoc(doc)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 py-1">
                <input 
                  type="checkbox" 
                  checked={reminder} 
                  onChange={(e) => setReminder(e.target.checked)}
                  id="edit-evt-reminder"
                  className="w-4 h-4 accent-indigo-600"
                />
                <label htmlFor="edit-evt-reminder" className="text-xs font-bold text-slate-500 cursor-pointer">Enable email/system reminder alerts</label>
              </div>

              <button 
                type="submit" 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs py-3.5 rounded-lg hover:opacity-95 shadow-md shadow-violet-500/10 mt-2 transition-all"
              >
                Save Changes
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
