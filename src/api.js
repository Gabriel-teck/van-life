export const getVans = async (id) => {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const response = await fetch(url);
  if (!response.ok) {
    throw {
      message: "failed to fetch vans",
      statusText: response.statusText,
      status: response.status,
    };
  }
  const { vans } = await response.json();
  return vans;
};

export const getHostVans = async (id) => {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const response = await fetch(url);
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: response.statusText,
      status: response.status,
    };
  }
  const { vans } = await response.json();
  return vans;
};

export const loginUser = async (creds) => {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
};
