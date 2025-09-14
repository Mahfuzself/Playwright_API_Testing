
import{test,expect} from '@playwright/test';
import {getPostAPIRequest} from '../../utils/api_helpers';
import { get } from 'http';
import { fa, faker } from '@faker-js/faker';

test.use({
    baseURL : process.env.baseUrl
});

test("Validate Dynamic TypeSafety Post Request API",async({request})=>{
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
});