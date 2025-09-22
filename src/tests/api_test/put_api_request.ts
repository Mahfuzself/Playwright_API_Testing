
import {test,expect} from "@playwright/test"
import tokenRequest from "../../utils/test_data/api_request/token_api_request.json"
import putApiRequest from '../../utils/test_data/api_request/put_api_request.json'
import postAPIRequest from '../../utils/test_data/api_request/dynamic_post_api_request.json';
import {getPostAPIRequest} from '../../utils/api_helpers';
import { faker, Faker } from "@faker-js/faker"

test("Update booking using put api request",async({request})=>{
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    const totalPrice = faker.number.int({min:1000,max:10000});
   const postAPIRequest = await getPostAPIRequest(fname,lname,totalPrice,true,"Breakfast","2023-01-01","2023-01-05");
      const response = await request.post('/booking',{
          data : postAPIRequest
          
      });
      const responseBody = await response.json();
      console.log(`Response Body: ${JSON.stringify(responseBody,null,2 )}`);
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');
      expect(responseBody.booking.firstname).toBe(fname);
      expect(responseBody.booking.lastname).toBe(lname);
      expect(responseBody.booking.totalprice).toBe(totalPrice);
      expect(responseBody.booking.bookingdates.checkin).toBe("2023-01-01");
       expect(responseBody.booking.bookingdates.checkout).toBe("2023-01-05");
       const b_id = responseBody.bookingid;
       //Get Booking
       const getApiresponse = await request.get(`/booking/${b_id}`,{
       })
    expect(getApiresponse.status()).toBe(200)
    expect(getApiresponse.statusText()).toBe('OK')
    const jsonResponse = await getApiresponse.json();
    console.log(`Get Api Response : ${JSON.stringify(jsonResponse,null,2)}`);
    //verify getApi response field data 
    expect(jsonResponse.firstname).toBe(fname)
    expect(jsonResponse.lastname).toBe(lname)

   // Genterate Token
 const apiresponse = await request.post('/auth',{
        data : tokenRequest
    })
     expect(apiresponse.status()).toBe(200)
    expect(apiresponse.statusText()).toBe('OK')
    const jsonTokenResponse = await apiresponse.json()
     const token = jsonTokenResponse.token ;
    console.log(`Token Response :${JSON.stringify(jsonTokenResponse,null,2)}`);
    //Update booking 
    // const updatefname = faker.person.firstName();
    // const updatelname = faker.person.lastName();
    // const updatetotalPrice = faker.number.int({min:1000,max:10000});
    const putRequest = await request.put(`/booking/${b_id}`,{
        headers : {
            "Content_type": "application/json",
            "Cookie" : `token= ${token}`
        },
        data : putApiRequest
    })
    expect(putRequest.status()).toBe(200)
    expect(putRequest.statusText()).toBe('OK')
    const jsonputResponse = await putRequest.json()
    console.log(`Updated Booking Response : ${JSON.stringify(jsonputResponse,null,2)}`)
    
     
})