import {
  createInitializeInstruction,
  createUpdateFieldInstruction,
  createRemoveKeyInstruction,
  pack,
  TokenMetadata,
} from "@solana/spl-token-metadata";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  getMint,
  getTokenMetadata,
  TYPE_SIZE,
  LENGTH_SIZE,
} from "@solana/spl-token";
import { secretKey } from "./utils";

async function tokenWithMetadata() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const user = Keypair.fromSecretKey(secretKey);

  console.log(`We've loaded the keypair! 🔑 Public key is: ${user.publicKey}`);

  let transaction: Transaction;

  let transactionSignature: string;

  const mintKeypair = Keypair.generate();

  const mint = mintKeypair.publicKey;

  const decimals = 2;

  const mintAuthority = user.publicKey;

  const updateAuthority = user.publicKey;

  const metaData: TokenMetadata = {
    updateAuthority: updateAuthority,
    mint: mint,
    name: "FAITH",
    symbol: "YSHU",
    uri: "https://raw.githubusercontent.com/AtulMinz/Solana-development/main/Solana-1/scripts/metadata/metadata.json",
    additionalMetadata: [["description", "Faith in GOD"]],
  };

  const metadataExtension = TYPE_SIZE + LENGTH_SIZE;

  const metadataLen = pack(metaData).length;

  const mintLen = getMintLen([ExtensionType.MetadataPointer]);

  const lamports = await connection.getMinimumBalanceForRentExemption(
    mintLen + metadataExtension + metadataLen
  );

  const createAccountInstruction = SystemProgram.createAccount({
    fromPubkey: user.publicKey,
  });
}

tokenWithMetadata();
