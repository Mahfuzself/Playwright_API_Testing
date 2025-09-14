export async function formatAPIRequest(template : string,values : any[]) : Promise<string> {

    return template.replace(/{(\d+)}/g, (match, p1) => {
        const index = parseInt(p1, 10);
        return index < values.length ? String(values[index]) : match;
    });
}
export async function getPostAPIRequest(fname : string, lname : string, totalPrice : number, depositPaid : boolean,  additionalNeeds : string ,checkin : string, checkout : string) {

    const apiRequest : BookingAPI = {
        firstname: fname,
        lastname: lname,
        totalprice: totalPrice,
        depositpaid: depositPaid,
            additionalneeds: additionalNeeds,
            bookingdates: {
                checkin: checkin,
                checkout: checkout
            }
           
        
    }
    return apiRequest;
}