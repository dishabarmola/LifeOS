import React, { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../utils/api';

const inputClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white';
const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400';
const localDate = (value, dateOnly = false) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  if (dateOnly) return date.toISOString().slice(0, 10);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

function Modal({ title, children, onClose }) {
  return <div role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.target === event.currentTarget && onClose()} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#121324]"><div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800"><h2 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h2><button onClick={onClose} className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100" aria-label="Close">×</button></div>{children}</div></div>;
}

const blankForm = (fields) => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? (field.type === 'checkbox' ? false : field.type === 'select' ? field.options?.[0]?.value || '' : '')]));

export default function CrudCollection({ title, description, endpoint, fields, cardTitle, cardMeta, cardDetails, toPayload = (value) => value, fromRecord = (value) => value }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(() => blankForm(fields));
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => { setLoading(true); setError(''); try { const response = await api.get(endpoint); setRecords(response.data || []); } catch (err) { setError(err.message || `Unable to load ${title.toLowerCase()}.`); } finally { setLoading(false); } }, [endpoint, title]);
  useEffect(() => { load(); }, [load]);
  const displayed = useMemo(() => records.filter((record) => JSON.stringify(record).toLowerCase().includes(search.toLowerCase())), [records, search]);
  const close = () => { setModal(null); setSelected(null); setForm(blankForm(fields)); };
  const add = () => { setForm(blankForm(fields)); setModal('add'); };
  const edit = (record) => { setSelected(record); setForm({ ...blankForm(fields), ...fromRecord(record) }); setModal('edit'); };
  const view = (record) => { setSelected(record); setModal('view'); };
  const save = async (event) => { event.preventDefault(); setSaving(true); setError(''); try { const payload = toPayload(form); const response = modal === 'add' ? await api.post(endpoint, payload) : await api.put(`${endpoint}/${selected._id}`, payload); const saved = response.data; setRecords((current) => modal === 'add' ? [...current, saved] : current.map((record) => record._id === saved._id ? saved : record)); close(); } catch (err) { setError(err.message || 'Unable to save this item.'); } finally { setSaving(false); } };
  const remove = async (record) => { if (!window.confirm(`Delete “${cardTitle(record)}”? This cannot be undone.`)) return; setError(''); try { await api.delete(`${endpoint}/${record._id}`); setRecords((current) => current.filter((item) => item._id !== record._id)); close(); } catch (err) { setError(err.message || 'Unable to delete this item.'); } };
  const change = (field, value) => setForm((current) => ({ ...current, [field.name]: field.type === 'number' && value !== '' ? Number(value) : value }));

  return <div className="w-full p-5 sm:p-8"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">{title}</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p></div><button onClick={add} className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500">+ Add {title.slice(0, -1)}</button></div>
    {error && <div className="mb-5 flex justify-between rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"><span>{error}</span><button onClick={() => setError('')}>×</button></div>}
    <input className={`${inputClass} mb-5`} value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${title.toLowerCase()}…`} />
    {loading ? <p className="py-16 text-center text-sm text-slate-500">Loading {title.toLowerCase()}…</p> : displayed.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700"><p className="font-semibold text-slate-600 dark:text-slate-300">No {title.toLowerCase()} yet.</p><button onClick={add} className="mt-3 text-sm font-bold text-violet-600 hover:underline">Add the first one</button></div> : <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">{displayed.map((record) => <article key={record._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-[#121324]"><h2 className="text-lg font-bold text-slate-900 dark:text-white">{cardTitle(record)}</h2><p className="mt-1 text-sm text-violet-600 dark:text-violet-300">{cardMeta(record)}</p><p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{cardDetails(record) || 'No additional details.'}</p><div className="mt-5 flex gap-3 border-t border-slate-100 pt-4 text-sm font-bold dark:border-slate-800"><button onClick={() => view(record)} className="text-slate-600 hover:text-violet-600 dark:text-slate-300">View</button><button onClick={() => edit(record)} className="text-violet-600 hover:underline">Edit</button><button onClick={() => remove(record)} className="text-rose-600 hover:underline">Delete</button></div></article>)}</div>}
    {(modal === 'add' || modal === 'edit') && <Modal title={`${modal === 'add' ? 'Add' : 'Edit'} ${title.slice(0, -1)}`} onClose={close}><form onSubmit={save} className="grid grid-cols-1 gap-4 sm:grid-cols-2">{fields.map((field) => <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}><label className={labelClass}>{field.label}</label>{field.type === 'textarea' ? <textarea required={field.required} value={form[field.name] ?? ''} onChange={(event) => change(field, event.target.value)} className={`${inputClass} min-h-24`} /> : field.type === 'select' ? <select required={field.required} value={form[field.name] ?? ''} onChange={(event) => change(field, event.target.value)} className={inputClass}>{field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field.type === 'checkbox' ? <label className="flex h-11 items-center gap-3 text-sm text-slate-600 dark:text-slate-300"><input type="checkbox" checked={Boolean(form[field.name])} onChange={(event) => change(field, event.target.checked)} className="h-4 w-4 accent-violet-600" />{field.checkboxLabel || 'Yes'}</label> : <input required={field.required} type={field.type || 'text'} value={form[field.name] ?? ''} onChange={(event) => change(field, event.target.value)} className={inputClass} />}</div>)}<button disabled={saving} className="sm:col-span-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white hover:bg-violet-500 disabled:opacity-60">{saving ? 'Saving…' : 'Save'}</button></form></Modal>}
    {modal === 'view' && selected && <Modal title={`${title.slice(0, -1)} details`} onClose={close}><dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">{fields.map((field) => { const value = fromRecord(selected)[field.name]; return <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{field.label}</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-200">{field.display ? field.display(value) : String(value ?? '—')}</dd></div>; })}</dl><div className="mt-6 flex gap-3"><button onClick={() => edit(selected)} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white">Edit</button><button onClick={() => remove(selected)} className="rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-bold text-rose-600">Delete</button></div></Modal>}
  </div>;
}

export { localDate };
