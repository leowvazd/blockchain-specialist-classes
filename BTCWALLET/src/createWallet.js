//import dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// define the network
const network = bitcoin.networks.testnet // change testnet to bitcoin to test in the bitcoin mainnet

// derivation of wallets HD
const path = `m/49'/1'/0'/0`

// creation of mnemoic to seeds (words of password)
let mnemoic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemoic);

// creation of the root of the wallet HD
let root = bip32.fromSeed(seed, network)

// creation of an account - pair of pvt-pub keys
let account = root.derivePath(path);
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh(
    {
        pubkey: node.publicKey,
        network: network
    }
).address

console.log("Wallet Generated!")
console.log("Address: ", btcAddress)
console.log("Private Key: ", node.toWIF())
console.log("Seed: ", mnemoic)