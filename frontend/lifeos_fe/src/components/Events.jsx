import React, { useEffect, useMemo, useState } from 'react';
import api from '../utils/api';

const EMPTY_FORM = {
  title: '',
  description: '',
  type: 'personal',
  startDate: '',
  endDate: '',
  location: '',
  priority: 'medium',
  status: 'upcoming',
  reminder: false,
  notes: '',
};

const TYPE_LABELS = {
  personal: 'Personal', work: 'Work', academic: 'Academic', health: 'Health',
  government: 'Government', other: 'Other',
};

const STATUS_LABELS = { upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' };
const inputClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white';
const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400';

const toLocalInputValue = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const formatDate = (value) => value
  ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
  : 'No date set';

const eventToForm = (event) => ({
  title: event.title || '',
  description: event.description || '',
  type: event.type || 'personal',
  startDate: toLocalInputValue(event.startDate),
  endDate: toLocalInputValue(event.endDate),
  location: event.location || '',
  priority: event.priority || 'medium',
  status: event.status || 'upcoming',
  reminder: Boolean(event.reminder),
  notes: event.notes || '',
});

const formToPayload = (form) => ({
  ...form,
  startDate: new Date(form.startDate).toISOString(),
  endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
});

function EventForm({ form, onChange, onSubmit, saving, submitLabel }) {
  const field = (name) => (event) => onChange({ ...form, [name]: event.target.value });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>Event title</label>
        <input required value={form.title} onChange={field('title')} className={inputClass} placeholder="e.g. Project review" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className={labelClass}>Type</label><select value={form.type} onChange={field('type')} className={inputClass}>{Object.entries(TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
        <div><label className={labelClass}>Priority</label><select value={form.priority} onChange={field('priority')} className={inputClass}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className={labelClass}>Starts</label><input required type="datetime-local" value={form.startDate} onChange={field('startDate')} className={inputClass} /></div>
        <div><label className={labelClass}>Ends <span className="normal-case">(optional)</span></label><input type="datetime-local" value={form.endDate} onChange={field('endDate')} className={inputClass} /></div>
      </div>
      <div><label className={labelClass}>Location</label><input value={form.location} onChange={field('location')} className={inputClass} placeholder="e.g. Office or Zoom" /></div>
      <div><label className={labelClass}>Description</label><textarea value={form.description} onChange={field('description')} className={`${inputClass} min-h-20`} placeholder="What is this event about?" /></div>
      <div><label className={labelClass}>Notes</label><textarea value={form.notes} onChange={field('notes')} className={`${inputClass} min-h-20`} placeholder="Anything you need to remember" /></div>
      <div className="flex items-center gap-3"><input id="event-reminder" type="checkbox" checked={form.reminder} onChange={(event) => onChange({ ...form, reminder: event.target.checked })} className="h-4 w-4 accent-violet-600" /><label htmlFor="event-reminder" className="text-sm text-slate-600 dark:text-slate-300">Enable reminder</label></div>
      <button disabled={saving} type="submit" className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving…' : submitLabel}</button>
    </form>
  );
}

function Modal({ title, children, onClose }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#121324]"><div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800"><h2 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h2><button onClick={onClose} className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800" aria-label="Close">×</button></div>{children}</div></div>;
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const loadEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/events');
      setEvents(response.data || []);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  const visibleEvents = useMemo(() => events.filter((event) => {
    const query = search.toLowerCase();
    const matchesSearch = !query || [event.title, event.location, event.description, event.notes].some((value) => (value || '').toLowerCase().includes(query));
    return matchesSearch && (filterStatus === 'all' || event.status === filterStatus);
  }), [events, search, filterStatus]);

  const closeModal = () => { setModal(null); setSelectedEvent(null); setForm(EMPTY_FORM); };
  const openAdd = () => { setForm(EMPTY_FORM); setModal('add'); };
  const openView = (event) => { setSelectedEvent(event); setModal('view'); };
  const openEdit = (event) => { setSelectedEvent(event); setForm(eventToForm(event)); setModal('edit'); };

  const saveEvent = async (event) => {
    event.preventDefault();
    setSaving(true); setError('');
    try {
      const payload = formToPayload(form);
      if (modal === 'add') await api.post('/events', payload);
      else await api.put(`/events/${selectedEvent._id}`, payload);
      await loadEvents();
      closeModal();
    } catch (requestError) {
      setError(requestError.message || 'Unable to save event.');
    } finally { setSaving(false); }
  };

  const deleteEvent = async (event) => {
    if (!window.confirm(`Delete “${event.title}”? This cannot be undone.`)) return;
    setError('');
    try { await api.delete(`/events/${event._id}`); setEvents((current) => current.filter((item) => item._id !== event._id)); if (selectedEvent?._id === event._id) closeModal(); }
    catch (requestError) { setError(requestError.message || 'Unable to delete event.'); }
  };

  return <div className="w-full p-5 sm:p-8"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Events</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Keep your appointments and important dates in one place.</p></div><button onClick={openAdd} className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500">+ Create event</button></div>
    {error && <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"><span>{error}</span><button onClick={() => setError('')} aria-label="Dismiss error">×</button></div>}
    <div className="mb-5 flex flex-col gap-3 sm:flex-row"><input value={search} onChange={(event) => setSearch(event.target.value)} className={`${inputClass} flex-1`} placeholder="Search events…" /><select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className={`${inputClass} sm:w-44`}><option value="all">All statuses</option>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
    {loading ? <p className="py-16 text-center text-sm text-slate-500">Loading events…</p> : visibleEvents.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700"><p className="font-semibold text-slate-600 dark:text-slate-300">No events found.</p><button onClick={openAdd} className="mt-3 text-sm font-bold text-violet-600 hover:underline">Create your first event</button></div> : <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">{visibleEvents.map((event) => <article key={event._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-[#121324]"><div className="flex justify-between gap-3"><div><div className="mb-2 flex flex-wrap gap-2"><span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">{TYPE_LABELS[event.type] || event.type}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{STATUS_LABELS[event.status] || event.status}</span></div><h2 className="text-lg font-bold text-slate-900 dark:text-white">{event.title}</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{formatDate(event.startDate)}{event.location ? ` · ${event.location}` : ''}</p></div><span className={`h-fit rounded-lg px-2 py-1 text-xs font-bold ${event.priority === 'high' ? 'bg-rose-100 text-rose-700' : event.priority === 'low' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{event.priority}</span></div>{event.description && <p className="mt-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{event.description}</p>}<div className="mt-5 flex gap-3 border-t border-slate-100 pt-4 text-sm font-bold dark:border-slate-800"><button onClick={() => openView(event)} className="text-slate-600 hover:text-violet-600 dark:text-slate-300">View</button><button onClick={() => openEdit(event)} className="text-violet-600 hover:underline">Edit</button><button onClick={() => deleteEvent(event)} className="text-rose-600 hover:underline">Delete</button></div></article>)}</div>}
    {modal === 'add' && <Modal title="Create event" onClose={closeModal}><EventForm form={form} onChange={setForm} onSubmit={saveEvent} saving={saving} submitLabel="Create event" /></Modal>}
    {modal === 'edit' && <Modal title="Edit event" onClose={closeModal}><EventForm form={form} onChange={setForm} onSubmit={saveEvent} saving={saving} submitLabel="Save changes" /></Modal>}
    {modal === 'view' && selectedEvent && <Modal title="Event details" onClose={closeModal}><div className="space-y-4 text-sm"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">When</p><p className="mt-1 text-slate-800 dark:text-slate-200">{formatDate(selectedEvent.startDate)}{selectedEvent.endDate ? ` – ${formatDate(selectedEvent.endDate)}` : ''}</p></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Type and status</p><p className="mt-1 text-slate-800 dark:text-slate-200">{TYPE_LABELS[selectedEvent.type]} · {STATUS_LABELS[selectedEvent.status]} · {selectedEvent.priority} priority</p></div>{selectedEvent.location && <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</p><p className="mt-1 text-slate-800 dark:text-slate-200">{selectedEvent.location}</p></div>}{selectedEvent.description && <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</p><p className="mt-1 whitespace-pre-wrap text-slate-800 dark:text-slate-200">{selectedEvent.description}</p></div>}{selectedEvent.notes && <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Notes</p><p className="mt-1 whitespace-pre-wrap text-slate-800 dark:text-slate-200">{selectedEvent.notes}</p></div>}<div className="flex gap-3 pt-2"><button onClick={() => openEdit(selectedEvent)} className="rounded-xl bg-violet-600 px-4 py-2.5 font-bold text-white hover:bg-violet-500">Edit event</button><button onClick={() => deleteEvent(selectedEvent)} className="rounded-xl border border-rose-200 px-4 py-2.5 font-bold text-rose-600 hover:bg-rose-50">Delete</button></div></div></Modal>}
  </div>;
};

export default Events;
