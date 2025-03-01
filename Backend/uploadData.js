const { EthStorage } = require("ethstorage-sdk");
require("dotenv").config();

const rpc = process.env.RPC_URL; // Sepolia or Quai Testnet RPC
const ethStorageRpc = process.env.ETHSTORAGE_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

async function uploadFile() {
    const ethStorage = await EthStorage.create({
        rpc,
        ethStorageRpc,
        privateKey
    });

    const key = "test.txt";
    const data = Buffer.from("This is a test data file for EthStorage");

    await ethStorage.write(key, data);
    console.log(`Uploaded data with key: ${key}`);
}

uploadFile();