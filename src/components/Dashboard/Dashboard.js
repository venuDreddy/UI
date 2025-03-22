export const fetchSystemUsage = async (
  setCpuUsed,
  setMemoryUsed,
  setRamUsed,
  API_URL
) => {
  try {
    const response = await fetch(API_URL+'/system-usage');
    if (!response.ok) throw new Error('Failed to fetch system usage');

    const data = await response.json();
    setCpuUsed(data.cpuUsage);
    setMemoryUsed(data.memoryUsage);
    setRamUsed(data.ramUsage);
  } catch (error) {
    console.error('Error fetching system usage:', error);
  }
};

export const fetchBatteryStatus = async (setBattery,API_URL) => {
  if ('getBattery' in navigator) {
    const battery = await navigator.getBattery();
    setBattery(Math.floor(battery.level * 100));
  }
};
