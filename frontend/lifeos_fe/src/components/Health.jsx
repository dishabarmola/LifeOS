import React from 'react';
import CrudCollection, { localDate } from './CrudCollection';

const options = (values) => values.map((value) => ({ value, label: value.replace(/-/g, ' ') }));
const fields = [
  { name: 'date', label: 'Date', type: 'date', required: true }, { name: 'weight', label: 'Weight (kg)', type: 'number' },
  { name: 'sleepHours', label: 'Sleep (hours)', type: 'number' }, { name: 'sleepQuality', label: 'Sleep quality', type: 'select', options: options(['poor', 'average', 'good', 'excellent']) },
  { name: 'water', label: 'Water (litres)', type: 'number' }, { name: 'energyLevel', label: 'Energy (1–10)', type: 'number' },
  { name: 'mood', label: 'Mood', type: 'select', options: options(['very-bad', 'bad', 'neutral', 'good', 'excellent']) }, { name: 'exerciseCompleted', label: 'Exercise', type: 'checkbox', checkboxLabel: 'Completed exercise' },
  { name: 'exerciseType', label: 'Exercise type' }, { name: 'exerciseDuration', label: 'Exercise duration (mins)', type: 'number' },
  { name: 'notes', label: 'Notes', type: 'textarea', fullWidth: true },
];

const fromRecord = (entry) => ({ ...entry, date: localDate(entry.date, true), sleepHours: entry.sleep?.hours ?? '', sleepQuality: entry.sleep?.quality ?? 'average', exerciseCompleted: Boolean(entry.exercise?.completed), exerciseType: entry.exercise?.type ?? '', exerciseDuration: entry.exercise?.duration ?? '' });
const toPayload = ({ sleepHours, sleepQuality, exerciseCompleted, exerciseType, exerciseDuration, ...form }) => ({ ...form, date: new Date(form.date).toISOString(), sleep: { hours: sleepHours || undefined, quality: sleepQuality || undefined }, exercise: { completed: exerciseCompleted, type: exerciseType, duration: exerciseDuration || undefined } });

export default function Health() {
  return <CrudCollection title="Health entries" description="Record your daily wellness, sleep, water, mood, and movement." endpoint="/health" fields={fields} cardTitle={(entry) => entry.date ? new Date(entry.date).toLocaleDateString(undefined, { dateStyle: 'full' }) : 'Health entry'} cardMeta={(entry) => `${entry.mood || 'No mood'} mood · ${entry.energyLevel || '—'}/10 energy · ${entry.water ?? '—'}L water`} cardDetails={(entry) => entry.notes || `${entry.sleep?.hours ?? '—'} hours sleep${entry.exercise?.completed ? ` · ${entry.exercise.type || 'Exercise completed'}` : ''}`} fromRecord={fromRecord} toPayload={toPayload} />;
}
