import {test,expect} from '@playwright/test';
import postAPIRequest from '../../utils/test_data/api_request/post_request.json';
test("Create Post API request using static request body", async ({request}) => {
    const response = await request.post('/booking', {
        data: postAPIRequest,
       
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.booking.firstname).toBe("Sally");
    expect(responseBody.booking.lastname).toBe("Brown");
})