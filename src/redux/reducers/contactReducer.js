const initialState = [
  {
    id: 8,
    name: "Eren",
    email: "eren@gmail.com",
  },
  {
    id: 9,
    name: "Mikasa",
    email: "mikasa@gmail.com",
  },
  {
    id: 10,
    name: "Levy",
    email: "levy@gmail.com",
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default contactReducer;
