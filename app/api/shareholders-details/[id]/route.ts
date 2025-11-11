import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const id = context.params.id;

  //https://frisopsapi.azurewebsites.net/api/api/${id}

  //https://stanbicibtc-api.azurewebsites.net/api/

  try {
    const fetchJob = await fetch(
      `https://charms-api-endpoints.azurewebsites.net/api/jobs/parameter/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await fetchJob.json();

    // console.log(data);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
