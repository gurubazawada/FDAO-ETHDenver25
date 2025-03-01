const { EthStorage } = require("ethstorage-sdk");
require("dotenv").config();

const rpc = process.env.RPC_URL; // e.g. Sepolia RPC
const ethStorageRpc = process.env.ETHSTORAGE_RPC_URL; // EthStorage node
const privateKey = process.env.PRIVATE_KEY;

async function fetchData(key) {
    const ethStorage = await EthStorage.create({
        rpc,
        ethStorageRpc,
        privateKey
    });

    const data = await ethStorage.read(key);
    console.log(`Retrieved Data: ${data.toString()}`);
}

fetchData("test.txt"); // Replace with actual key