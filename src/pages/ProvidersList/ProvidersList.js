export const fetchProvidersList = async (API_URL) => {
  // try {
  //   const response = await fetch(API_URL+'/providers'); // Adjust the endpoint if needed
  //   if (!response.ok) throw new Error('Failed to fetch providers');
  //   return await response.json();
  // } catch (error) {
  //   console.error('Error fetching providers:', error);
  //   return [];
  // }
  return [{ 
    id: "192.168.1.1",
    name: "Provider A",
    powerShared: "50W",
    activeTime: "12h",
    workingTime: "10h",
    activityScore: 85,
    stats: {
      cpu: 75,
      memory: 60,
      bandwidth: 90,
    },
  },
  {
    id: "192.168.1.2",
    name: "Provider B",
    powerShared: "70W",
    activeTime: "20h",
    workingTime: "18h",
    activityScore: 92,
    stats: {
      cpu: 80,
      memory: 70,
      bandwidth: 85,
    },
  },
  {
    id: "192.168.1.3",
    name: "Provider C",
    powerShared: "40W",
    activeTime: "15h",
    workingTime: "12h",
    activityScore: 78,
    stats: {
      cpu: 65,
      memory: 50,
      bandwidth: 75,
    },
  },];
};
