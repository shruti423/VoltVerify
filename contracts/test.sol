// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VoltVerify {
    struct Product {
        string productId;
        string serialNumber;
        string barcode;
        bool isAuthentic;
    }

    struct Report {
        string productId;
        string sellerName;
        string sellerDetails;
    }

    address public owner;
    mapping(string => Product) public products; // barcode => Product
    Report[] public fakeReports;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addProduct(string memory _productId, string memory _serialNumber, string memory _barcode) public onlyOwner {
        require(bytes(products[_barcode].barcode).length == 0, "Product already exists");
        products[_barcode] = Product(_productId, _serialNumber, _barcode, true);
    }

    function verifyProduct(string memory _barcode) public view returns (bool, string memory) {
        Product memory product = products[_barcode];
        if (product.isAuthentic) {
            return (true, "Product is authentic");
        } else {
            return (false, "Product is not authentic");
        }
    }

    function reportFake(string memory _productId, string memory _sellerName, string memory _sellerDetails) public {
        fakeReports.push(Report(_productId, _sellerName, _sellerDetails));
    }

    function getFakeReportsCount() public view returns (uint) {
        return fakeReports.length;
    }

    function getFakeReport(uint index) public view returns (string memory, string memory, string memory) {
        require(index < fakeReports.length, "Invalid index");
        Report memory report = fakeReports[index];
        return (report.productId, report.sellerName, report.sellerDetails);
    }
}
