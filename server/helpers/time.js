function nowLocal() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function todayLocal() {
  return nowLocal().slice(0, 10);
}

function daysAgoLocal(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

module.exports = { nowLocal, todayLocal, daysAgoLocal };
