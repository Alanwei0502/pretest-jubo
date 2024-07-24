# Project Content:
Create a simple List to display Patients. When clicked, open a Dialog to show the Patient's Orders. Add a button in the top right of the Dialog to add new Orders, and provide edit and delete functions for the orders.

## Data Format:
5 patients, please set up as needed | Editable orders
```js
// patients: 
[
  {
    Id: '1',
    Name: 'John Doe',
    OrderId: '1',
  },
  {...}
];

// orders:
[
  {
    Id: '1',
    Message: 'Prescribed 120mg of medication',
  },
  {...}
];
```

## Requirements:
- Use React with react hooks (state) for frontend data management
- For frontend React data fetching, either react hooks or redux can be used, no restrictions
- Use MaterialUI (https://material-ui.com) as the base component library for frontend development
- Use Node.js + Express or .NET for backend
- Use MongoDB or PostgreSQL for the backend database
- Patient data is fixed, orders can be added/edited/deleted

## Reference Materials:
- For frontend, start with https://github.com/facebook/create-react-app
- If you find a better solution that integrates frontend and backend, you don't have to use create-react-app