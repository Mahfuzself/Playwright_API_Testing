import {test, expect} from '@playwright/test';
import 'dotenv/config';
import postAPIRequest from '../../utils/test_data/api_request/dynamic_post_api_request.json';
import { formatAPIRequest } from '../../utils/api_helpers';
import path from 'path';
import fs from 'fs';

test.use({
    baseURL: process.env.BASE_URL
})

test("Create Post API request using dynamic request body", async ({request}) => {
   //Reading json file
   const filepath = path.join(__dirname,'../../utils/test_data/api_request/dynamic_post_api_request.json');
   const jsonTemplate = fs.readFileSync(filepath, 'utf-8');
   const values =["Api test playwright with typescript","Api test playwright with javascript","1000"]
   const postAPIRequestBody = await formatAPIRequest(jsonTemplate,values);

   const response = await request.post('/booking', {
       data: JSON.parse(postAPIRequestBody)
   });

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
    const APIresponseBody = await response.json();
    console.log(`Response Body: ${JSON.stringify(APIresponseBody,null,2 )}`);
    //Validate property/key is present in response
    expect(APIresponseBody.booking).toHaveProperty('firstname');
    expect(APIresponseBody.booking).toHaveProperty('lastname');
    expect(APIresponseBody.booking).toHaveProperty('totalprice');
    expect(APIresponseBody.booking.bookingdates).toHaveProperty('checkin');
    expect(APIresponseBody.booking.bookingdates).toHaveProperty('checkout');
    //Validate value in response
    expect(APIresponseBody.booking.firstname).toBe("Api test playwright with typescript");
    expect(APIresponseBody.booking.lastname).toBe("Api test playwright with javascript");
    expect(APIresponseBody.booking.totalprice).toBe(1000);
    expect(APIresponseBody.booking.bookingdates.checkin).toBe("2013-02-23");
    expect(APIresponseBody.booking.bookingdates.checkout).toBe("2014-10-23");
  
})
