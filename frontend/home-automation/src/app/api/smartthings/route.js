import { URLSearchParams } from "url";

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const code = params.get("code");

  console.log(params);
  console.log(code);

  //   try {
  //     const response = await fetch("https://api.smartthings.com/v1/oauth/token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         grant_type: "authorization_code",
  //         client_id: process.env.SMARTTHINGS_CLIENT_ID,
  //         client_secret: process.env.SMARTTHINGS_CLIENT_SECRET,
  //         redirect_uri: process.env.SMARTTHINGS_REDIRECT_URI,
  //         code: code,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Error fetching access token");
  //     }

  //     const data = await response.json();

  //     return new Response(JSON.stringify(data), {
  //       headers: { "Content-Type": "application/json" },
  //       status: 200,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return new Response(
  //       JSON.stringify({ error: "Error fetching access token" }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         status: 500,
  //       }
  //     );
  //   }
}

export async function POST(request) {
  const body = await request.json();
  console.log(body); // Log the request body to console
  const { lifecycle } = body;

  if (lifecycle === "CONFIRMATION") {
    const {
      confirmationData: { confirmationUrl },
    } = body;

    // Your app must send a GET request to the confirmationUrl
    //   await fetch(confirmationUrl);
    const confirmationResponse = await fetch(confirmationUrl);
    console.log(confirmationResponse); // Log the response to console

    // Respond with the result of confirmation
    return new Response(
      JSON.stringify({ status: "CONFIRMATION lifecycle handled" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } else if (lifecycle === "INSTALL") {
    // handle installation...
  } else if (lifecycle === "UPDATE") {
    // handle update...
  } else if (lifecycle === "UNINSTALL") {
    // handle uninstallation...
  } else {
    // unexpected lifecycle event...
    return new Response("Unexpected lifecycle event", { status: 400 });
  }
}
