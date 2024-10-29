# Decentralized Crowdfunding Platform

This project implements a decentralized crowdfunding platform using the Clarity smart contract language. The platform allows users to create, back, and manage crowdfunding projects with different funding mechanisms, such as all-or-nothing and milestone-based funding.

## Key Features

- Project creation: Users can create new crowdfunding projects by specifying the project details, including title, description, rewards, funding goal, and deadline.
- Backing projects: Users can back projects by sending funds to the contract, which updates the project's funded amount and backer list.
- Refunds: If a project fails to reach its funding goal by the deadline, backers can request a refund, and the funds are distributed proportionally to all backers.
- Milestone payments: The platform supports milestone-based funding, where the project creator can define multiple milestones with descriptions and amounts. The creator can claim these milestone payments once the project is successful.
- Transparency: All relevant project details, such as funded amount, funding goal, backers, rewards, milestones, and project status, are stored in the contract and accessible through read functions.

## Usage

To use the Decentralized Crowdfunding Platform, you will need to interact with the Clarity smart contract. The contract provides the following public functions:

1. `create-project`: Creates a new crowdfunding project.
2. `back-project`: Allows users to back a project by sending funds.
3. `refund-project`: Allows backers to request a refund if the project fails to reach its funding goal.
4. `claim-milestone`: Allows the project creator to claim milestone payments once the project is successful.

You can find the complete contract implementation in the `crowdfunding-contract.clar` file.

## Testing

The project includes a test suite using Vitest, a JavaScript testing framework. The tests cover the following scenarios:

1. Creating a new project
2. Backing a project
3. Requesting a refund for a failed project
4. Claiming milestone payments for a successful project

To run the tests, you will need to have Vitest installed in your project. You can then execute the tests using the following command:

```
npx vitest
```

The test suite can be found in the `crowdfunding-contract.test.js` file.

## Contributing

If you would like to contribute to this project, please feel free to submit a pull request. We welcome any improvements, bug fixes, or new features that align with the project's goals.

## License

This project is licensed under the [MIT License](LICENSE).
