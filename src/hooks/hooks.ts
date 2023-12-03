import { useState, useEffect } from "react";
import { atom, selector, useRecoilState } from "recoil";
import { loginToAPI, getUserId, checkEmail } from "hooks/api";
import { currentLocationState, userIdState, userEmailState } from "./atoms";

//hooks: prooveen de data, o si estoy logueado o no, x ejemplo

// obtenemos el token y seteamos el logged in
export function useLogin() {
  const [loggedIn, setLoggedIn] = useState(null);

  async function login(email: string, password: string) {
    try {
      const userToken = await loginToAPI(email, password);
      /*    console.log("soy la user data", userToken); */
      setLoggedIn(userToken);
      return userToken;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    loggedIn,
    login,
  };

  //el valor de retorno son las funciones que vamos a usar en los componentes, o un objeto o un valor
}

// chequeamos el email del user
export function useCheckEmail() {
  const [email, setEmail] = useRecoilState(userEmailState);

  async function getEmail(email: String) {
    try {
      const data = await checkEmail(email);
      setEmail(data.email);
      localStorage.setItem("userId", data.id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    email,
    setEmail,
    getEmail,
  };
}

// creamos el usuario y obtenemos el user id
export function useCreateUserId() {
  const [id, setUserId] = useRecoilState(userIdState);

  async function getId(email: String, password: String) {
    try {
      const data = await getUserId(email, password);
      console.log("soy el id de usuario", data);
      setUserId(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    id,
    getId,
  };
}

// DAR MI UBICACIÓN ACTUAL
export function useGeolocation() {
  const [location, setLocationState] = useRecoilState(currentLocationState);
  //const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Guarda la posición en el estado
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setLocationState(locationData);
          /*   localStorage.setItem("location", JSON.stringify(locationData)); */
          /*
              console.log(
            "Latitude:",
            position.coords.latitude,
            "Longitude:",
            position.coords.longitude
          ); */
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocalización no está disponible en este navegador.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []); // Llama a getLocation() cuando el componente se monta

  return { location, error, getLocation };
}
