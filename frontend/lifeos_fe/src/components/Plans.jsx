import React, { useState } from 'react';

const Plans = ({ weeklyPlans, setWeeklyPlans }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('planned');
  const [budgetEstimate, setBudgetEstimate] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  // Filter states
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, calendar

  // All unique tags across all plans
  const allTags = Array.from(
    new Set(weeklyPlans.flatMap(p => p.tags || []))
  );

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setStatus('planned');
    setBudgetEstimate('');
    setTags([]);
    setNewTag('');
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const newPlan = {
      id: Date.now(),
      title,
      description,
      date: date || new Date().toISOString().split('T')[0],
      location,
      status,
      tags,
      budgetEstimate: budgetEstimate ? parseFloat(budgetEstimate) : 0,
      completed: status === 'done'
    };
    setWeeklyPlans([...weeklyPlans, newPlan]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditClick = (plan) => {
    setSelectedPlan(plan);
    setTitle(plan.title);
    setDescription(plan.description || '');
    setDate(plan.date || '');
    setLocation(plan.location || '');
    setStatus(plan.status || 'planned');
    setBudgetEstimate(plan.budgetEstimate?.toString() || '');
    setTags(plan.tags || []);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setWeeklyPlans(prev => prev.map(p => p.id === selectedPlan.id ? {
      ...p,
      title,
      description,
      date,
      location,
      status,
      tags,
      budgetEstimate: budgetEstimate ? parseFloat(budgetEstimate) : 0,
      completed: status === 'done'
    } : p));
    setIsEditModalOpen(false);
    resetForm();
    setSelectedPlan(null);
  };

  const handleDelete = (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setWeeklyPlans(weeklyPlans.filter(p => p.id !== planId));
    }
  };

  const toggleComplete = (planId) => {
    setWeeklyPlans(prev => prev.map(p => {
      if (p.id === planId) {
        const nextCompleted = !p.completed;
        return {
          ...p,
          completed: nextCompleted,
          status: nextCompleted ? 'done' : 'planned'
        };
      }
      return p;
    }));
  };

  // Filter logic
  const filteredPlans = weeklyPlans.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesTag = filterTag === 'all' || (p.tags && p.tags.includes(filterTag));
    return matchesSearch && matchesStatus && matchesTag;
  });

  const totalLeisureBudget = filteredPlans.reduce((sum, p) => sum + (p.budgetEstimate || 0), 0);

  // Generate calendar days for a simplified local calendar (July 2026 example)
  const renderCalendar = () => {
    const daysInMonth = 31;
    const calendarGrid = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `2026-07-${day.toString().padStart(2, '0')}`;
      const dayPlans = weeklyPlans.filter(p => p.date === dateString);
      
      calendarGrid.push(
        <div key={day} className="min-h-[100px] border border-slate-100 dark:border-slate-800 p-2 bg-white dark:bg-slate-900 flex flex-col gap-1.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-850">
          <span className="font-semibold text-xs text-slate-400">{day}</span>
          <div className="flex-1 overflow-y-auto flex flex-col gap-1">
            {dayPlans.map(plan => (
              <div 
                key={plan.id}
                onClick={() => handleEditClick(plan)}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded truncate cursor-pointer ${
                  plan.status === 'done' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 line-through' :
                  plan.status === 'cancelled' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 line-through' :
                  'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400'
                }`}
              >
                {plan.title}
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
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Leisure Plans</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Manage, filter, and track weekend outings, trips, and leisure activities.</p>
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
            + Create Plan
          </button>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left widgets / filters */}
        <div className="lg:col-span-1 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Filter Outings</h3>
            <p className="text-xs text-slate-400 mt-0.5">Narrow down using tags or tags state</p>
          </div>

          <div className="flex flex-col gap-4">
            
            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search</label>
              <input 
                type="text" 
                placeholder="Search plans..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
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
                <option value="planned">Planned</option>
                <option value="done">Done / Finished</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Tag filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tag Class</label>
              <select 
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none"
              >
                <option value="all">All Tags</option>
                {allTags.map((tag, idx) => (
                  <option key={idx} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Budget overview box */}
          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 flex flex-col gap-1 mt-2">
            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider">Estimated Budget Sum</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">${totalLeisureBudget.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Across {filteredPlans.length} filtered outings</span>
          </div>

        </div>

        {/* Right cards list or Calendar */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {viewMode === 'calendar' ? (
            renderCalendar()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredPlans.length === 0 ? (
                <div className="col-span-2 text-center py-20 bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl">
                  <p className="text-slate-400 text-sm font-semibold">No plans match the filter criteria</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setFilterStatus('all'); setFilterTag('all'); }} 
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-xs mt-2"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredPlans.map(plan => (
                  <div 
                    key={plan.id}
                    className={`bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4 group transition-all hover:shadow-md ${
                      plan.completed ? 'opacity-85 border-emerald-500/10' : ''
                    }`}
                  >
                    
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-bold text-base leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${plan.completed ? 'line-through text-slate-400' : ''}`}>
                            {plan.title}
                          </h3>
                        </div>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-1 block">
                          📅 {plan.date ? new Date(plan.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "No Date"} 
                          {plan.location ? ` • 📍 ${plan.location}` : ''}
                        </span>
                      </div>

                      {/* Status select chip */}
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        plan.status === 'done' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' :
                        plan.status === 'cancelled' ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600' :
                        'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600'
                      }`}>
                        {plan.status}
                      </span>
                    </div>

                    {/* Body desc */}
                    <p className={`text-xs leading-relaxed text-slate-500 dark:text-slate-400 ${plan.completed ? 'line-through' : ''}`}>
                      {plan.description || "No description provided."}
                    </p>

                    {/* Tag chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {plan.tags && plan.tags.map((tag, i) => (
                        <span key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400">
                          {tag}
                        </span>
                      ))}
                      {plan.budgetEstimate > 0 && (
                        <span className="bg-violet-50 dark:bg-violet-950/30 px-2 py-0.5 rounded text-[10px] font-bold text-violet-600">
                          Est: ${plan.budgetEstimate}
                        </span>
                      )}
                    </div>

                    {/* Actions footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/60 mt-1">
                      <button 
                        onClick={() => toggleComplete(plan.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 focus:outline-none ${
                          plan.completed 
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 hover:bg-emerald-100/40' 
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {plan.completed ? '✓ Done' : 'Mark Done'}
                      </button>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditClick(plan)}
                          className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(plan.id)}
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

      {/* Add Plan Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full max-w-md shadow-2xl p-6.5 flex flex-col gap-4 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white">Create New Leisure Plan</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-semibold text-base focus:outline-none">✕</button>
            </div>

            <form onSubmit={handleSubmitAdd} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Picnic at Lodi Gardens"
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe plans details, lists, schedules..."
                  rows="3"
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
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
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget Estimate ($)</label>
                  <input 
                    type="number" 
                    value={budgetEstimate} 
                    onChange={(e) => setBudgetEstimate(e.target.value)}
                    placeholder="e.g. 50"
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Delhi Heights"
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="planned">Planned</option>
                    <option value="done">Done</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Tags Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tags</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newTag} 
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g. friends"
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2 rounded-lg text-sm flex-1 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddTag}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800/80">
                    {tags.map((t, i) => (
                      <span key={i} className="bg-slate-200 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1.5">
                        {t}
                        <button type="button" onClick={() => handleRemoveTag(t)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs py-3.5 rounded-lg hover:opacity-95 shadow-md shadow-violet-500/10 mt-2 transition-all"
              >
                Create Plan
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121324] border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full max-w-md shadow-2xl p-6.5 flex flex-col gap-4 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white">Edit Outing Plan</h3>
              <button onClick={() => { setIsEditModalOpen(false); setSelectedPlan(null); }} className="text-slate-400 hover:text-slate-600 font-semibold text-base focus:outline-none">✕</button>
            </div>

            <form onSubmit={handleSubmitEdit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
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
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget Estimate ($)</label>
                  <input 
                    type="number" 
                    value={budgetEstimate} 
                    onChange={(e) => setBudgetEstimate(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="planned">Planned</option>
                    <option value="done">Done</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Tags Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tags</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newTag} 
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g. friends"
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-4 py-2 rounded-lg text-sm flex-1 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddTag}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800/80">
                    {tags.map((t, i) => (
                      <span key={i} className="bg-slate-200 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1.5">
                        {t}
                        <button type="button" onClick={() => handleRemoveTag(t)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                      </span>
                    ))}
                  </div>
                )}
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

export default Plans;
