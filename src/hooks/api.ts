/* const API_BASE_URL = "http://localhost:8080"; */
const API_BASE_URL = "https://petfinder-m7.onrender.com";

// llamadas a la api, uso de localStorage
//OPCIONAL

export async function getPetsAroundMe(lat, lng) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/pets-around-me?lat=${lat}&lng=${lng}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    /*  console.log("soy dataaaa", data); */

    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}

// chequear email del user
export async function checkEmail(email: String) {
  try {
    const res = await fetch(`${API_BASE_URL}/check-email?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.email) {
      console.log("checkEmail api.ts", data.email);
      return data.email;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

// obtener token del usuario - login to api
export async function loginToAPI(email: String, password: String) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    localStorage.setItem("token", data);
    return data;
  } catch (error) {
    console.log("err", error);
  }
}

// crear usuario y obtener id
export async function getUserId(email: String, password: String) {
  try {
    const res = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
}

//enviar reportes de mascota
export async function sendPetReport(petData, petId) {
  try {
    const res = await fetch(`${API_BASE_URL}/report-pet-info?petId=${petId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    });
    const data = await res.json();
    console.log("sendPetReport:", data);
    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}

//obtener reportes del usuario
export async function getUserReports(id: any, token: String) {
  try {
    const res = await fetch(`${API_BASE_URL}/pets?userId=${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}

//cambiar los datos personales del usuario

export async function updateUserData(userData: any, userId: any) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE_URL}/users/update?userId=${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log("datos cambiados:", data);
    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}

//obtener datos del pet
export async function getPetData(id: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/get-pet-by-id?petId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}

//cambiar los datos personales del usuario

export async function createPet(petData) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE_URL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });
    const data = await res.json();
    console.log("pet creado:", data);
    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}

// modificar datos de mascota
export async function updatePetData(petData: any, petId: any) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE_URL}/pets/update?petId=${petId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });

    const data = await res.json();
    console.log("datos cambiados del pet:", data);
    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}

// reportar como encontrado
export async function reportAsFound(petData: any, petId: any) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE_URL}/pet-found?petId=${petId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });

    const data = await res.json();
    console.log("pet encontrado:", data);
    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}

// eliminar reporte de mascota
export async function deleteReport(petId: any) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE_URL}/pets?petId=${petId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("pet eliminado:", data);
    return data;
  } catch (error) {
    console.log("soy el error", error);
  }
}
