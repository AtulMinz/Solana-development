import {
  Transaction,
  Keypair,
  SystemProgram,
  PublicKey,
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

async function transfer(amount: number) {
  let newKeyPair = Keypair.generate();

  let secretKey = Uint8Array.from([
    6, 52, 229, 232, 116, 113, 238, 219, 222, 215, 200, 25, 104, 67, 119, 252,
    146, 90, 229, 127, 218, 205, 5, 182, 89, 102, 117, 6, 98, 128, 147, 118,
    113, 167, 222, 143, 129, 241, 156, 34, 160, 240, 139, 174, 91, 231, 200,
    123, 39, 238, 32, 125, 185, 3, 108, 34, 93, 176, 41, 160, 227, 62, 206, 74,
  ]);

  let keyPair = Keypair.fromSecretKey(secretKey);

  // const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

  console.log(keyPair.publicKey);
  console.log(newKeyPair);

  const address = new PublicKey("8efXze2TDaGFqLbaQ5KBb55y7Agj2fjffY33xDiKAjpM");
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const transaction = new Transaction();

  const sendSolTransaction = SystemProgram.transfer({
    fromPubkey: address,
    toPubkey: newKeyPair.publicKey,
    lamports: LAMPORTS_PER_SOL * amount,
  });

  transaction.add(sendSolTransaction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    keyPair,
  ]);

  console.log(`💸 Finished! Sent ${amount} to address ${newKeyPair.publicKey}`);

  console.log(`Transaction signature is ${signature}`);
}

transfer(1);
