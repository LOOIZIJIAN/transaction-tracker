import { getCategories } from "@/services/setting/get-categories"

export async function GET(){
  const data = await getCategories();
  return Response.json(data);
}
