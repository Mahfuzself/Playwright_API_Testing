interface BookingAPI {
        // bookingid : number,
        firstname: string;
        lastname: string;
        totalprice: number;
        depositpaid: boolean;
        additionalneeds?: string;
        bookingdates: BookingDates
    
   
   
}
interface BookingDates {
    checkin: string;
    checkout: string;
}