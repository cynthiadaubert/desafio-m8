import { atom, selector } from "recoil";

// ubicación actual
export const currentLocationState = atom({
  key: "userlocation",
  default: null,
});

//el id del usuario actual
export const userIdState = atom({
  key: "userIdState",
  default: null,
});

//el user email actual
export const userEmailState = atom({
  key: "userEmailState",
  default: null,
});

//agregamos el selector para compartir este estado entre componentes:
export const userEmailSelector = selector({
  key: "userEmailSelector",
  get: ({ get }) => {
    const userEmail = get(userEmailState);
    localStorage.setItem("userEmail", userEmail);
    return userEmail;
  },
});

// el selector accede y lee valores desde el estado global de Recoil.

//////////////////////

/* const queryState = atom({
  key: "query",
  default: "",
});

const resultsState = selector({
  key: "searchResults",
  get: async ({ get }) => {
    const valorQuery = get(queryState);
    if (valorQuery) {
      const response = await fetch(
        "https://api.mercadolibre.com/sites/MLA/search?q=" + valorQuery
      );
      const json = await response.json();
           console.log("vvvv", valorQuery); 
      return json.results;
    } else {
      return [];
    }
  },
});

////////////////////

export function useSearchResults(): any[] {
  /*   const params = useParams();
  const query = params.query;
  const setRecoilQuery = useSetRecoilState(queryState);
  const results = useRecoilValue(resultsState);

  console.log("el valor de query en recoil");

  useEffect(() => {
    console.log("soy el custom hook", query);
    setRecoilQuery(results);
  }, [query]);
 
  //return results;
  return [];
}*/

////
