import { getCategories } from "@/services/setting/get-categories"

export default async function handler(req: Request){
  if(req.method === 'GET'){
    return await GET();
  }
}

export async function GET(){
  const data = await getCategories();
  return Response.json(data);
}
