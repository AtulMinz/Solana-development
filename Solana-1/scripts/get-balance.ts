import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function get_balance() {
  const connection = new Connection(clusterApiUrl("devnet"));
  console.log("✅Connected");

  const address = new PublicKey("8efXze2TDaGFqLbaQ5KBb55y7Agj2fjffY33xDiKAjpM");
  const balance = await connection.getBalance(address);
  console.log(balance / 1000000000 + " in SOL");
  console.log("✅Finished");
}

get_balance();
