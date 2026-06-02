export function formatAvailableTime(totalMinutes = 0) {
  const minutes = Number(totalMinutes) || 0;
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainMinutes}분`;
  }

  if (remainMinutes === 0) {
    return `${hours}시간`;
  }

  return `${hours}시간 ${remainMinutes}분`;
}

export function formatClassTime(time) {
  if (!time) {
    return "없음";
  }

  const [hour, minute] = String(time).split(":");
  if (!hour || !minute) {
    return time;
  }

  return `${hour}:${minute}`;
}
