import axios from "axios";
import {Response} from "../pages/api/word";

const getData = ({ keys, wordId }: { wordId?: number; keys: string[] }) =>
  axios.post<Response>(process.env.NEXT_PUBLIC_API_URL as string, { wordId, keys });

export default getData;
