
const baseUrl = import.meta.env.VITE_BASE_URL

 
export async function fetchDelivery (city: string) {
  const request = await fetch(`${baseUrl}/check?search=${city}`);
  const response: any = await request.json();

  return response;
}