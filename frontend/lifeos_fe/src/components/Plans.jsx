import React from 'react';
import CrudCollection, { localDate } from './CrudCollection';

const options = (values) => values.map((value) => ({ value, label: value.replace(/-/g, ' ') }));
const fields = [
  { name: 'title', label: 'Plan title', required: true },
  { name: 'category', label: 'Category', type: 'select', options: options(['travel', 'personal', 'career', 'finance', 'learning', 'other']) },
  { name: 'startDate', label: 'Start date', type: 'datetime-local', required: true },
  { name: 'endDate', label: 'End date', type: 'datetime-local' },
  { name: 'location', label: 'Location' },
  { name: 'budget', label: 'Budget', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: options(['planned', 'in-progress', 'completed', 'cancelled']) },
  { name: 'priority', label: 'Priority', type: 'select', options: options(['low', 'medium', 'high']) },
  { name: 'tags', label: 'Tags (comma separated)', fullWidth: true },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true },
  { name: 'notes', label: 'Notes', type: 'textarea', fullWidth: true },
];

export default function Plans() {
  return <CrudCollection title="Plans" description="Organise outings, personal projects, and future goals." endpoint="/plans" fields={fields} cardTitle={(plan) => plan.title} cardMeta={(plan) => `${plan.category} · ${plan.status} · ${plan.startDate ? new Date(plan.startDate).toLocaleDateString() : 'No date'}`} cardDetails={(plan) => plan.description || plan.notes} fromRecord={(plan) => ({ ...plan, startDate: localDate(plan.startDate), endDate: localDate(plan.endDate), tags: (plan.tags || []).join(', ') })} toPayload={(form) => ({ ...form, startDate: new Date(form.startDate).toISOString(), endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined, tags: form.tags ? form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [] })} />;
}
