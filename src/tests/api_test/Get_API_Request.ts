
import {test,expect} from "@playwright/test"
import dotenv from 'dotenv';
import { request, get } from 'http';
import { fa, faker, Faker } from "@faker-js/faker";
import{getPostAPIRequest} from "../../utils/api_helpers"
test.use({
    baseURL : process.env.baseUrl
})
test("Create get api request using playwright with typescript",async({request})=>{
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    const totalPrice = faker.number.int({min : 1000,max : 5000});
    const requestBody = await getPostAPIRequest(fname,lname,totalPrice,true,"Breakfast","2023-01-01","2023-01-05");
    const response = await request.post('/booking',{
        data : requestBody
    })
    expect(response).toBe('200')
    expect(response).toBe('OK')
    const responseBody = response.json()
    

    

    

})