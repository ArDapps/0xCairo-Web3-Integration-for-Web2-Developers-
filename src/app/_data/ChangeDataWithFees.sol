// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataChangeWithFee {
    // Struct to store the data
    struct Data {
        string value;    // Data to store
        address changer; // Address of the last person who changed the data
        uint256 feePaid; // The last fee paid to change the data
    }

    Data public data; // Publicly accessible data
    uint256 public constant initialFee = 0.0001 ether; // Minimum initial fee

    address public admin; // Address of the contract deployer (admin)

    // Event to log data changes
    event DataChanged(address indexed changer, string newValue, uint256 feePaid);
    event FeesWithdrawn(address indexed admin, uint256 amount);

    // Modifier to restrict functions to the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    // Constructor to initialize the contract with some data
    constructor(string memory initialValue) {
        admin = msg.sender; // Set the deployer as the admin
        data = Data({
            value: initialValue,
            changer: msg.sender,
            feePaid: 0 // No fee paid initially
        });
    }

    // Function to change the data, requires payment of a higher fee than the last one
    function changeData(string memory newValue) public payable {
        // Check the required fee: 0.0001 ETH for the first change, more than the last fee after that
        uint256 requiredFee = data.feePaid == 0 ? initialFee : data.feePaid;

        // Ensure that the new fee is strictly greater than the previous fee
        require(msg.value > requiredFee, "Insufficient fee to change the data.");

        // Update the data
        data.value = newValue;
        data.changer = msg.sender;
        data.feePaid = msg.value;

        emit DataChanged(msg.sender, newValue, msg.value);
    }

    // Function to withdraw the accumulated fees, only callable by the admin
    function withdrawFees() public onlyAdmin {
        uint256 amount = address(this).balance;
        require(amount > 0, "No fees to withdraw.");
        payable(admin).transfer(amount);
        emit FeesWithdrawn(admin, amount);
    }

    // Function to check the balance of the contract
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
