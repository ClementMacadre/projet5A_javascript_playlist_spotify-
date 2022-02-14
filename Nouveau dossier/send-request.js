const createVoltForm = document.getElementById("create");
const updateVoltForm = document.getElementById("update");
  
createVoltForm.onsubmit = async function (e) {
  e.preventDefault();
  const url = "/create";
  const data = {
    volt: document.getElementById("create-volt").value,
  };
  
  await sendRequest(url, data);
};
  
updateVoltForm.onsubmit = async function (e) {
  e.preventDefault();
  const url = "/update";
  
  const data = {
    volt: document.getElementById("update-volt").value,
  };
  
  await sendRequest(url, data);
};
  
async function sendRequest(url, data) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.post(url, data, options);
    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert("Erreur");
  }
}