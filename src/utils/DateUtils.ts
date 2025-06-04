export const formatDateTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return date.toLocaleDateString('en-US', options);
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};

export const formatTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return date.toLocaleTimeString('en-US', options);
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (diffInDays < 7) {
    const days = Math.floor(diffInDays);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else {
    return formatDate(date);
  }
}; 