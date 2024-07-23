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
  sendAndConfirmTransaction,
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
  getMetadataPointerState,
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
    newAccountPubkey: mint,
    space: mintLen,
    lamports,
    programId: TOKEN_2022_PROGRAM_ID,
  });

  const initializeMetadataPointerInstruction =
    createInitializeMetadataPointerInstruction(
      mint,
      updateAuthority,
      mint,
      TOKEN_2022_PROGRAM_ID
    );

  const initializeMintInstruction = createInitializeMintInstruction(
    mint,
    decimals,
    mintAuthority,
    null,
    TOKEN_2022_PROGRAM_ID
  );

  const initializeMetadataInstruction = createInitializeInstruction({
    programId: TOKEN_2022_PROGRAM_ID,
    metadata: mint,
    updateAuthority: updateAuthority,
    mint: mint,
    mintAuthority: mintAuthority,
    name: metaData.name,
    symbol: metaData.symbol,
    uri: metaData.uri,
  });

  const updateFieldInstruction = createUpdateFieldInstruction({
    programId: TOKEN_2022_PROGRAM_ID,
    metadata: mint,
    updateAuthority: updateAuthority,
    field: metaData.additionalMetadata[0][0], //key
    value: metaData.additionalMetadata[0][1], //value
  });

  transaction = new Transaction().add(
    createAccountInstruction,
    initializeMetadataPointerInstruction,
    // note: the above instructions are required before initializing the mint
    initializeMintInstruction,
    initializeMetadataInstruction,
    updateFieldInstruction
  );

  transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user, mintKeypair]
  );

  console.log(
    "\nCreate Mint Account:",
    `https://explorer.solana.com/address/${mint}?cluster=devnet`
  );

  console.log(mint);

  //------------------------------------------READ METADATA FROM MINT ACCOUNT----------------------------------------------

  //Retrieve mint information
  const mintInfo = await getMint(
    connection,
    mint,
    "confirmed",
    TOKEN_2022_PROGRAM_ID
  );

  const metadataPointer = getMetadataPointerState(mintInfo);
  console.log("\nMetadata Pointer: ", JSON.stringify(metadataPointer, null, 2));

  //Read the log of the metadata state
  const metadata = await getTokenMetadata(connection, mint);

  console.log("\nMetadata: ", JSON.stringify(metadata, null, 2));
}

tokenWithMetadata();
