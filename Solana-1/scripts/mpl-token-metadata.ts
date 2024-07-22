import {} from "@solana/spl-token-metadata";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { secretKey } from "./utils";

async function tokenWithMetadata() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const user = Keypair.fromSecretKey(secretKey);

  console.log(`We've loaded the keypair! Public key is: ${user.publicKey}`);
}

tokenWithMetadata();
