import { IsEmail, IsObject, IsPhoneNumber, IsString } from "class-validator";

export class Contact {
    @IsPhoneNumber()
    phoneNumber: string;
    @IsEmail()
    email: string;
}

export class Booker {
    @IsString()
    name: string;
    @IsString()
    id: string;
    @IsObject()
    contact: Contact;

}
