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

import { secretKey } from "./utils";

async function transfer(amount: number) {
  let newKeyPair = Keypair.generate();

  let keyPair = Keypair.fromSecretKey(secretKey);

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
