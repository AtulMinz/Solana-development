import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

async function createMintToken() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  console.log(PublicKey);

  // const tokenMint = await createMint(
  //   connection,
  // )
}
