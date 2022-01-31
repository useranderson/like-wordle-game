import axios from "axios";

const getData = ({ keys, wordId }: { wordId?: number; keys: string[] }) =>
  axios.post(process.env.NEXT_PUBLIC_API_URL as string, { wordId, keys });

export default getData;
