const { ethers } = require("ethers");

// Рабочий публичный RPC Sepolia
const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";

const wallet = ethers.Wallet.createRandom();
console.log("Address:", wallet.address);
console.log("Private key:", wallet.privateKey);

const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = wallet.connect(provider);

// Тестовый получатель сделал с помощью скрипта, который просто генерирует случайный кошеле
//const { ethers } = require("ethers");
//const wallet = ethers.Wallet.createRandom();
//console.log("Address:", wallet.address);
//console.log("Private key:", wallet.privateKey);

const TO = "0xbe1c276e4df938e27386ebf0f4775e12795e35e7d49808e25bdb25ca641b950c";
const AMOUNT = "0.001";

async function main() {
    try {
        console.log("Sending transaction...");

        const tx = {
            to: TO,
            value: ethers.parseEther(AMOUNT)
        };

        const sentTx = await signer.sendTransaction(tx);
        console.log("TX hash:", sentTx.hash);

        const receipt = await sentTx.wait();
        console.log("Transaction confirmed in block:", receipt.blockNumber);
    } catch (err) {
        console.error("Error:", err);
    }
}

main();