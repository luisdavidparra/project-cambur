export const GetUser = async () => {
  const res = await fetch("http://localhost:8080/user");
  const data = await res.json();
  return data[0];
};

export const SetUserLists = async (elementEdited) => {
  fetch(`http://localhost:8080/user/1`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(elementEdited),
  });
};
