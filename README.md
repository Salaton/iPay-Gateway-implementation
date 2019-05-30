# iPay integration

This is a simple Angular JS implementation that allows a user to successfully integrate with the iPay gateway.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This implementation assumes you have node,npm and angular CLI installed in your machine.

### Installing

How to get the development env running

CD into the folder and run

```
npm install
```

This will install the required dependencies

## Running the tests

To run the tests for this system;

```
npm start
```

or

```
ng serve --open
```

After this, using your browser, access localhost on port 4200;

```
http://localhost:4200/
```

Since all parameters are predefined in the `app.component.ts` file, you only need to "PAY HERE" and submit the form. On successful implementation, the payment page should be displayed. Make a card payment(Visa) using dummy card details.
Use the credit card number as `4444444444444444` The other details are determined by you.

### Running again

To run the test again, the `oid` value will be randomy generated on reload and perform the above steps once again.
