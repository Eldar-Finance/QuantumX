import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { useAppSelector } from "utils/hooks/redux";

const useGetOurApiTokens = async (): Promise<any[]> => {
  const address = useAppSelector(selectUserAddress);
  const apiUrl = 'https://eldar.solutions/api/pairs.php';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    const data: { address: string }[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default useGetOurApiTokens;