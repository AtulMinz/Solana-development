import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
