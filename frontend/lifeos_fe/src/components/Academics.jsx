import React from 'react';
import CrudCollection, { localDate } from './CrudCollection';

const options = (values) => values.map((value) => ({ value, label: value.replace(/-/g, ' ') }));
const fields = [
  { name: 'subject', label: 'Subject', required: true }, { name: 'title', label: 'Task title', required: true },
  { name: 'type', label: 'Type', type: 'select', options: options(['assignment', 'exam', 'project', 'study', 'revision', 'other']) },
  { name: 'deadline', label: 'Deadline', type: 'datetime-local' }, { name: 'status', label: 'Status', type: 'select', options: options(['not-started', 'in-progress', 'completed']) },
  { name: 'priority', label: 'Priority', type: 'select', options: options(['low', 'medium', 'high']) },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true }, { name: 'notes', label: 'Notes', type: 'textarea', fullWidth: true },
];

export default function Academics() {
  return <CrudCollection title="Academics" description="Track assignments, exams, projects, and study goals." endpoint="/academics" fields={fields} cardTitle={(item) => item.title} cardMeta={(item) => `${item.subject} · ${item.type} · ${item.status}${item.deadline ? ` · due ${new Date(item.deadline).toLocaleDateString()}` : ''}`} cardDetails={(item) => item.description || item.notes} fromRecord={(item) => ({ ...item, deadline: localDate(item.deadline) })} toPayload={(form) => ({ ...form, deadline: form.deadline ? new Date(form.deadline).toISOString() : undefined })} />;
}
