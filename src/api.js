export const getVans = async () => {
  const response = await fetch("/api/vans");
  if(!response.ok) {
    throw {
        message: "failed to fetch vans",
        statusText: response.statusText,
        status: response.status
    }
  }
  const {vans} = await response.json();
  return vans;
};
