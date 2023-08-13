# Slot Booking Application

This project is a test task submission for a high-level assessment. The purpose of this application is to create a slot booking system with the following features: booking a slot, listing free slots, and listing the booked slots.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Introduction

This repository contains a slot booking application created as a test task submission. The application provides a set of HTTP APIs that allow users to manage slots, book available slots, and retrieve information about booked and free slots.

## Features

- **Book a Slot:** Users can book available slots based on their preferences.
- **List Free Slots:** Users can retrieve a list of available slots that can be booked.
- **List Booked Slots:** Users can view a list of slots that have already been booked.

## API Endpoints

### `POST /slot/free-slot`

This API returns a list of free slots based on the provided criteria. The request format is as follows:

```json
{
    "startAt": number,
    "slotOwnerId": string
}
```
Response
```json
{
  "slots": [{
    "startAt": number;
    "endAt": number;
  }]
}
```

### `POST /slot/events`

This API returns a list of booked slots based on the provided criteria. The request format is as follows:

```json
{
    "slotOwnerId": string,
    "startDate": number,
    "endDate": number
}

```
Response
```json
{
  "events": [{
    "startAt": number,
    "endAt": number,
    "booker": {
        "name": string,
        "id": string,
        "contact": {
            "phoneNumber": string,
            "email": string
        }
    }
  }]
}
```

### `POST /slot/book`

This API allows users to book a slot. The request format is:

```json
{
    "startTime": number,
    "booker": {
        "name": string,
        "id": string,
        "contact": {
            "phoneNumber": string,
            "email": string
        }
    }
}

```
Response
```json
{
    "startTime": number,
    "endTime": number,
    "booker": {
        "name": string,
        "id": string,
        "contact": {
            "phoneNumber": string,
            "email": string
        }
    },
    "slotOwnerId": string,
    "slotOwnerName": string
}

```

## Getting Started

To get started with the application, follow these steps:

1. Clone this repository: `git clone <repository_url>`
2. Install the required dependencies: `npm install`
3. Run the application: `npm start`

## Usage

Once the application is set up, you can use the provided APIs to book slots, list free slots, and list booked slots. Refer to the API documentation above for details on how to make requests and interpret responses.

## Technologies Used

The backend of this application is built using [NestJS](https://nestjs.com/), and the data is stored in a Firestore database.
