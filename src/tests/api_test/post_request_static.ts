import {test,expect} from '@playwright/test';
import 'dotenv/config';
import postAPIRequest from '../../utils/test_data/api_request/post_request.json';
test.use({
    baseURL: process.env.BASE_URL
})
test("Create Post API request using static request body", async ({request}) => {
    const response = await request.post('/booking', {
        data : postAPIRequest.booking
    });
    const responseBody = await response.json();
    console.log(`Response Body: ${JSON.stringify(responseBody,null,2 )}`);
    console.log("Full body : "+(response));

   
    expect(response.status()).toBe(200);
     expect(response.statusText()).toBe('OK');
    const APIresponseBody = await response.json();
    expect(APIresponseBody.booking.firstname).toBe("Sally");
    expect(APIresponseBody.booking.lastname).toBe("Brown");
})

// test("Login API with valid credentials should return 200", async ({ request }) => {
//   // Use the exact payload that triggers 401 in manual hit
//   const payload = {
//     data: postAPIRequest.login.valid,     //  password
//   };

//   // Make POST request
//   const response = await request.post(
//     "auth/sign-in",
//     {
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//       },
//       data: postAPIRequest.login.valid,
//     }
//   );

//   // Log for debugging
//   console.log("Status:", response.status());
//   const responseBody = await response.json();
//   console.log(`Body: ${JSON.stringify(responseBody,null,2 )}`);

//   // Assert status code is 200
//   expect(response.status()).toBe(200);
//   expect(response.statusText()).toBe('OK');
//   //Assert Api key is present in response
//   expect(responseBody).toHaveProperty('otp_expired');
//   expect(responseBody).toHaveProperty('access_code');
//   expect(responseBody).toHaveProperty('email');
//   expect(responseBody).toHaveProperty('message');
//   //assert rsposnse body
//   expect(responseBody.email).toBe("andrewlynn@yopmail.com");
//   expect(responseBody.message).toBe("Credential Matched");
// });
// test("Login API with incorrect credentials should return 401", async ({ request }) => {
//   // Use the exact payload that triggers 401 in manual hit
//   const payload = {data : postAPIRequest.login.invalid, // likely field expected is 'email', not 'username'
//   };

//   // Make POST request
//   const response = await request.post(
//     "auth/sign-in",
//     {
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//       },
//       data: postAPIRequest.login.invalid,
//     }
//   );

//   // Log for debugging
//   console.log("Status:", response.status());
//   const responseBody = await response.json();
//   console.log("Body:", responseBody);

//   // Assert status code is 401
//   expect(response.status()).toBe(401);

//   // Assert: Api keys are present in response
//   expect(responseBody).toHaveProperty('status');
//   expect(responseBody).toHaveProperty('status_code');
//   expect(responseBody).toHaveProperty('message');
//   //assert rsposnse body
//   expect(responseBody.status).toBe('error');
//   expect(responseBody.status_code).toBe(401);
//   expect(responseBody.message.toLowerCase()).toContain('the provided credentials are not correct');
// });
// test("Login API with no-otp should return 200", async ({ request }) => {
//   // Use the exact payload that triggers 401 in manual hit
//   const payload = {
//     email: "rl_mahfuz108@yopmail.com", // likely field expected is 'email', not 'username'
//     password: "Test@12345"             //  password
//   };

//   // Make POST request
//   const response = await request.post(
//     "auth/sign-in",
//     {
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//       },
//       data: payload,
//     }
//   );

//   // Log for debugging
//   console.log("Status:", response.status());
//   const responseBody = await response.json();
//   console.log("Body:", responseBody);

//   // Assert status code is 401
//   expect(response.status()).toBe(200);

//   // // Optional: assert the error message
//   // expect(responseBody).toHaveProperty('message');
//   // expect(responseBody.message.toLowerCase()).toContain('the provided credentials are not correct');
// });
