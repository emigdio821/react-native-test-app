export function formatDate(date: Date) {
  return date.toLocaleDateString([], { dateStyle: 'long' })
}

export function formatTime(time: Date) {
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDateTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
