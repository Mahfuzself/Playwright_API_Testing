import { test,expect } from '@playwright/test';
import patchRequest from '../../utils/test_data/api_request/patch_api_request.json'
import tokenRequest  from '../../utils/test_data/api_request/token_api_request.json'
import {getPostAPIRequest} from '../../utils/api_helpers';
import { faker, Faker } from '@faker-js/faker';
test("Patch Api Request with playwright & Typescript",async({request})=>{
   //Create New Booking
   const fname = faker.person.firstName();
   const lname = faker.person.lastName();
   const totalPrice = faker.number.int({min : 100 , max : 2000});
   const postAPIRequest = await getPostAPIRequest(fname,lname,totalPrice,true,"Breakfast","2023-01-01","2023-01-05");
   const bookingResponse = await request.post('/booking',{
      data: postAPIRequest
   })
   expect(bookingResponse.status()).toBe(200)
   expect(bookingResponse.statusText()).toBe('OK')
   //validate post Request keys
    const jsonBookingResponse = await bookingResponse.json();
    const b_id = jsonBookingResponse.bookingid
    console.log(`Booking Response : ${JSON.stringify(jsonBookingResponse,null,2)}`)
    expect(jsonBookingResponse.booking).toHaveProperty('firstname');
    expect(jsonBookingResponse.booking).toHaveProperty('lastname');
    expect(jsonBookingResponse.booking).toHaveProperty('totalprice');
    expect(jsonBookingResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonBookingResponse.booking.bookingdates).toHaveProperty('checkout');
    //Crate token
    const tokenResponse =  await request.post('/auth',{
        data : tokenRequest
    })
    expect(tokenResponse.status()).toBe(200)
    expect(tokenResponse.statusText()).toBe('OK')
    const jsonTokenResponse = await tokenResponse.json()
    console.log(`Token Response : ${JSON.stringify(jsonTokenResponse,null,2)}`)
    const Token = jsonTokenResponse.token
    //Crate firstname 
    const patchResponse = await request.patch(`/booking/${b_id}`,{
        headers : {
            "Content-Type": "application/json",
            "Cookie" : `token= ${Token}`
        },
        data : patchRequest
    })
    expect(patchResponse.status()).toBe(200)
    expect(patchResponse.statusText()).toBe('OK')
    //Get patch Booking 
    const patchResponseBooking = await request.get(`/booking/${b_id}`,{

    })
    expect(patchResponseBooking.status()).toBe(200)
    expect(patchResponseBooking.statusText()).toBe('OK')
    const jsonpatchResponseBooking = await patchResponseBooking.json()
    console.log(`Update Booking : ${JSON.stringify(jsonpatchResponseBooking,null,2)}`);
    

})