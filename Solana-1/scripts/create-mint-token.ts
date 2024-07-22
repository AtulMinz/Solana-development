import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { secretKey } from "./utils";
import { getExplorerLink } from "@solana-developers/helpers";

async function createMintToken() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const user = Keypair.fromSecretKey(secretKey);

  console.log(`🔑 Public Key: ${user.publicKey.toBase58()}`);

  const tokenMint = await createMint(connection, user, user.publicKey, null, 2);

  const link = getExplorerLink("address", tokenMint.toString(), "devnet");

  console.log(`✅ Finished! Created token mint: ${link}`);
}

createMintToken();
